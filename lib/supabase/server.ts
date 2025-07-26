// lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const cookie = cookieStore.get(name);
          return cookie?.value ?? "";
        },
        set(name: string, value: string, options: object) {
          cookieStore.set({ name, value, ...options }); // Use RequestCookie object
        },
        remove(name: string, options: object) {
          cookieStore.delete(name); // Simplified delete
        },
      },
    }
  );
}
