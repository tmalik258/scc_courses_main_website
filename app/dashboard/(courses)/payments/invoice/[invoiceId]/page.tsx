import { notFound } from "next/navigation";
import { InvoiceDetail } from "./_components/invoice-detail";
import prisma from "@/lib/prisma";

interface InvoicePageProps {
  params: Promise<{
    invoiceId: string;
  }>;
}

export default async function InvoicePage({ params }: InvoicePageProps) {
  const { invoiceId } = await params;

  // Fetch invoice data from the database
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      select: {
        id: true,
        paymentDate: true,
        paymentMethod: true,
        totalAmount: true,
        courseName: true,
        category: true,
        status: true,
      },
    });

    if (!invoice) {
      console.error("Invoice not found for invoiceId:", invoiceId, {
        timestamp: new Date().toISOString(),
      });
      notFound();
    }

    // Format data for InvoiceDetail
    const invoiceData = {
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
    };

    console.log("Invoice fetched for page:", {
      invoiceId,
      invoiceData,
      timestamp: new Date().toISOString(),
    });

    return <InvoiceDetail {...invoiceData} />;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Failed to fetch invoice:", {
      invoiceId,
      message: error.message || "Unknown error",
      timestamp: new Date().toISOString(),
    });
    notFound();
  }
}
