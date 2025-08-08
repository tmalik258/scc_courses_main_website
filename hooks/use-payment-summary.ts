import { useEffect, useState } from "react";
import axios from "axios";
import { z } from "zod";

const PaymentSummarySchema = z.object({
  courseId: z.string(),
  title: z.string(),
  price: z.number(),
  discounted: z.number(),
  vat: z.number(),
  total: z.number(),
});

export function usePaymentSummary(courseId?: string) {
  const [data, setData] = useState<z.infer<typeof PaymentSummarySchema> | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const url = courseId
        ? `/api/payments/payment-summary?courseId=${courseId}`
        : "/api/payments/payment-summary";
      console.log("Fetching payment summary:", url); // Debug log
      const res = await axios.get(url);
      const parsed = PaymentSummarySchema.parse(res.data);
      setData(parsed);
      setError(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Failed to load payment summary:", err);
      setError(
        err.response?.data?.error ||
          "Failed to load payment summary. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [courseId]);

  return { data, loading, error, refetch: fetchSummary };
}
