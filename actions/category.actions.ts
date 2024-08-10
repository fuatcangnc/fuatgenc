"use server"

import { db } from "@/lib/db";
import { categories } from "@/lib/schema";
import { categorySchema, CategorySchema } from '@/schemas/categorySchema';
import { eq,desc, sql } from "drizzle-orm";
import { posts, postCategories } from "@/lib/schema";
import { revalidatePath } from "next/cache";

export async function getCategories() {
  try {
    const allCategories = await db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        isDefault: categories.isDefault,
        postCount: sql<number>`count(${postCategories.postId})`.as('postCount'),
      })
      .from(categories)
      .leftJoin(postCategories, eq(categories.id, postCategories.categoryId))
      .groupBy(categories.id)
      .orderBy(categories.name);

    return allCategories.map(category => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      checked: category.isDefault || false,
      postCount: Number(category.postCount) || 0
    }));
  } catch (error) {
    console.error("Kategoriler getirilirken hata oluştu:", error);
    throw new Error("Kategoriler getirilemedi.");
  }
}
  export async function getPostsByCategory(slug: string) {
    try {
      const result = await db
        .select({
          id: posts.id,
          title: posts.title,
          slug: posts.slug,
          excerpt: posts.excerpt,
          featuredImage: posts.featuredImage,
          createdAt: posts.createdAt,
        })
        .from(posts)
        .innerJoin(postCategories, eq(posts.id, postCategories.postId))
        .innerJoin(categories, eq(categories.id, postCategories.categoryId))
        .where(eq(categories.slug, slug))
        .orderBy(desc(posts.createdAt));
  
      return { posts: result, error: null };
    } catch (error) {
      console.error("Kategori postları getirilirken hata oluştu:", error);
      return { posts: [], error: "Kategori postları getirilemedi." };
    }
  }

export async function getCategoryBySlug(slug: string) {
  try {
    const category = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
    return category.length > 0 ? { category: category[0] } : { error: "Kategori bulunamadı." };
  } catch (error) {
    console.error("Kategori getirilirken hata oluştu:", error);
    return { error: "Kategori getirilemedi." };
  }
}

export async function createCategory(data: CategorySchema) {
    try {
      // Slug'ın benzersiz olmasını sağla
      let uniqueSlug = data.slug;
      let counter = 1;
      while (true) {
        const existingCategory = await db.select()
          .from(categories)
          .where(eq(categories.slug, uniqueSlug))
          .limit(1);
        
        if (existingCategory.length === 0) break;
        
        uniqueSlug = `${data.slug}-${counter}`;
        counter++;
      }
  
      // Benzersiz slug ile kategori oluştur
      // ... existing code ...
const newCategory = await db.insert(categories)
.values({ name: data.name, slug: uniqueSlug })
.returning();
// ... existing code ...
  
      return { category: newCategory[0] };
    } catch (error) {
      console.error("Kategori oluşturulurken hata oluştu:", error);
      return { error: "Kategori oluşturulamadı." };
    }
  }

export async function updateCategory(id: number, data: Partial<CategorySchema>) {
  try {
    const validatedData = categorySchema.partial().parse(data);
    const updatedCategory = await db.update(categories)
      .set({
        ...validatedData
      })
      .where(eq(categories.id, id))
      .returning();
    revalidatePath('/admin/kategoriler');
    return { category: updatedCategory[0] };
  } catch (error) {
    console.error("Kategori güncellenirken hata oluştu:", error);
    return { error: "Kategori güncellenemedi." };
  }
}

export async function deleteCategory(id: number) {
  try {
    await db.delete(categories).where(eq(categories.id, id));
    revalidatePath('/admin/kategoriler');
    return { success: true };
  } catch (error) {
    console.error("Kategori silinirken hata oluştu:", error);
    return { error: "Kategori silinemedi." };
  }
}