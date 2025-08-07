export interface DashboardCourse {
  category: string;
  categoryBgColor: string;
  categoryTextColor: string;
  title: string;
  mentorName: string;
  currentLesson: number;
  totalLessons: number;
  progress: number;
}

export interface DashboardData {
  ongoingCount: number;
  completedCount: number;
  certificateCount: number;
  courses: DashboardCourse[];
}
