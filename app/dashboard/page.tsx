import { redirect } from "next/navigation";
import { CourseTopicChart } from "./_components/course-topic-chart";
import { LearningOverview } from "./_components/learning-overview";
import { MyCourses } from "./_components/my-courses";
import { SpendHoursChart } from "./_components/spend-hours-chart";
import { getDashboardData } from "@/actions/dashboard";

export default async function Dashboard() {
  try {
    const { ongoingCount, completedCount, certificateCount, courses } =
      await getDashboardData();

    return (
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <LearningOverview
                ongoingCount={ongoingCount}
                completedCount={completedCount}
                certificateCount={certificateCount}
              />
              <MyCourses courses={courses} />
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
  } catch (error) {
    console.error("Dashboard error:", error);
    redirect("/error");
  }
}
