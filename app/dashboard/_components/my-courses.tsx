import { ArrowRight } from "lucide-react";
import { CourseProgressCard } from "./course-progress-card";

interface Course {
  category: string;
  categoryBgColor: string;
  categoryTextColor: string;
  title: string;
  currentLesson: number;
  totalLessons: number;
  progress: number;
}

interface MyCoursesProps {
  courses: Course[];
}

export function MyCourses({ courses }: MyCoursesProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">My Courses</h2>
        <button className="flex items-center text-aqua-mist hover:text-aqua-depth text-sm font-medium">
          View All
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="space-y-4">
        {courses.map((course, index) => (
          <CourseProgressCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
}
