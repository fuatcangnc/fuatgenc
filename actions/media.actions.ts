"use server"

import { db } from '@/lib/db';
import { mediaFiles } from '@/lib/schema';
import { newMediaFileSchema, uploadMediaFileSchema, UploadMediaFile, MediaFile, NewMediaFile } from '@/schemas/mediaLibrarySchema';
import { eq } from 'drizzle-orm';
import { put, del, list } from '@vercel/blob';
import { revalidatePath } from "next/cache";

export async function getFiles(): Promise<MediaFile[]> {
  return db.select().from(mediaFiles).orderBy(mediaFiles.createdAt);
}

export async function uploadFile(formData: FormData) {
  const result = uploadMediaFileSchema.safeParse(Object.fromEntries(formData));
  
  if (!result.success) {
    throw new Error('Invalid file data');
  }

  const { file, ...fileData } = result.data;
  const uniqueFileName = `${Date.now()}-${file.name}`;

  try {
    // Vercel Blob'a dosyayı yükle
    const blob = await put(uniqueFileName, file, {
      access: 'public',
      addRandomSuffix: false,
    });

    const newFile: Required<NewMediaFile> = {
      name: uniqueFileName,
      size: file.size,
      url: blob.url,
      alternativeText: fileData.alternativeText || "",
      title: fileData.title || "",
      description: fileData.description || "",
    };
    
    const [insertedFile] = await db.insert(mediaFiles).values(newFile).returning();

    // Önbelleği temizle
    revalidatePath('/admin/media-library');

    return insertedFile;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export async function deleteFile(fileName: string) {
  try {
    // Vercel Blob'dan dosyayı sil
    await del(fileName);
    
    // Veritabanından dosya kaydını sil
    await db.delete(mediaFiles).where(eq(mediaFiles.name, fileName));
    console.log(`File deleted: ${fileName}`);

    // Önbelleği temizle
    revalidatePath('/admin/media-library');
  } catch (error) {
    console.error(`Error deleting file: ${fileName}`, error);
    throw error;
  }
}

export async function updateFileMetadata(id: number, metadata: Partial<NewMediaFile>) {
  const [updatedFile] = await db
    .update(mediaFiles)
    .set(metadata)
    .where(eq(mediaFiles.id, id))
    .returning();

  // Önbelleği temizle
  revalidatePath('/admin/media-library');

  return updatedFile;
}