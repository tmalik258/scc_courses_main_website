"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { getDashboardData } from "@/actions/dashboard";

export function useDashboardData() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    ongoingCount: number;
    completedCount: number;
    certificateCount: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    courses: any[];
  } | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        router.push("/login");
        return;
      }

      try {
        const result = await getDashboardData(user.id);
        setData(result);
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
        router.push("/error");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [supabase, router]);

  return { data, loading };
}
