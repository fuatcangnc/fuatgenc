"use server"
import { revalidatePath } from 'next/cache'
import { db } from "@/lib/db"
import { googleFormSchema, whatsAppForms } from "@/lib/schema"
import { WhatsAppForm, NewWhatsAppForm } from '@/lib/schema'
import {  GoogleFormData } from "@/schemas/apiAyarlariSchema"
import { WhatsAppFormData } from "@/schemas/whatsappSchema"
import { eq } from "drizzle-orm"

// POST: Yeni Google form verisi ekleme
export async function addGoogleForm(formData: FormData) {
  const data = {
    googleVerificationCode: formData.get("googleVerificationCode") as string,
    googleAnalyticsCode: formData.get("googleAnalyticsCode") as string,
    captchaSiteKey: formData.get("captchaSiteKey") as string,
    microsoftClarityCode: formData.get("microsoftClarityCode") as string,
  }

  const [newForm] = await db.insert(googleFormSchema).values(data).returning()
  revalidatePath('/admin/api-ayarlari/google')
  return newForm
}

// GET: Tüm Google form verilerini alma
export async function getGoogleForms() {
  const forms = await db.select().from(googleFormSchema).limit(1);
  return forms;
}

// UPDATE: Belirli bir Google form verisini güncelleme
export async function updateGoogleForm(id: number, formData: FormData) {
  const data = {
    googleVerificationCode: formData.get("googleVerificationCode") as string,
    googleAnalyticsCode: formData.get("googleAnalyticsCode") as string,
    captchaSiteKey: formData.get("captchaSiteKey") as string,
    microsoftClarityCode: formData.get("microsoftClarityCode") as string,
  }

  const [updatedForm] = await db
    .update(googleFormSchema)
    .set(data)
    .where(eq(googleFormSchema.id, id))
    .returning()
  revalidatePath('/admin/api-ayarlari/google')
  return updatedForm
}

// WhatsApp form işlemleri

export async function getWhatsAppForm(id: number): Promise<WhatsAppForm | null> {
  const [form] = await db.select().from(whatsAppForms).where(eq(whatsAppForms.id, id))
  return form || null
}

export async function createWhatsAppForm(data: NewWhatsAppForm): Promise<WhatsAppForm> {
  console.log("Creating new form with data:", data);
  const [newForm] = await db.insert(whatsAppForms).values(data).returning()
  console.log("New form created:", newForm);
  revalidatePath('/whatsapp-form')
  return newForm
}

export async function updateWhatsAppForm(data: WhatsAppFormData): Promise<WhatsAppForm> {
  if (typeof data.id !== 'number') {
    throw new Error('Form ID is required for update')
  }
  console.log("Updating form with data:", data);
  const [updatedForm] = await db
    .update(whatsAppForms)
    .set(data)
    .where(eq(whatsAppForms.id, data.id))
    .returning()
  console.log("Updated form:", updatedForm);
  revalidatePath('/whatsapp-form')
  return updatedForm
}

export async function getAllWhatsAppForms(): Promise<WhatsAppForm[]> {
  return db.select().from(whatsAppForms)
}