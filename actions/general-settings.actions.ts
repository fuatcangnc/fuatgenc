"use server"

import { db } from '@/lib/db';
import { generalSettings } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { generalSettingsSchema, GeneralSettings } from '@/schemas/generalSettingsSchema';

export async function getGeneralSettings(): Promise<GeneralSettings | null> {
  const settings = await db.select().from(generalSettings).limit(1);
  return settings[0] as GeneralSettings || null;
}

export async function createGeneralSettings(data: GeneralSettings): Promise<GeneralSettings> {
  const validatedData = generalSettingsSchema.parse(data);
  const [inserted] = await db.insert(generalSettings).values(validatedData).returning();
  return inserted as GeneralSettings;
}

export async function updateGeneralSettings(id: number, data: Partial<GeneralSettings>): Promise<GeneralSettings> {
  const validatedData = generalSettingsSchema.partial().parse(data);
  const [updated] = await db
    .update(generalSettings)
    .set({ ...validatedData, updatedAt: new Date() })
    .where(eq(generalSettings.id, id))
    .returning();
  return updated as GeneralSettings;
}

export async function deleteGeneralSettings(id: number): Promise<void> {
  await db.delete(generalSettings).where(eq(generalSettings.id, id));
}