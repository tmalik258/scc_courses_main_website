import prisma from "@/lib/prisma";
import { InvoiceDetail } from "./_components/invoice-detail";

interface InvoicePageProps {
  params: {
    invoiceId: string;
  };
}

export default async function InvoicePage({ params }: InvoicePageProps) {
  const invoice = await prisma.invoice.findUnique({
    where: { id: params.invoiceId },
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
    return <div className="text-center py-10">Invoice not found.</div>;
  }

  return (
    <InvoiceDetail
      id={invoice.id}
      paymentDate={invoice.paymentDate.toLocaleString()}
      paymentMethod={invoice.paymentMethod}
      totalPayment={`₹${invoice.totalAmount}`}
      category={invoice.category || "Uncategorized"}
      product={invoice.courseName}
    />
  );
}
