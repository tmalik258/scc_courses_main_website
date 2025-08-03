"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { CourseTopicChart } from "./_components/course-topic-chart";
import { LearningOverview } from "./_components/learning-overview";
import { MyCourses } from "./_components/my-courses";
import { SpendHoursChart } from "./_components/spend-hours-chart";
import { getDashboardData } from "@/actions/dashboard";
import { createClient } from "@/utils/supabase/client";
import { LumaSpin } from "@/components/luma-spin";

export default function Dashboard() {
  const supabase = createClient();
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
        redirect("/login"); // redirect on client
        return;
      }

      try {
        const result = await getDashboardData(user.id);
        setData(result);
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
        redirect("/error");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [supabase.auth]);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-full w-full mt-[350px]">
        <LumaSpin />
      </div>
    );
  }

  return (
    <main className="flex-1 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <LearningOverview
              ongoingCount={data.ongoingCount}
              completedCount={data.completedCount}
              certificateCount={data.certificateCount}
            />
            <MyCourses courses={data.courses} />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <CourseTopicChart />
            <SpendHoursChart />
          </div>
        </div>
      </div>
    </main>
  );
}
