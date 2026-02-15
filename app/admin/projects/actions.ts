"use server";

import { createClient } from "@/lib/supabase/server";
import { projectSchema } from "@/lib/validations/project";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function createProject(prevState: any, formData: FormData) {
  const supabase = await createClient();

  // 1. Auth Check
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, message: "Unauthorized: You must be logged in." };
  }

  // 2. Parse and Validate Input
  const rawData = {
    title: formData.get("title"),
    slug: "", // Placeholder, will be generated
    description: formData.get("description"),
    tech_stack: formData.get("tech_stack"),
    demo_url: formData.get("demo_url"),
    repo_url: formData.get("repo_url"),
    image: formData.get("image") as File,
  };

  try {
    const validatedFields = projectSchema.omit({ image_url: true, slug: true }).parse(rawData);
    
    // Generate Slug: title-random
    const slugBase = validatedFields.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    
    const randomSuffix = Math.floor(Math.random() * 10000);
    const generatedSlug = `${slugBase}-${randomSuffix}`;

    let imageUrl = null;

    // 3. Handle Image Upload
    const imageFile = rawData.image;
    if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
      // Validate file type
      if (!imageFile.type.startsWith("image/")) {
        return { success: false, message: "Invalid file type. Please upload an image." };
      }

      // Upload to Supabase Storage
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${generatedSlug}-${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("porto")
        .upload(fileName, imageFile);

      if (uploadError) {
        console.error("Upload error:", uploadError);
        return { success: false, message: "Failed to upload image." };
      }

      // Get Public URL
      const { data: publicUrlData } = supabase.storage.from("porto").getPublicUrl(fileName);
      imageUrl = publicUrlData.publicUrl;
    }

    // 4. Insert into Database
    const { error: insertError } = await supabase.from("projects").insert({
      title: validatedFields.title,
      slug: generatedSlug,
      description: validatedFields.description,
      tech_stack: validatedFields.tech_stack,
      demo_url: validatedFields.demo_url || null,
      repo_url: validatedFields.repo_url || null,
      image_url: imageUrl,
      user_id: user.id, // Ensure user_id is linked
    });

    if (insertError) {
      console.error("Database insert error:", insertError);
      return { success: false, message: "Failed to create project in database." };
    }

    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    return { success: true, message: "Project created successfully!" };

  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: (error as any).errors[0].message };
    }
    console.error("Unexpected error:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}

export async function updateProject(prevState: any, formData: FormData) {
   const supabase = await createClient();

  // 1. Auth Check
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, message: "Unauthorized" };
  }

  const id = formData.get("id") as string;
  if (!id) return { success: false, message: "Project ID is required." };

  const rawData = {
    title: formData.get("title"),
    slug: formData.get("slug"), // Keep getting slug if it exists (hidden input?) or just rely on existing
    description: formData.get("description"),
    tech_stack: formData.get("tech_stack"),
    demo_url: formData.get("demo_url"),
    repo_url: formData.get("repo_url"),
    image: formData.get("image") as File,
  };

  try {
     // We construct schema without slug for update if we don't want to change it
     const validatedFields = projectSchema.omit({ image_url: true, slug: true }).parse(rawData);
     let imageUrl = formData.get("existing_image_url") as string | null;
     
     // Retrieve existing project to get the slug for filename if needed? 
     // Or just use timestamp for filename uniqueness.
     
     // 3. Handle Image Upload (if new image provided)
     const imageFile = rawData.image;
     if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
        if (!imageFile.type.startsWith("image/")) {
            return { success: false, message: "Invalid file type." };
        }
        
        const fileExt = imageFile.name.split(".").pop();
        // Use title for filename base
        const titleSlug = validatedFields.title.toLowerCase().replace(/[^a-z0-9]/g, "-");
        const fileName = `${titleSlug}-${Date.now()}.${fileExt}`;
        
         const { error: uploadError } = await supabase.storage
        .from("porto")
        .upload(fileName, imageFile);

        if (uploadError) {
             return { success: false, message: "Failed to upload new image." };
        }
        
         const { data: publicUrlData } = supabase.storage.from("porto").getPublicUrl(fileName);
         imageUrl = publicUrlData.publicUrl;
     }

     const { error: updateError } = await supabase.from("projects").update({
        title: validatedFields.title,
        // slug: validatedFields.slug, // Don't update slug to preserve links
        description: validatedFields.description,
        tech_stack: validatedFields.tech_stack,
        demo_url: validatedFields.demo_url || null,
        repo_url: validatedFields.repo_url || null,
        image_url: imageUrl,
     }).eq("id", id);

     if (updateError) {
         console.error("Update error:", updateError);
         return { success: false, message: "Failed to update project." };
     }

     revalidatePath("/admin/projects");
     revalidatePath("/projects");
     return { success: true, message: "Project updated successfully!" };

  } catch (error) {
       if (error instanceof z.ZodError) {
      return { success: false, message: (error as any).errors[0].message };
    }
    return { success: false, message: "An unexpected error occurred." };
  }
}

export async function deleteProject(id: string) {
  const supabase = await createClient();

  // Auth Check
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const { error: deleteError } = await supabase.from("projects").delete().eq("id", id);

    if (deleteError) {
      console.error("Delete error:", deleteError);
      return { success: false, message: "Failed to delete project." };
    }

    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    return { success: true, message: "Project deleted successfully!" };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}

export async function getProjects() {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) { 
      throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Fetch error:", error);
    return [];
  }

  return data || [];
}
