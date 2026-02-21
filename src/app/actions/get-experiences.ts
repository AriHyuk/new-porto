import { createStaticClient } from "@/lib/supabase/server";
import { Experience } from "@/types/experience";
import { unstable_cache } from "next/cache";

/**
 * Fetch all experiences from Supabase (Cached)
 */
export const getExperiences = unstable_cache(
  async (): Promise<Experience[]> => {
    try {
      const supabase = createStaticClient();
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
  },
  ['experiences-list'],
  { revalidate: 1, tags: ['experiences'] }
);
