"use server"
import { sikSorulanSorularSchema, SikSorulanSorular } from '@/schemas/faqSchema'
import { sikSorulanSorular } from '@/lib/schema'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { eq,desc } from 'drizzle-orm'
import { cache } from 'react'
type SikSorulanSorularInput = Omit<SikSorulanSorular, 'id' | 'createdAt' | 'updatedAt'>

export async function createSikSorulanSoru(data: SikSorulanSorularInput) {
  console.log('createSikSorulanSoru çağrıldı:', data)
  try {
    const validatedData = sikSorulanSorularSchema.parse(data)
    // @ts-ignore
    const [newSoru] = await db.insert(sikSorulanSorular).values({
      soruAdi: validatedData.soruAdi,
      durumu: validatedData.durumu,
      icerik: validatedData.icerik,
    }).returning()
    console.log('Oluşturulan soru:', newSoru)
    revalidatePath('/admin/sik-sorulan-sorular')
    return { success: true, data: newSoru }
  } catch (error) {
    console.error('Sık sorulan soru oluşturulurken hata oluştu:', error)
    return { success: false, error: 'Soru oluşturulamadı' }
  }
}

export async function updateSikSorulanSoru(id: number, data: Partial<SikSorulanSorularInput>) {
  try {
    const validatedData = sikSorulanSorularSchema.partial().parse(data)
    console.log('Doğrulanmış veri:', validatedData)
    const [updatedSoru] = await db.update(sikSorulanSorular)
      .set({
        ...validatedData,
      })
      .where(eq(sikSorulanSorular.id, id))
      .returning()
    revalidatePath('/admin/sik-sorulan-sorular')
    return { success: true, data: updatedSoru }
  } catch (error) {
    console.error('Sık sorulan soru güncellenirken hata oluştu:', error)
    return { success: false, error: 'Soru güncellenemedi' }
  }
}

export const getSikSorulanSorular = cache(async () => {
  try {
    const sorular = await db.select().from(sikSorulanSorular).orderBy(desc(sikSorulanSorular.createdAt))
    const serializableSorular = sorular.map(soru => ({
      id: soru.id,
      soruAdi: soru.soruAdi,
      icerik: soru.icerik,
      durumu: soru.durumu,
      createdAt: soru.createdAt.toISOString(),
      updatedAt: soru.updatedAt.toISOString()
    }))
    return { success: true, data: serializableSorular }
  } catch (error) {
    return { success: false, error: 'Sorular alınamadı: ' + (error instanceof Error ? error.message : String(error)) }
  }
})
export async function deleteSikSorulanSoru(id: number) {
  try {
    await db.delete(sikSorulanSorular).where(eq(sikSorulanSorular.id, id))
    revalidatePath('/admin/sik-sorulan-sorular')
    return { success: true }
  } catch (error) {
    console.error('Sık sorulan soru silinirken hata oluştu:', error)
    return { success: false, error: 'Soru silinemedi' }
  }
}