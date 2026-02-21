"use server";

import { createClient } from "@/lib/supabase/server";
import { projectSchema } from "@/lib/validations/project";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

export async function createProject(prevState: any, formData: FormData) {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return { success: false, message: "Unauthorized: Please login first." };
  }

  const rawData = {
    title: formData.get("title"),
    tech_stack: formData.get("tech_stack"),
    description: formData.get("description"),
    summary: formData.get("summary"),
    challenge: formData.get("challenge"),
    contribution: formData.get("contribution"),
    key_features: formData.get("key_features"),
    category: formData.get("category"),
    demo_url: formData.get("demo_url"),
    repo_url: formData.get("repo_url"),
    sort_order: formData.get("sort_order"),
    additional_images: formData.getAll("additional_images") as File[],
    image: formData.get("image") as File,
  };

  try {
    const validatedBase = projectSchema.omit({ image_url: true, slug: true }).parse(rawData);
    
    // Slug generation
    const slugBase = validatedBase.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const generatedSlug = `${slugBase}-${Math.floor(Math.random() * 10000)}`;

    let imageUrl = null;
    const imageFile = rawData.image;

    if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
      if (!imageFile.type.startsWith("image/")) {
        return { success: false, message: "Invalid file type. Please upload an image." };
      }

      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${generatedSlug}-${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("porto")
        .upload(fileName, imageFile);

      if (uploadError) {
        console.error("Storage error:", uploadError);
        return { success: false, message: "Failed to upload project image." };
      }

      const { data: publicUrlData } = supabase.storage.from("porto").getPublicUrl(fileName);
      imageUrl = publicUrlData.publicUrl;
    }

    // Handle Additional Images (Gallery)
    const galleryUrls: string[] = [];
    const galleryFiles = (rawData.additional_images as File[]).filter(f => f.size > 0);

    for (const file of galleryFiles) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${generatedSlug}-gallery-${Math.floor(Math.random() * 1000000)}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("porto")
        .upload(fileName, file);

      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage.from("porto").getPublicUrl(fileName);
        galleryUrls.push(publicUrlData.publicUrl);
      }
    }

    const { error: insertError } = await supabase.from("projects").insert({
      title: validatedBase.title,
      slug: generatedSlug,
      description: validatedBase.description,
      summary: validatedBase.summary || null,
      challenge: validatedBase.challenge || null,
      contribution: validatedBase.contribution || null,
      key_features: validatedBase.key_features || [],
      category: validatedBase.category || null,
      tech_stack: validatedBase.tech_stack,
      demo_url: validatedBase.demo_url || null,
      repo_url: validatedBase.repo_url || null,
      image_url: imageUrl,
      sort_order: validatedBase.sort_order,
      additional_images: galleryUrls,
      user_id: user.id,
    });

    if (insertError) {
      console.error("DB error:", insertError);
      return { success: false, message: "Database failure while saving project." };
    }

    revalidatePath("/admin/projects", "page");
    revalidatePath("/projects", "page");
    revalidateTag("projects", 'default');
    return { success: true, message: "Project created successfully!" };

  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues[0].message };
    }
    return { success: false, message: "An unexpected system error occurred." };
  }
}

export async function updateProject(prevState: any, formData: FormData) {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return { success: false, message: "Unauthorized" };

  const id = formData.get("id") as string;
  if (!id) return { success: false, message: "Missing project ID." };

  const rawData = {
    title: formData.get("title"),
    tech_stack: formData.get("tech_stack"),
    description: formData.get("description"),
    summary: formData.get("summary"),
    challenge: formData.get("challenge"),
    contribution: formData.get("contribution"),
    key_features: formData.get("key_features"),
    category: formData.get("category"),
    demo_url: formData.get("demo_url"),
    repo_url: formData.get("repo_url"),
    sort_order: formData.get("sort_order"),
    additional_images: formData.getAll("additional_images") as File[],
    image: formData.get("image") as File,
  };

  try {
    const validatedBase = projectSchema.omit({ image_url: true, slug: true }).parse(rawData);

    let imageUrl = null;
    const imageFile = rawData.image;

    // Check if a new image file is provided
    if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
      if (!imageFile.type.startsWith("image/")) {
        return { success: false, message: "Invalid file type. Please upload an image." };
      }

      // Fetch current project data to get existing slug for consistent naming
      const { data: currentProject, error: fetchError } = await supabase
        .from("projects")
        .select("slug")
        .eq("id", id)
        .single();

      if (fetchError || !currentProject) {
        console.error("Fetch project for slug error:", fetchError);
        return { success: false, message: "Failed to retrieve project slug for image upload." };
      }

      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${currentProject.slug}-${Date.now()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("porto")
        .upload(fileName, imageFile);

      if (uploadError) {
        console.error("Storage error:", uploadError);
        return { success: false, message: "Failed to upload project image." };
      }

      const { data: publicUrlData } = supabase.storage.from("porto").getPublicUrl(fileName);
      imageUrl = publicUrlData.publicUrl;
    } else {
      // If no new image, retain the existing one
      imageUrl = formData.get("existing_image_url") as string | null;
    }

    // Handle Additional Images (Gallery) - Mix of existing and new
    const existingGalleryUrls = formData.getAll("existing_additional_images") as string[];
    const newGalleryFiles = (rawData.additional_images as File[]).filter(f => f.size > 0);
    const finalGalleryUrls = [...existingGalleryUrls];

    for (const file of newGalleryFiles) {
      const fileExt = file.name.split(".").pop();
      const fileName = `gallery-${id}-${Math.floor(Math.random() * 1000000)}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("porto")
        .upload(fileName, file);

      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage.from("porto").getPublicUrl(fileName);
        finalGalleryUrls.push(publicUrlData.publicUrl);
      }
    }

    const { error: updateError } = await supabase.from("projects").update({
      title: validatedBase.title,
      description: validatedBase.description,
      summary: validatedBase.summary || null,
      challenge: validatedBase.challenge || null,
      contribution: validatedBase.contribution || null,
      key_features: validatedBase.key_features || [],
      category: validatedBase.category || null,
      tech_stack: validatedBase.tech_stack,
      demo_url: validatedBase.demo_url || null,
      repo_url: validatedBase.repo_url || null,
      image_url: imageUrl,
      sort_order: validatedBase.sort_order,
      additional_images: finalGalleryUrls,
    }).eq("id", id);

    if (updateError) return { success: false, message: "Failed to update project data." };

    revalidatePath("/admin/projects", "page");
    revalidatePath("/projects", "page");
    revalidateTag("projects", 'default');
    return { success: true, message: "Project updated masterfully!" };

  } catch (error) {
    if (error instanceof z.ZodError) return { success: false, message: error.issues[0].message };
    return { success: false, message: "An unexpected error occurred." };
  }
}

export async function deleteProject(id: string) {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return { success: false, message: "Unauthorized" };

  try {
    const { error: deleteError } = await supabase.from("projects").delete().eq("id", id);
    if (deleteError) return { success: false, message: "Failed to erase project." };

    revalidatePath("/admin/projects", "page");
    revalidatePath("/projects", "page");
    revalidateTag("projects", 'default');
    return { success: true, message: "Project deleted successfully." };
  } catch (error) {
    return { success: false, message: "Failed to perform deletion." };
  }
}

export async function getProjects() {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("Unauthorized access to projects list.");

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Fetch projects error:", error);
    return [];
  }

  return data || [];
}
