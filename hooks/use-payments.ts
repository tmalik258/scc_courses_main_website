// hooks/use-payments.ts
"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import axios from "axios";

interface Payment {
  id: string;
  title: string;
  paymentDate: string;
  method: string;
  amount: string;
  status: "pending" | "success" | "failed";
  image: string;
  reason?: string;
  timeLeft?: string;
}

export function usePayments() {
  const [activeTab, setActiveTab] = useState<
    "All" | "Pending" | "Success" | "Failed"
  >("All");
  const [allPayments, setAllPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPayments() {
      setLoading(true);

      try {
        const supabase = createClient();
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user?.id) {
          console.error("Auth error or no user:", authError);
          setLoading(false);
          return;
        }

        const response = await axios.get(`/api/payments`);
        console.log("Fetched payments:", response.data);
        setAllPayments(response.data);
      } catch (error) {
        console.error("Payment fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPayments();
  }, []);

  const filteredPayments = useMemo(() => {
    return activeTab === "All"
      ? allPayments
      : allPayments.filter((p) => p.status === activeTab.toLowerCase());
  }, [activeTab, allPayments]);

  return {
    activeTab,
    setActiveTab,
    filteredPayments,
    loading,
  };
}
