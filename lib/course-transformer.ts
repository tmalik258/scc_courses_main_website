import { Prisma } from "@/lib/generated/prisma";

export type CourseWithRelations = Prisma.CourseGetPayload<{
  include: {
    category: {
      select: {
        id: true;
        name: true;
        description: true;
        createdAt: true;
        slug: true;
        icon: true;
        color: true;
        isActive: true;
      };
    };
    instructor: {
      select: {
        id: true;
        fullName: true;
        email: true;
        avatarUrl: true;
        bio: true;
        createdAt: true;
        phone: true;
      };
    };
    modules: {
      include: {
        lessons: true;
      };
    };
    purchases: {
      select: { id: true };
    };
    reviews: {
      select: { rating: true };
    };
    resources: {
      select: { id: true };
    };
  };
}> & { thumbnailUrl: string | null | undefined };

export interface CourseData {
  id: string;
  slug: string;
  category: {
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    slug: string;
    icon: string | null;
    color: string | null;
    isActive: boolean;
  };
  categoryColor: string;
  categoryBgColor: string;
  categoryTextColor: string;
  title: string;
  mentor: string;
  students: string;
  rating: string;
  price: string;
  image: string;
  thumbnailUrl: string;
  originalPrice: string;
  discountedPrice: string;
  discount: string;
  totalLessons: number;
  duration: string;
  videoCount: number;
  articleCount: number;
  downloadableResources: number;
}

const SUPABASE_IMAGE_BASE =
  "https://nflffbbhnctgdaeyyfeq.supabase.co/storage/v1/object/public/courses-resources/images";

export function transformCourse(course: CourseWithRelations): CourseData {
  const studentCount = course.purchases.length;
  const averageRating =
    course.reviews.length > 0
      ? (
          course.reviews.reduce((sum, review) => sum + review.rating, 0) /
          course.reviews.length
        ).toFixed(1)
      : "0.0";

  const categoryColor = course.category?.color || "#3b82f6";

  const originalPrice = course.price ? parseFloat(course.price.toString()) : 0;
  const discountPercentage = 20;
  const discountedPrice = originalPrice * (1 - discountPercentage / 100);

  const totalLessons = course.modules.reduce(
    (sum, module) => sum + module.lessons.length,
    0
  );
  const durationMinutes = totalLessons * 10;
  const duration = `${Math.floor(durationMinutes / 60)}h ${
    durationMinutes % 60
  }m`;

  const lessons = course.modules.flatMap((module) => module.lessons);
  const videoCount = lessons.filter((lesson) => !!lesson.video_url).length;
  const articleCount = lessons.length - videoCount;
  const downloadableResources = course.resources.length;

  let thumbnailUrl: string;

  if (course.thumbnailUrl?.startsWith("http")) {
    thumbnailUrl = course.thumbnailUrl;
  } else if (course.thumbnailUrl) {
    // Remove leading slashes
    const cleanPath = course.thumbnailUrl.replace(/^\/+/, "");
    // Use only the filename part for supabase URL
    const filename = cleanPath.includes("/")
      ? cleanPath.split("/").pop()
      : cleanPath;

    thumbnailUrl = filename
      ? `${SUPABASE_IMAGE_BASE}/${filename}`
      : "/images/course_placeholder.jpg";
  } else {
    thumbnailUrl = "/images/course_placeholder.jpg";
  }

  return {
    id: course.id,
    slug: course.category.slug,
    category: course.category,
    categoryColor,
    categoryBgColor: `bg-[${categoryColor}]/15`,
    categoryTextColor: `text-[${categoryColor}]`,
    title: course.title,
    mentor:
      course.instructor?.fullName ||
      course.instructor?.email?.split("@")[0] ||
      "Unknown Instructor",
    students: `${studentCount}+ students`,
    rating: `${averageRating}/5`,
    price: originalPrice.toFixed(2),
    image: thumbnailUrl,
    thumbnailUrl,
    originalPrice: originalPrice.toFixed(2),
    discountedPrice: discountedPrice.toFixed(2),
    discount: `${discountPercentage}% OFF`,
    totalLessons,
    duration,
    videoCount,
    articleCount,
    downloadableResources,
  };
}
