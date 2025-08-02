// lib/get-user-profile.ts
import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";

export async function getUserProfile() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;

  const profile = await prisma.profile.findUnique({
    where: { userId: user.id },
  });

  return profile;
}
