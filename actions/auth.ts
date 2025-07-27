// actions/auth.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "@/scc_courses_main_website/lib/supabase"; // ✅ import your preconfigured server client
import prisma from "@/lib/prisma";

// LOGIN
export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error("Login error:", error.message);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

// SIGNUP
export async function signup(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = (formData.get("fullName") as string) || null;
  const avatarUrl = (formData.get("avatarUrl") as string) || null;

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    console.error("Signup error:", signUpError.message);
    redirect("/error");
  }

  if (signUpData.user) {
    try {
      await prisma.profiles.upsert({
        where: { user_id: signUpData.user.id },
        update: {},
        create: {
          user_id: signUpData.user.id,
          email,
          full_name: fullName,
          avatar_url: avatarUrl,
          role: "STUDENT",
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Profile creation error:", err.message);
      redirect("/error");
    }
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

// SIGNOUT
export async function signout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Signout error:", error.message);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

// GOOGLE SIGN-IN
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`, // must be set in Supabase dashboard
    },
  });

  if (error) {
    console.error("Google sign-in error:", error.message);
    redirect("/error");
  }

  redirect(data.url);
}
