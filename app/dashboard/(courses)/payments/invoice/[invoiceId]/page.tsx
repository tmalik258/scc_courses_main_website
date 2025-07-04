import { use } from "react"
import { InvoiceDetail } from "./_components/invoice-detail"

interface InvoicePageProps {
  params: Promise<{
    invoiceId: string
  }>
}

export default function InvoicePage({ params }: InvoicePageProps) {
  const { invoiceId } = use(params)
  // In a real app, you would fetch the invoice data based on the ID
  const invoiceData = {
    id: invoiceId,
    paymentDate: "Mar 15, 2025 12:50 PM",
    paymentMethod: "Credit Card",
    totalPayment: "₹1,350",
    category: "Data Science",
    product: "Machine Learning with Python: From Basics to Deployment",
  }

  return <InvoiceDetail {...invoiceData} />
}
