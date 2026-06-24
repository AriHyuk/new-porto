import { Experience } from "@/types/experience";
import { experienceData } from "@/constants/about";
import { unstable_cache } from "next/cache";

/**
 * Fetch all experiences from Local Static Data (Cached)
 */
export const getExperiences = unstable_cache(
  async (): Promise<Experience[]> => {
    // Map the static experienceData to match the Supabase Experience type
    const mappedExperiences: Experience[] = experienceData.map((exp, index) => {
      const baseExp: Experience = {
        id: `static-exp-${index}`,
        position: exp.role,
        company: exp.company,
        period: exp.period,
        description: exp.description,
        type: exp.type,
        brand_color: exp.brandColor,
        sort_order: index + 1,
      };

      // Inject specific highlights into relevant experiences (preserving original logic)
      if (baseExp.position.includes('Skripsi') || baseExp.company.includes('Pamulang')) {
        return {
          ...baseExp,
          description: baseExp.description.includes('RESTful API') 
            ? baseExp.description 
            : baseExp.description + ' Implemented secure RESTful APIs and automated CI/CD workflows to ensure high availability and seamless delivery.'
        };
      }
      return baseExp;
    });

    return mappedExperiences;
  },
  ['experiences-list-static'],
  { revalidate: 3600, tags: ['experiences'] }
);

