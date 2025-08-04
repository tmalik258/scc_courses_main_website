import axios from "axios";

interface InvoiceDetail {
  id: string;
  paymentDate: string;
  paymentMethod: string;
  totalPayment: string;
  category: string;
  product: string;
}

export async function fetchInvoice(invoiceId: string): Promise<InvoiceDetail> {
  if (!invoiceId || typeof invoiceId !== "string") {
    throw new Error("Invalid invoice ID");
  }

  try {
    console.log("Sending invoice fetch request:", {
      invoiceId,
      timestamp: new Date().toISOString(),
    });

    const response = await axios.get(`/api/invoices/${invoiceId}`);

    console.log("Invoice fetch response:", {
      status: response.status,
      data: response.data,
      timestamp: new Date().toISOString(),
    });

    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("Invoice fetch API error:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
        timestamp: new Date().toISOString(),
      });
      throw new Error(err.response?.data?.error || "Failed to fetch invoice");
    }

    const errorMessage =
      err && typeof err === "object" && "message" in err
        ? (err as { message: string }).message
        : "Unknown error";

    console.error("Unexpected invoice fetch error:", {
      error: err,
      message: errorMessage,
      timestamp: new Date().toISOString(),
    });

    throw new Error("An unexpected error occurred");
  }
}
