import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;
    const { paymentMethod } = await request.json();

    console.log("Payment request received:", {
      courseId,
      paymentMethod,
      timestamp: new Date().toISOString(),
    });

    if (!courseId || typeof courseId !== "string") {
      console.error("Invalid course ID:", courseId, {
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json({ error: "Invalid course ID" }, { status: 400 });
    }

    if (!paymentMethod || !["PAYPAL", "RAZORPAY"].includes(paymentMethod)) {
      console.error("Invalid payment method:", paymentMethod, {
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        { error: `Invalid payment method: ${paymentMethod}` },
        { status: 400 }
      );
    }

    // Authenticate user
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user?.id) {
      console.error("Authentication error:", {
        message: authError?.message,
        details: authError,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = user.id;
    console.log("Authenticated user:", {
      userId,
      timestamp: new Date().toISOString(),
    });

    // Fetch user profile
    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      console.error("Profile not found for userId:", userId, {
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }
    console.log("Profile fetched:", {
      profileId: profile.id,
      email: profile.email,
      timestamp: new Date().toISOString(),
    });

    // Fetch course details
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      console.error("Course not found for courseId:", courseId, {
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    if (!course.isPublished) {
      console.error("Course is not published:", courseId, {
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        { error: "Course is not available for purchase" },
        { status: 400 }
      );
    }
    console.log("Course fetched:", {
      courseId,
      courseTitle: course.title,
      isPublished: course.isPublished,
      timestamp: new Date().toISOString(),
    });

    // Check if the course is already purchased
    const existingPurchase = await prisma.purchase.findUnique({
      where: {
        studentId_courseId: {
          studentId: profile.id,
          courseId,
        },
      },
    });

    if (existingPurchase) {
      console.error("Course already purchased:", {
        studentId: profile.id,
        courseId,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        { error: "Course already purchased" },
        { status: 400 }
      );
    }
    console.log("No existing purchase found, proceeding with creation.", {
      timestamp: new Date().toISOString(),
    });

    // Calculate pricing
    const rawPrice = course.price ?? 0;
    const discounted = rawPrice ? rawPrice.toNumber() : 0;
    const vat = +(discounted * 0.11).toFixed(2);
    const total = +(discounted + vat).toFixed(2);

    console.log("Pricing calculated:", {
      rawPrice,
      discounted,
      vat,
      total,
      timestamp: new Date().toISOString(),
    });

    // Pre-transaction database check
    const canConnect = await prisma.$queryRaw`SELECT 1`;
    console.log("Database connection check:", {
      canConnect: !!canConnect,
      timestamp: new Date().toISOString(),
    });

    // Create purchase and invoice in a transaction
    const result = await prisma.$transaction(
      async (tx) => {
        const purchase = await tx.purchase.create({
          data: {
            studentId: profile.id,
            courseId,
          },
        });
        console.log("Purchase created in transaction:", {
          purchaseId: purchase.id,
          timestamp: new Date().toISOString(),
        });

        const invoice = await tx.invoice.create({
          data: {
            purchaseId: purchase.id,
            invoiceNumber: `INV-${uuidv4().slice(0, 8)}`,
            paymentDate: new Date(),
            paymentMethod,
            totalAmount: total,
            status: "SUCCESS",
            courseName: course.title,
            studentName: profile.fullName || profile.email || "Unknown",
            category: course.categoryId || null,
          },
        });
        console.log("Invoice created in transaction:", {
          invoiceId: invoice.id,
          timestamp: new Date().toISOString(),
        });

        return { purchase, invoice };
      },
      {
        maxWait: 5000,
        timeout: 10000,
      }
    );

    console.log("Transaction completed:", {
      purchaseId: result.purchase.id,
      invoiceId: result.invoice.id,
      timestamp: new Date().toISOString(),
    });

    // Verify database state
    const verifyPurchase = await prisma.purchase.findUnique({
      where: { id: result.purchase.id },
    });
    const verifyInvoice = await prisma.invoice.findUnique({
      where: { id: result.invoice.id },
    });
    console.log("Database verification:", {
      purchaseExists: !!verifyPurchase,
      invoiceExists: !!verifyInvoice,
      purchase: verifyPurchase,
      invoice: verifyInvoice,
      timestamp: new Date().toISOString(),
    });

    if (!verifyPurchase || !verifyInvoice) {
      console.error("Database verification failed:", {
        purchase: verifyPurchase,
        invoice: verifyInvoice,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        { error: "Failed to save purchase or invoice" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Purchase successful",
        purchaseId: result.purchase.id,
        invoiceId: result.invoice.id,
      },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Purchase error:", {
      error: error,
      message: error.message || "Unknown error",
      code: error.code || "N/A",
      meta: error.meta || "N/A",
      stack: error.stack || "N/A",
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json(
      { error: error.message || "Failed to process purchase" },
      { status: 500 }
    );
  }
}
