export interface CourseData {
  id: string;
  title: string;
  category: string;
  categoryBgColor: string;
  categoryTextColor: string;
  mentor: string;
  students: string;
  rating: string;
  price: string;
  image: string;
  thumbnail_url: string;
  originalPrice: string;
  discountedPrice: string;
  discount: string;
  totalLessons: number;
  purchaseCount: number;
  duration?: string;
  description?: string;
  videoCount: number;
  articleCount: number;
  downloadableResources: number;
  projectCount: number;
  practiceTestCount: number;
  learningPoints: string[];
  sections: {
    id: string;
    title: string;
    lessons: {
      id: string;
      title: string;
      completed: boolean;
      locked: boolean;
      duration: string;
      content: string | null;
      video_url: string | null;
      is_free: boolean;
      resources: { name: string; url: string }[];
    }[];
  }[];
  reviews?: {
    id: string;
    name: string;
    title: string;
    rating: number;
    review: string;
    avatar: string;
  }[];
}

export interface MyCourseCardProps {
  id: string | number;
  category: string;
  categoryBgColor: string;
  categoryTextColor: string;
  title: string;
  mentor: string;
  currentLesson: number;
  totalLessons: number;
  progress: number;
  image: string;
  status: "active" | "finished";
}

export interface CourseFilters {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  search?: string;
}

export interface SavedCourseCardProps {
  id: string;
  category: string;
  categoryBgColor: string;
  categoryTextColor: string;
  title: string;
  mentor: string;
  students: string;
  rating: string;
  originalPrice: string;
  discountedPrice: string;
  image: string;
  isSaved?: boolean;
}
