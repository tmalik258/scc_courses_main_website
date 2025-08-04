import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { invoiceId: string } }
) {
  try {
    const { invoiceId } = params;

    console.log("Fetching invoice:", {
      invoiceId,
      timestamp: new Date().toISOString(),
    });

    if (!invoiceId || typeof invoiceId !== "string") {
      console.error("Invalid invoice ID:", invoiceId, {
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        { error: "Invalid invoice ID" },
        { status: 400 }
      );
    }

    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      select: {
        id: true,
        paymentDate: true,
        paymentMethod: true,
        totalAmount: true,
        category: true,
        courseName: true,
      },
    });

    if (!invoice) {
      console.error("Invoice not found for invoiceId:", invoiceId, {
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    console.log("Invoice fetched:", {
      invoice,
      timestamp: new Date().toISOString(),
    });

    // Format data for the frontend
    const formattedInvoice = {
      id: invoice.id,
      paymentDate: new Date(invoice.paymentDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
      paymentMethod: invoice.paymentMethod,
      totalPayment: new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(Number(invoice.totalAmount)),
      category: invoice.category || "N/A",
      product: invoice.courseName,
    };

    return NextResponse.json(formattedInvoice, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Invoice fetch error:", {
      error,
      message: error.message || "Unknown error",
      code: error.code || "N/A",
      meta: error.meta || "N/A",
      stack: error.stack || "N/A",
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json(
      { error: error.message || "Failed to fetch invoice" },
      { status: 500 }
    );
  }
}
