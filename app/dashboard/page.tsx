import { CourseTopicChart } from "./_components/course-topic-chart";
import { LearningOverview } from "./_components/learning-overview";
import { MyCourses } from "./_components/my-courses";
import { SpendHoursChart } from "./_components/spend-hours-chart";

export default function Dashboard() {
  return (
    <main className="flex-1 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <LearningOverview />
            <MyCourses />
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
