'use server';

import { createClient } from '@/lib/supabase/server';
import { certificateSchema } from '@/lib/validations/certificate';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function createCertificate(prevState: any, formData: FormData) {
  const supabase = await createClient();

  // 1. Auth Check
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, message: "Unauthorized: You must be logged in." };
  }

  const rawData = {
    name: formData.get('name'),
    issuer: formData.get('issuer'),
    issued_at: formData.get('issued_at'),
    certificate_url: formData.get('certificate_url'),
    image: formData.get('image') as File,
  };

  try {
    const validatedFields = certificateSchema.omit({ image_url: true }).parse(rawData);

    let imageUrl = '';

    // 2. Handle Image Upload
    const imageFile = rawData.image;
    if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
      if (!imageFile.type.startsWith("image/")) {
        return { success: false, message: "Invalid file type. Please upload an image." };
      }

      const fileExt = imageFile.name.split(".").pop();
      const fileName = `cert-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("porto")
        .upload(fileName, imageFile);

      if (uploadError) {
        console.error("Upload error:", uploadError);
        return { success: false, message: "Failed to upload image." };
      }

      const { data: publicUrlData } = supabase.storage.from("porto").getPublicUrl(fileName);
      imageUrl = publicUrlData.publicUrl;
    } else {
        return { success: false, message: "Image is required." };
    }

    // 3. Insert into Database
    const { error } = await supabase
      .from('certificates')
      .insert([{ ...validatedFields, image_url: imageUrl }]);

    if (error) {
      console.error('Database Error:', error);
      return { success: false, message: 'Failed to create certificate.' };
    }

    revalidatePath('/admin/certificates');
    revalidatePath('/');
    return { success: true, message: 'Certificate created successfully!' };

  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: (error as any).errors[0].message };
    }
    console.error("Unexpected error:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}

export async function updateCertificate(prevState: any, formData: FormData) {
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
  if (!id) return { success: false, message: "Certificate ID is required." };

  const rawData = {
    name: formData.get('name'),
    issuer: formData.get('issuer'),
    issued_at: formData.get('issued_at'),
    certificate_url: formData.get('certificate_url'),
    image: formData.get('image') as File,
  };

  try {
    const validatedFields = certificateSchema.omit({ image_url: true }).parse(rawData);
    let imageUrl = formData.get("existing_image_url") as string;

    // 2. Handle Image Upload (Optional on update)
    const imageFile = rawData.image;
    if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
        if (!imageFile.type.startsWith("image/")) {
            return { success: false, message: "Invalid file type." };
        }
        
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `cert-${Date.now()}.${fileExt}`;
        
         const { error: uploadError } = await supabase.storage
        .from("porto")
        .upload(fileName, imageFile);

        if (uploadError) {
             return { success: false, message: "Failed to upload new image." };
        }
        
         const { data: publicUrlData } = supabase.storage.from("porto").getPublicUrl(fileName);
         imageUrl = publicUrlData.publicUrl;
     }

    const { error } = await supabase
      .from('certificates')
      .update({ ...validatedFields, image_url: imageUrl })
      .eq('id', id);

    if (error) {
      console.error('Database Error:', error);
      return { success: false, message: 'Failed to update certificate.' };
    }

    revalidatePath('/admin/certificates');
    revalidatePath('/'); 
    return { success: true, message: 'Certificate updated successfully!' };
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: (error as any).errors[0].message };
    }
    return { success: false, message: "An unexpected error occurred." };
  }
}

export async function deleteCertificate(id: string) {
  const supabase = await createClient();

  // Auth Check
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    return { success: false, message: "Unauthorized" };
  }

  const { error: deleteError } = await supabase
    .from('certificates')
    .delete()
    .eq('id', id);

  if (deleteError) {
    console.error('Database Error:', deleteError);
    return { success: false, message: 'Failed to delete certificate.' };
  }

  revalidatePath('/admin/certificates');
  revalidatePath('/');
  return { success: true, message: 'Certificate deleted successfully!' };
}

export async function getAdminCertificates() {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) { 
      throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .order("issued_at", { ascending: false });

  if (error) {
    console.error("Fetch error:", error);
    return [];
  }

  return data || [];
}
