export interface LessonData {
  id: string;
  title: string;
  content: string | null;
  video_url: string | null;
  is_free: boolean;
  completed: boolean;
  locked: boolean;
  duration: string;
  resources: { id: string; name: string; url: string }[];
}

export interface SectionData {
  id: string;
  title: string;
  lessons: LessonData[];
}
