"use server"

import { db } from "@/lib/db";
import { musteriYorumlari, MusteriYorumu, YeniMusteriYorumu } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function getTestimonials(): Promise<MusteriYorumu[]> {
  try {
    const testimonials = await db.select().from(musteriYorumlari);
    return testimonials;
  } catch (error) {
    console.error("Müşteri yorumları alınırken hata oluştu:", error);
    throw new Error("Müşteri yorumları alınamadı.");
  }
}

export async function getTestimonialById(id: number): Promise<MusteriYorumu | null> {
  try {
    const [testimonial] = await db
      .select()
      .from(musteriYorumlari)
      .where(eq(musteriYorumlari.id, id));
    return testimonial || null;
  } catch (error) {
    console.error("Müşteri yorumu alınırken hata oluştu:", error);
    throw new Error("Müşteri yorumu alınamadı.");
  }
}

export async function createTestimonial(data: YeniMusteriYorumu): Promise<MusteriYorumu> {
  try {
    const [newTestimonial] = await db.insert(musteriYorumlari).values(data).returning();
    return newTestimonial;
  } catch (error) {
    console.error("Müşteri yorumu oluşturulurken hata oluştu:", error);
    throw new Error("Müşteri yorumu oluşturulamadı.");
  }
}

export async function updateTestimonial(id: number, data: Partial<YeniMusteriYorumu>): Promise<MusteriYorumu> {
  try {
    const [updatedTestimonial] = await db
      .update(musteriYorumlari)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(musteriYorumlari.id, id))
      .returning();
    return updatedTestimonial;
  } catch (error) {
    console.error("Müşteri yorumu güncellenirken hata oluştu:", error);
    throw new Error("Müşteri yorumu güncellenemedi.");
  }
}

export async function deleteTestimonial(id: number): Promise<void> {
  try {
    await db.delete(musteriYorumlari).where(eq(musteriYorumlari.id, id));
  } catch (error) {
    console.error("Müşteri yorumu silinirken hata oluştu:", error);
    throw new Error("Müşteri yorumu silinemedi.");
  }
}