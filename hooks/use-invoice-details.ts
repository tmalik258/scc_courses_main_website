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
      setLoading(true);
      setError(null);
      try {
        const data = await fetchInvoice(invoiceId);
        setInvoice(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to fetch invoice");
        }
      } finally {
        setLoading(false);
      }
    };

    if (invoiceId) {
      loadInvoice();
    } else {
      setInvoice(null);
      setLoading(false);
    }
  }, [invoiceId]);

  return { invoice, loading, error };
}
