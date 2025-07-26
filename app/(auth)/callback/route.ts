// app/auth/callback/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  console.log("Callback user:", JSON.stringify(user, null, 2));
  if (error || !user?.id) {
    console.error("Callback auth error:", error?.message);
    return NextResponse.redirect(new URL("/error", request.url));
  }

  // Create or update profile
  try {
    await prisma.profiles.upsert({
      where: { user_id: user.id },
      update: {},
      create: {
        user_id: user.id,
        email: user.email || null,
        full_name:
          user.user_metadata?.full_name || user.user_metadata?.name || null,
        avatar_url:
          user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
        role: "STUDENT",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (profileError: any) {
    console.error("Profile creation error:", profileError.message);
    return NextResponse.redirect(new URL("/error", request.url));
  }

  return NextResponse.redirect(new URL("/dashboard", request.url));
}
