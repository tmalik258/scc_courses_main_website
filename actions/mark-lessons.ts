"use server";

import { createClient } from "@/utils/supabase/server";

export async function markLessonCompleted(
  userId: string,
  lessonId: string,
  courseId: string
) {
  const supabase = createClient();
  try {
    const { error } = await (await supabase).from("completed_lessons").upsert(
      {
        user_id: userId,
        lesson_id: lessonId,
        course_id: courseId,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,lesson_id", ignoreDuplicates: true }
    );
    if (error) {
      console.error("Failed to mark lesson completed:", error);
      return { success: false, error: error.message };
    }
    console.log("✅ Marked lesson completed:", lessonId);
    return { success: true };
  } catch (err) {
    console.error("Error marking lesson completed:", err);
    return { success: false, error: String(err) };
  }
}
