import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { invoiceId: string } }
) {
  try {
    const { invoiceId } = params;

    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      select: {
        id: true,
        paymentDate: true,
        paymentMethod: true,
        totalAmount: true,
        courseName: true,
        category: true,
      },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: invoice.id,
      paymentDate: new Date(invoice.paymentDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      paymentMethod: invoice.paymentMethod,
      totalPayment: new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(Number(invoice.totalAmount || 0)),
      category: invoice.category || "N/A",
      product: invoice.courseName,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch invoice" },
      { status: 500 }
    );
  }
}
