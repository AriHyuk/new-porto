import { createClient } from "@/lib/supabase/server";
import { Experience } from "@/types/experience";

export async function getExperiences(): Promise<Experience[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching experiences:", error);
      return [];
    }

    return data as Experience[];
  } catch (error) {
    console.error("Unexpected error fetching experiences:", error);
    return [];
  }
}
