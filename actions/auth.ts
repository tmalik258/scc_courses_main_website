// actions/auth.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error("Login error:", error.message);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    fullName: (formData.get("fullName") as string) || null,
    avatarUrl: (formData.get("avatarUrl") as string) || null,
  };

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
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
          email: data.email,
          full_name: data.fullName,
          avatar_url: data.avatarUrl,
          role: "STUDENT",
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (profileError: any) {
      console.error("Profile creation error:", profileError.message);
      redirect("/error");
    }
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Signout error:", error.message);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signInWithGoogle() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    console.error("Google sign-in error:", error.message);
    redirect("/error");
  }

  redirect(data.url);
}
