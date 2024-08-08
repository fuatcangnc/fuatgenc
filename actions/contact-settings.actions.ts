"use server"
import { db } from '@/lib/db';
import { contactSettings } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { contactSettingsSchema, ContactSettings } from '@/schemas/contactSettingsSchema';

export async function getContactSettings(): Promise<ContactSettings | null> {
  const settings = await db.select().from(contactSettings).limit(1);
  return settings[0] || null;
}

export async function createContactSettings(data: ContactSettings): Promise<ContactSettings> {
  const validatedData = contactSettingsSchema.parse(data);
  const [inserted] = await db.insert(contactSettings).values(validatedData).returning();
  return inserted;
}

export async function updateContactSettings(id: number, data: Partial<ContactSettings>): Promise<ContactSettings> {
  const validatedData = contactSettingsSchema.partial().parse(data);
  const [updated] = await db
    .update(contactSettings)
    .set(validatedData)
    .where(eq(contactSettings.id, id))
    .returning();
  return updated;
}

export async function deleteContactSettings(id: number): Promise<void> {
  await db.delete(contactSettings).where(eq(contactSettings.id, id));
}