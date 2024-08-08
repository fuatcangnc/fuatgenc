"use server"
import { sikSorulanSorularSchema, SikSorulanSorular } from '@/schemas/faqSchema'
import { sikSorulanSorular } from '@/lib/schema'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { eq } from 'drizzle-orm'
type SikSorulanSorularInput = Omit<SikSorulanSorular, 'id' | 'createdAt' | 'updatedAt'>
export async function createSikSorulanSoru(data: SikSorulanSorularInput) {
  try {
    const validatedData = sikSorulanSorularSchema.parse(data)
    const [newSoru] = await db.insert(sikSorulanSorular).values({
      soruAdi: validatedData.soruAdi,
      icerik: validatedData.icerik,
    }).returning()
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
    const [updatedSoru] = await db.update(sikSorulanSorular)
      .set({
        soruAdi: validatedData.soruAdi,
        icerik: validatedData.icerik,
        durumu: validatedData.durumu,
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



export async function getSikSorulanSorular() {
  try {
    const sorular = await db.select().from(sikSorulanSorular)
    return { success: true, data: sorular }
  } catch (error) {
    console.error('Sık sorulan sorular alınırken hata oluştu:', error)
    return { success: false, error: 'Sorular alınamadı' }
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