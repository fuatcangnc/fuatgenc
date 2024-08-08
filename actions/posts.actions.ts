"use server"

import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';  // Drizzle veritabanı bağlantınızı içe aktarın
import { posts } from '@/lib/schema';  // Drizzle şemanızı içe aktarın
import { Post, createPostSchema, updatePostSchema } from '@/schemas/postsSchema';


export async function createPost(postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const validatedData = createPostSchema.parse({
      ...postData,
      publishedAt: postData.publishedAt || null, // Eğer publishedAt gönderilmemişse null olarak ayarla
    });
    const [newPost] = await db.insert(posts).values(validatedData).returning();
    return newPost;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

export async function updatePost(id: number, postData: Partial<Post>) {
  try {
    const validatedData = updatePostSchema.parse(postData);
    const [updatedPost] = await db
      .update(posts)
      .set({ ...validatedData, updatedAt: new Date() })
      .where(eq(posts.id, id))
      .returning();
    return updatedPost;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}

export async function getPostById(id: number): Promise<Post | null> {
  try {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    return post || null;
  } catch (error) {
    console.error('Error fetching post by id:', error);
    throw error;
  }
}

export async function getPosts(): Promise<Post[]> {
  try {
    return await db.select().from(posts).orderBy(posts.createdAt);
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

export async function deletePost(id: number): Promise<void> {
  try {
    await db.delete(posts).where(eq(posts.id, id));
  } catch (error) {
    console.error('Error deleting post:', error);
    throw new Error(`Gönderi silinirken hata oluştu: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`);
  }
}

export async function publishPost(slug: string): Promise<Post | null> {
  const [publishedPost] = await db
    .update(posts)
    .set({ publishedAt: new Date() })
    .where(eq(posts.slug, slug))
    .returning();
  return publishedPost || null;
}

export async function unpublishPost(slug: string): Promise<Post | null> {
  const [unpublishedPost] = await db
    .update(posts)
    .set({ publishedAt: null })
    .where(eq(posts.slug, slug))
    .returning();
  return unpublishedPost || null;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const [post] = await db.select().from(posts).where(eq(posts.slug, slug));
    return post || null;
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    throw error;
  }
}