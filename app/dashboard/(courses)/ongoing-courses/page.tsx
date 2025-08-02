import { CourseCard } from "../_components/course-card";
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function OngoingCourses() {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>You must be logged in to see your courses.</div>;
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: user.id },
  });

  if (!profile) {
    return <div>No profile found for your account.</div>;
  }

  const progresses = await prisma.progress.findMany({
    where: {
      studentId: profile.id,
      isCompleted: true,
    },
    include: {
      lessons: {
        include: {
          modules: {
            include: {
              course: {
                include: {
                  category: true,
                  instructor: true,
                  modules: {
                    include: {
                      lessons: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  const uniqueCourses = new Map();

  for (const progress of progresses) {
    const course = progress.lessons.modules.course;

    if (!uniqueCourses.has(course.id)) {
      const allLessons = course.modules.flatMap((mod) => mod.lessons);
      const totalLessons = allLessons.length;

      const completedLessons = await prisma.progress.count({
        where: {
          studentId: profile.id,
          lesson_id: {
            in: allLessons.map((l) => l.id),
          },
          isCompleted: true,
        },
      });

      const progressPercent = Math.floor(
        (completedLessons / totalLessons) * 100
      );

      if (progressPercent < 100) {
        uniqueCourses.set(course.id, {
          id: course.id,
          category: course.category.name,
          categoryBgColor: "bg-blue-600/25", // Optional: Map by category name
          categoryTextColor: "text-blue-600",
          title: course.title,
          mentor: course.instructor.fullName || "Mentor",
          currentLesson: completedLessons,
          totalLessons,
          progress: progressPercent,
          image: course.thumbnailUrl || "/images/course_placeholder_2.jpg",
          isCompleted: false,
        });
      }
    }
  }

  const ongoingCourses = Array.from(uniqueCourses.values());

  return (
    <div>
      {ongoingCourses.length === 0 ? (
        <div className="text-muted-foreground text-sm text-center py-10">
          You haven’t started any courses yet.
        </div>
      ) : (
        ongoingCourses.map((course) => (
          <CourseCard
            key={course.id}
            students=""
            rating=""
            price=""
            {...course}
          />
        ))
      )}
    </div>
  );
}
