"use server"

import { eq,desc } from 'drizzle-orm';
import { db } from '@/lib/db';
import { posts } from '@/lib/schema';
import { Post, createPostSchema, updatePostSchema } from '@/schemas/postsSchema';

export async function createPost(postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const newPost: Required<Omit<Post, 'id' | 'createdAt' | 'updatedAt'>> = {
      title: postData.title,      // Zorunlu alan
      slug: postData.slug,        // Zorunlu alan
      content: postData.content || "",      // Opsiyonel alanı boş string olarak belirtiyoruz
      excerpt: postData.excerpt || "",      // Opsiyonel alan
      featuredImage: postData.featuredImage || "", // Opsiyonel alan
      isFeatured: postData.isFeatured ?? false, // Opsiyonel alanı varsayılan değer olarak false yapıyoruz
      publishedAt: postData.publishedAt || null,  // Opsiyonel alanı null olarak belirtiyoruz
      metaTitle: postData.metaTitle || "",  // Opsiyonel alan
      metaDescription: postData.metaDescription || "", // Opsiyonel alan
    };

    // Veriyi veritabanına ekliyoruz
    const [insertedPost] = await db.insert(posts).values(newPost).returning();

    return insertedPost as Post;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}
export async function updatePost(id: number, postData: Partial<Post>) {
  try {
    const validatedData = updatePostSchema.parse(postData);
    // 'updatedAt' alanını 'validatedData' içine ekliyoruz
    const updatedData = { ...validatedData, updatedAt: new Date() };

    // updatedData nesnesini veritabanına gönderiyoruz
    const [updatedPost] = await db
      .update(posts)
      .set(updatedData)
      .where(eq(posts.id, id))
      .returning();

    return updatedPost as Post;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}

export async function getPostById(id: number): Promise<Post | null> {
  try {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    return post as Post || null;
  } catch (error) {
    console.error('Error fetching post by id:', error);
    throw error;
  }
}

export async function getPosts(limitParam?: number): Promise<Post[]> {
  try {
    const query = db.select()
      .from(posts)
      .orderBy(desc(posts.createdAt))
      .limit(limitParam ?? Number.MAX_SAFE_INTEGER);

    const result = await query;
    return result;
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



export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const [post] = await db.select().from(posts).where(eq(posts.slug, slug));
    return post as Post || null;
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    throw error;
  }
}