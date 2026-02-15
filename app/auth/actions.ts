"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Handles user login via Supabase Auth.
 * @param formData - The form data containing email and password.
 */
export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect("/login?error=Invalid credentials");
  }

  revalidatePath("/", "layout");
  redirect("/admin");
}

/**
 * Handles user logout.
 * Signs out from Supabase and redirects to login page.
 */
export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/login");
}
