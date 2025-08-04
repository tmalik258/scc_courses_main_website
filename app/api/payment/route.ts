import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  console.log("Fetching payments:", {
    userId,
    timestamp: new Date().toISOString(),
  });

  if (!userId) {
    console.error("Missing userId in GET request", {
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  // Step 1: Look up the profile by Supabase userId
  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (!profile) {
    console.error("Profile not found for userId:", userId, {
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  // Step 2: Get all purchases for this profile with related invoice data
  const purchases = await prisma.purchase.findMany({
    where: {
      studentId: profile.id,
    },
    include: {
      course: {
        select: {
          title: true,
          thumbnailUrl: true,
          price: true,
          category: { select: { name: true } },
        },
      },
      invoice: {
        select: {
          id: true,
          invoiceNumber: true,
          paymentDate: true,
          paymentMethod: true,
          status: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Step 3: Return simplified list with invoice data
  const payments = purchases.map((purchase) => ({
    id: purchase.invoice?.id ?? purchase.id, // Use invoiceId for PaymentCard
    invoiceId: purchase.invoice?.id ?? null,
    invoiceNumber: purchase.invoice?.invoiceNumber ?? "N/A",
    title: purchase.course.title,
    image: purchase.course.thumbnailUrl ?? "",
    paymentDate:
      purchase.invoice?.paymentDate.toISOString() ??
      purchase.createdAt.toISOString(),
    method: purchase.invoice?.paymentMethod ?? "N/A",
    amount: purchase.course.price?.toFixed(2) ?? "0.00",
    status: (purchase.invoice?.status ?? "SUCCESS").toLowerCase() as
      | "success"
      | "failed"
      | "pending", // Map to lowercase for frontend
    category: purchase.course.category?.name ?? "N/A",
  }));

  console.log("Payments fetched:", {
    userId,
    count: payments.length,
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json(payments);
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
