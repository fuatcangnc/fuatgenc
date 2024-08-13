"use server"

import { eq, desc } from 'drizzle-orm';
import { db } from '@/lib/db';
import { posts, postCategories, categories, newsletter } from '@/lib/schema';
import { Post, createPostSchema, updatePostSchema } from '@/schemas/postsSchema';
import { sendToNewsletterEmails } from '@/utils/email';

export async function createPost(postData: Omit<Post, "id" | "createdAt" | "updatedAt">, categoryIds: number[]) {
  try {
    console.log('Received categoryIds:', categoryIds); // Debugging için
    const validatedData = createPostSchema.parse(postData);
    const newPostData = {
      ...validatedData,
      slug: validatedData.slug || '', // Ensure slug is always present
      title: validatedData.title || '', // Ensure title is always present
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Yeni postu oluştur
    const [newPost] = await db.insert(posts).values(newPostData).returning();

    // Kategorileri ekle
    if (categoryIds && categoryIds.length > 0) {
      const postCategoryValues = categoryIds.map(categoryId => ({
        postId: newPost.id,
        categoryId: categoryId
      }));
      await db.insert(postCategories).values(postCategoryValues);
    }

    console.log('New post created:', newPost); // Debugging için
    console.log('Categories added:', categoryIds); // Debugging için

    // Abonelere e-posta gönder
    await sendNewsletterEmails(newPost);

    return newPost as Post;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}
async function sendNewsletterEmails(post: Post) {
  try {
    // Bültene kayıtlı tüm kullanıcıları al
    const subscribers = await db.select().from(newsletter).where(eq(newsletter.isSubscribed, true));

    // Her bir aboneye e-posta gönder
    for (const subscriber of subscribers) {
      await sendToNewsletterEmails(
        subscriber.email,
        `Yeni Blog Yazısı: ${post.title}`,
        `
        <h1>Yeni Blog Yazımız Yayında!</h1>
        <p>Merhaba,</p>
        <p>"${post.title}" başlıklı yeni blog yazımız yayınlandı.</p>
        <p>Okumak için <a href="${process.env.SITE_URL}/blog/${post.slug}">buraya tıklayın</a>.</p>
        <p>İyi okumalar!</p>
        `
      );
    }
    console.log(`Newsletters sent to ${subscribers.length} subscribers`);
  } catch (error) {
    console.error('Error sending newsletter emails:', error);
    // Burada hata fırlatmıyoruz çünkü e-posta gönderimi başarısız olsa bile post oluşturma işleminin tamamlanmasını istiyoruz
  }
}
export async function updatePost(id: number, postData: Partial<Post>, categoryIds?: number[]) {
  try {
    const validatedData = updatePostSchema.parse(postData);
    const updatedData = { ...validatedData, updatedAt: new Date() };

    // Gönderiyi güncelliyoruz
    const [updatedPost] = await db
      .update(posts)
      .set(updatedData)
      .where(eq(posts.id, id))
      .returning();

    // Mevcut kategorileri siliyoruz
    await db.delete(postCategories).where(eq(postCategories.postId, id));

    // Yeni kategorileri ekliyoruz
    if (categoryIds && categoryIds.length > 0) {
      const postCategoryValues = categoryIds.map(categoryId => ({
        postId: id,
        categoryId: categoryId
      }));
      await db.insert(postCategories).values(postCategoryValues);
    }

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
    const result = await db.query.posts.findMany({
      limit: limitParam,
      orderBy: [desc(posts.createdAt)],
      with: {
        categories: {
          with: {
            category: true
          }
        }
      }
    });

    return result.map(post => ({
      ...post,
      categories: post.categories.map(pc => pc.category.name),
      categorySlug: post.categories[0]?.category.slug || ''
    }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

export async function deletePost(id: number): Promise<void> {
  try {
    // Önce ilişkili kategorileri siliyoruz
    await db.delete(postCategories).where(eq(postCategories.postId, id));
    
    // Sonra gönderiyi siliyoruz
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

export async function getPostCategories(postId: number): Promise<number[]> {
  try {
    const result = await db
      .select({ categoryId: postCategories.categoryId })
      .from(postCategories)
      .where(eq(postCategories.postId, postId));
    
    return result.map(row => row.categoryId);
  } catch (error) {
    console.error('Error fetching post categories:', error);
    throw error;
  }
}