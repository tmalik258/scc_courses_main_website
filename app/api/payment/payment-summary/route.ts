import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");

    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user?.id) {
      console.error("Authentication error:", authError?.message);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = user.id;

    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      console.error("Profile not found for userId:", userId);
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    let course;
    if (courseId) {
      // Fetch course directly for the summary
      course = await prisma.course.findUnique({
        where: { id: courseId },
      });

      if (!course) {
        console.error("Course not found for courseId:", courseId);
        return NextResponse.json(
          { error: "Course not found" },
          { status: 404 }
        );
      }

      if (!course.isPublished) {
        console.error("Course is not published:", courseId);
        return NextResponse.json(
          { error: "Course is not available for purchase" },
          { status: 400 }
        );
      }
    } else {
      // Fetch the most recent purchase as fallback
      const purchases = await prisma.purchase.findMany({
        where: {
          studentId: profile.id,
        },
        include: {
          course: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      });

      if (!purchases.length) {
        console.error("No purchases found for profileId:", profile.id);
        return NextResponse.json(
          { error: "No purchases found" },
          { status: 404 }
        );
      }

      course = purchases[0].course;
      if (!course) {
        console.error("Course data not found for purchaseId:", purchases[0].id);
        return NextResponse.json(
          { error: "Course data not found for the purchase" },
          { status: 404 }
        );
      }
    }

    // Calculate pricing
    const rawPrice = course.price ?? 0;
    const discounted = rawPrice ? rawPrice.toNumber() : 0;
    const vat = +(discounted * 0.11).toFixed(2);
    const total = +(discounted + vat).toFixed(2);

    return NextResponse.json({
      courseId: course.id,
      title: course.title,
      price: discounted,
      discounted,
      vat,
      total,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Payment summary error:", {
      message: error.message,
      stack: error.stack,
      code: error.code,
      meta: error.meta,
    });
    return NextResponse.json(
      { error: "Failed to fetch payment summary" },
      { status: 500 }
    );
  }
}
