'use server'

import { db } from '@/lib/schema'
import { sikSorulanSorular } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { sikSorulanSorularSchema } from '@/schemas/faqSchema'

export async function getSikSorulanSorular() {
  try {
    const sorular = await db.select().from(sikSorulanSorular)
    return { success: true, data: sorular }
  } catch (error) {
    console.error('Sık sorulan sorular alınırken hata oluştu:', error)
    return { success: false, error: 'Sorular alınamadı' }
  }
}

export async function createSikSorulanSoru(data: typeof sikSorulanSorularSchema._type) {
  try {
    const validatedData = sikSorulanSorularSchema.parse(data)
    const [newSoru] = await db.insert(sikSorulanSorular).values(validatedData).returning()
    revalidatePath('/admin/sik-sorulan-sorular')
    return { success: true, data: newSoru }
  } catch (error) {
    console.error('Sık sorulan soru oluşturulurken hata oluştu:', error)
    return { success: false, error: 'Soru oluşturulamadı' }
  }
}

export async function updateSikSorulanSoru(id: number, data: Partial<typeof sikSorulanSorularSchema._type>) {
  try {
    const validatedData = sikSorulanSorularSchema.partial().parse(data)
    const [updatedSoru] = await db.update(sikSorulanSorular)
      .set({ ...validatedData, updatedAt: new Date() })
      .where(eq(sikSorulanSorular.id, id))
      .returning()
    revalidatePath('/admin/sik-sorulan-sorular')
    return { success: true, data: updatedSoru }
  } catch (error) {
    console.error('Sık sorulan soru güncellenirken hata oluştu:', error)
    return { success: false, error: 'Soru güncellenemedi' }
  }
}

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