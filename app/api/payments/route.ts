import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: user.id },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const purchases = await prisma.purchase.findMany({
      where: { studentId: profile.id },
      include: {
        invoice: true,
        course: {
          select: { title: true, thumbnailUrl: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const payments = purchases.map((purchase) => ({
      id: purchase.id,
      title: purchase.course.title,
      paymentDate: purchase.invoice?.paymentDate.toISOString() ?? "",
      method: purchase.invoice?.paymentMethod.toLowerCase() ?? "",
      amount: purchase.invoice?.totalAmount.toString() ?? "0.00",
      status: purchase.invoice?.status.toLowerCase() ?? "pending",
      image: purchase.course.thumbnailUrl ?? "",
      reason: purchase.invoice?.category ?? "",
      timeLeft: undefined,
    }));

    return NextResponse.json(payments);
  } catch (error) {
    console.error("Error fetching user payments:", error);
    return NextResponse.json(
      { error: "Failed to fetch user payments" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { userId, courseId } = await req.json();

    console.log("Processing payment:", {
      userId,
      courseId,
      timestamp: new Date().toISOString(),
    });

    if (!userId || typeof userId !== "string") {
      console.error("Missing or invalid userId:", userId, {
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        { error: "Missing or invalid userId" },
        { status: 400 }
      );
    }

    if (!courseId || typeof courseId !== "string") {
      console.error("Missing or invalid courseId:", courseId, {
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        { error: "Missing or invalid courseId" },
        { status: 400 }
      );
    }

    // Verify user profile
    const profile = await prisma.profile.findUnique({
      where: { userId },
      select: { id: true, fullName: true },
    });

    if (!profile) {
      console.error("Profile not found for userId:", userId, {
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Verify course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: {
        id: true,
        title: true,
        price: true,
        category: { select: { name: true } },
      },
    });

    if (!course) {
      console.error("Course not found:", courseId, {
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Check if purchase already exists
    const existingPurchase = await prisma.purchase.findUnique({
      where: {
        studentId_courseId: {
          studentId: profile.id,
          courseId: courseId,
        },
      },
    });

    if (existingPurchase) {
      console.error("Purchase already exists:", {
        studentId: profile.id,
        courseId,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        { error: "Course already purchased" },
        { status: 400 }
      );
    }

    // Simulate payment processing (replace with PayPal/Razorpay integration)
    const paymentResult = {
      status: "SUCCESS" as const, // Uppercase for Prisma
      paymentMethod: "PAYPAL" as const,
      totalAmount: course.price || 0,
      paymentDate: new Date(),
    };

    // Create purchase and invoice in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const purchase = await tx.purchase.create({
        data: {
          id: crypto.randomUUID(),
          studentId: profile.id,
          courseId: courseId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      const invoice = await tx.invoice.create({
        data: {
          id: crypto.randomUUID(),
          purchaseId: purchase.id,
          invoiceNumber: `INV-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 5)}`,
          paymentDate: paymentResult.paymentDate,
          paymentMethod: paymentResult.paymentMethod,
          totalAmount: paymentResult.totalAmount,
          status: paymentResult.status, // Uppercase for Prisma
          courseName: course.title,
          studentName: profile.fullName || "Unknown",
          category: course.category?.name || "N/A",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      return { purchase, invoice };
    });

    console.log("Purchase and invoice created:", {
      purchaseId: result.purchase.id,
      invoiceId: result.invoice.id,
      courseId,
      userId,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        purchaseId: result.purchase.id,
        invoiceId: result.invoice.id,
        courseName: course.title,
        totalAmount: paymentResult.totalAmount,
      },
      { status: 201 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Payment processing error:", {
      error,
      message: error.message || "Unknown error",
      code: error.code || "N/A",
      meta: error.meta || "N/A",
      stack: error.stack || "N/A",
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json(
      { error: error.message || "Failed to process payment" },
      { status: 500 }
    );
  }
}