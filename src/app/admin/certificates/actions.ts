'use server';

import { createClient } from '@/lib/supabase/server';
import { certificateSchema } from '@/lib/validations/certificate';
import { revalidatePath, revalidateTag } from 'next/cache';
import { z } from 'zod';

export async function createCertificate(prevState: any, formData: FormData) {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return { success: false, message: "Unauthorized: Please login first." };
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
        return { success: false, message: "Failed to upload certificate image." };
      }

      const { data: publicUrlData } = supabase.storage.from("porto").getPublicUrl(fileName);
      imageUrl = publicUrlData.publicUrl;
    } else {
        return { success: false, message: "Certificate image is required." };
    }

    const { error } = await supabase
      .from('certificates')
      .insert([{ ...validatedFields, image_url: imageUrl }], {});

    if (error) {
      console.error('DB Error:', error);
      return { success: false, message: 'Database failure while saving certificate.' };
    }

    revalidatePath('/admin/certificates', 'page');
    revalidatePath('/', 'page');
    revalidateTag('certificates', 'default');
    return { success: true, message: 'Certificate archived successfully!' };

  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues[0].message };
    }
    return { success: false, message: "An unexpected system error occurred." };
  }
}

export async function updateCertificate(prevState: any, formData: FormData) {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return { success: false, message: "Unauthorized" };

  const id = formData.get("id") as string;
  if (!id) return { success: false, message: "Missing certificate ID." };

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

    const imageFile = rawData.image;
    if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
        if (!imageFile.type.startsWith("image/")) {
            return { success: false, message: "Invalid image format." };
        }
        
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `cert-${Date.now()}.${fileExt}`;
        
         const { error: uploadError } = await supabase.storage
        .from("porto")
        .upload(fileName, imageFile, {
          cacheControl: '3600',
          upsert: false
        });

        if (uploadError) return { success: false, message: "Image upload failed." };
        
         const { data: publicUrlData } = supabase.storage.from("porto").getPublicUrl(fileName);
         imageUrl = publicUrlData.publicUrl;
     }

    const { error } = await supabase
      .from('certificates')
      .update({ ...validatedFields, image_url: imageUrl })
      .eq('id', id);

    if (error) return { success: false, message: 'Failed to update certificate data.' };

    revalidatePath('/admin/certificates', 'page');
    revalidatePath('/', 'page'); 
    revalidateTag('certificates', 'default');
    return { success: true, message: 'Certificate refined successfully!' };
    
  } catch (error) {
    if (error instanceof z.ZodError) return { success: false, message: error.issues[0].message };
    return { success: false, message: "An unexpected error occurred." };
  }
}

export async function deleteCertificate(id: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: "Unauthorized" };

  const { error: deleteError } = await supabase
    .from('certificates')
    .delete()
    .eq('id', id);

  if (deleteError) {
    console.error('DB Error:', deleteError);
    return { success: false, message: 'Failed to delete certificate.' };
  }

    revalidatePath('/admin/certificates', 'page');
    revalidatePath('/', 'page');
    revalidatePath('/about', 'page');
    revalidateTag('certificates', 'default');
  return { success: true, message: 'Certificate removed from records.' };
}

export async function getAdminCertificates() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .order("issued_at", { ascending: false });

  if (error) return [];
  return data || [];
}
