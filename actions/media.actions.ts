"use server"

import { db } from '@/lib/db';
import { mediaFiles } from '@/lib/schema';
import { newMediaFileSchema, uploadMediaFileSchema, UploadMediaFile,MediaFile, NewMediaFile } from '@/schemas/mediaLibrarySchema';
import { eq } from 'drizzle-orm';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

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
  const filePath = path.join(UPLOAD_DIR, uniqueFileName);

  try {
    const buffer = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(buffer));

    const newFile: Required<NewMediaFile> = {
      name: uniqueFileName, // Zorunlu alan
      size: file.size,      // Zorunlu alan
      url: `/uploads/${uniqueFileName}`, // Zorunlu alan
      alternativeText: fileData.alternativeText || "", // Opsiyonel alanı boş string olarak belirtiyoruz
      title: fileData.title || "", // Opsiyonel alan
      description: fileData.description || "", // Opsiyonel alan
    };
    
    
    const [insertedFile] = await db.insert(mediaFiles).values(newFile).returning();


    return insertedFile
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}


export async function deleteFile(fileName: string) {
  const filePath = path.join(UPLOAD_DIR, fileName);
  try {
    await unlink(filePath);
    await db.delete(mediaFiles).where(eq(mediaFiles.name, fileName));
    console.log(`File deleted: ${filePath}`);
  } catch (error) {
    console.error(`Error deleting file: ${filePath}`, error);
    throw error;
  }
}

export async function updateFileMetadata(id: number, metadata: Partial<NewMediaFile>) {
  const [updatedFile] = await db
    .update(mediaFiles)
    .set(metadata)
    .where(eq(mediaFiles.id, id))
    .returning();
  return updatedFile;
}