import { useState, useEffect } from "react";
import { fetchInvoice } from "@/actions/fetch-invoice";

interface InvoiceDetail {
  id: string;
  paymentDate: string;
  paymentMethod: string;
  totalPayment: string;
  category: string;
  product: string;
}

export function useInvoiceDetail(invoiceId: string) {
  const [invoice, setInvoice] = useState<InvoiceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInvoice = async () => {
      if (!invoiceId) {
        setError("No invoice ID provided");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching invoice data:", {
          invoiceId,
          timestamp: new Date().toISOString(),
        });
        const data = await fetchInvoice(invoiceId);
        setInvoice(data);
        setError(null);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Failed to fetch invoice:", {
          message: err.message,
          timestamp: new Date().toISOString(),
        });
        setError(err.message || "Failed to load invoice. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadInvoice();
  }, [invoiceId]);

  return { invoice, loading, error };
}
