"use server"
import { db } from '@/lib/db';
import { contactSettings } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { contactSettingsSchema, ContactSettings } from '@/schemas/contactSettingsSchema';

export async function getContactSettings(): Promise<ContactSettings | null> {
  const settings = await db.select().from(contactSettings).limit(1);
  return settings[0] as ContactSettings || null;
}

export async function createContactSettings(data: ContactSettings): Promise<ContactSettings> {
  const validatedData = contactSettingsSchema.parse(data);
  
  // Gerekli alanlar için varsayılan değerler sağlayın
  const insertData = {
    address: validatedData.address || '',
    city: validatedData.city || '',
    district: validatedData.district || '',
    email: validatedData.email || '',
    phone: validatedData.phone || '',
    fax: validatedData.fax, // Opsiyonel, varsayılan değer gerekmez
  };

  const [inserted] = await db.insert(contactSettings).values(insertData).returning();
  return inserted as ContactSettings;
}

export async function updateContactSettings(id: number, data: Partial<ContactSettings>): Promise<ContactSettings> {
  const validatedData = contactSettingsSchema.partial().parse(data);
  const [updated] = await db
    .update(contactSettings)
    .set(validatedData)
    .where(eq(contactSettings.id, id))
    .returning();
  return updated as ContactSettings;
}

export async function deleteContactSettings(id: number): Promise<void> {
  await db.delete(contactSettings).where(eq(contactSettings.id, id));
}