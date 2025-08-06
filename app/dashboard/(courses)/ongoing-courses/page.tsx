import { CourseCard } from "../_components/course-card";
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { CourseCardProps } from "../_components/course-card";
import { getCategoryColors } from "@/lib/course-utils";

export default async function OngoingCourses() {
  const supabase = await createClient();
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

  const courseProgress = new Map();
  for (const progress of progresses) {
    const course = progress.lessons.modules.course;
    if (!courseProgress.has(course.id)) {
      courseProgress.set(course.id, []);
    }
    courseProgress.get(course.id).push(progress);
  }

  const uniqueCourses = new Map<string, CourseCardProps>();
  for (const [, courseProgresses] of courseProgress) {
    const course = courseProgresses[0].lessons.modules.course;
    const allLessons = course.modules.flatMap(
      (mod: {
        lessons: {
          id: string;
          title: string;
          completed: boolean;
          locked: boolean;
          duration: string;
          content: string | null;
          video_url: string | null;
          is_free: boolean;
        }[];
      }) => mod.lessons
    );
    const totalLessons = allLessons.length;
    const completedLessons = courseProgresses.length;
    const progressPercent = Math.floor((completedLessons / totalLessons) * 100);

    if (progressPercent < 100) {
      const categoryName = course.category?.name || "Uncategorized";
      const { bg: categoryBgColor, text: categoryTextColor } =
        getCategoryColors(categoryName);

      uniqueCourses.set(course.id, {
        id: course.id,
        category: categoryName,
        categoryBgColor,
        categoryTextColor,
        title: course.title,
        mentor: course.instructor?.fullName || "Mentor",
        currentLesson: completedLessons,
        totalLessons,
        progress: progressPercent,
        image: course.thumbnailUrl || "/images/course_placeholder_2.jpg",
        status: "active",
        students: "",
        rating: "",
        price: "",
      });
    }
  }

  const ongoingCourses = Array.from(uniqueCourses.values());

  return (
    <div>
      {ongoingCourses.length === 0 ? (
        <div className="text-muted-foreground text-sm text-center py-10">
          You haven’t started any courses yet.{" "}
          <Link href="/courses" className="text-blue-600 hover:underline">
            Browse courses
          </Link>
        </div>
      ) : (
        ongoingCourses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            category={course.category}
            categoryBgColor={course.categoryBgColor}
            categoryTextColor={course.categoryTextColor}
            title={course.title}
            mentor={course.mentor}
            currentLesson={course.currentLesson}
            totalLessons={course.totalLessons}
            progress={course.progress}
            image={course.image}
            status={course.status}
            students={course.students}
            rating={course.rating}
            price={course.price}
          />
        ))
      )}
    </div>
  );
}
