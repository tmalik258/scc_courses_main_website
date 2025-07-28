export interface LessonData {
  thumbnail_url: string | null;
  id: string;
  title: string;
  content: string | null;
  video_url: string | null;
  is_free: boolean;
  completed: boolean;
  locked: boolean;
  duration: string;
}

export interface SectionData {
  id: string;
  title: string;
  lessons: LessonData[];
}
