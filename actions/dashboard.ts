/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export async function getDashboardData(userId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard?userId=${userId}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch dashboard data: ${response.statusText}`);
  }

  const { purchases, certificates, courseProgress } = await response.json();

  const courseProgressFormatted = courseProgress.map(
    (progress: any, index: number) => {
      const purchase = purchases[index];
      const course = purchase.course;
      const category = course.category?.name ?? "Other";
      const title = course.title;
      const mentorName = course.instructor?.fullName ?? "Unknown";
      const progressPercentage = Math.round(
        (progress.completedLessons / progress.totalLessons) * 100
      );

      const categoryStyles: Record<
        string,
        { bgColor: string; textColor: string }
      > = {
        "Data Science": {
          bgColor: "bg-blue-600/25",
          textColor: "text-blue-600",
        },
        "WhatsApp Chatbots": {
          bgColor: "bg-purple-500/50",
          textColor: "text-purple-500",
        },
        "AI Calling": {
          bgColor: "bg-green-500/50",
          textColor: "text-green-500",
        },
        Other: { bgColor: "bg-gray-500/50", textColor: "text-gray-500" },
      };

      const styles = categoryStyles[category] || categoryStyles.Other;

      return {
        category,
        categoryBgColor: styles.bgColor,
        categoryTextColor: styles.textColor,
        title,
        mentorName,
        currentLesson: progress.completedLessons,
        totalLessons: progress.totalLessons,
        progress: progressPercentage,
      };
    }
  );

  const completedCourseIds = new Set(certificates.map((c: any) => c.courseId));
  const completedCount = completedCourseIds.size;
  const ongoingCount = purchases.filter(
    (p: any) => !completedCourseIds.has(p.course.id)
  ).length;

  return {
    ongoingCount,
    completedCount,
    certificateCount: certificates.length,
    courses: courseProgressFormatted,
  };
}
