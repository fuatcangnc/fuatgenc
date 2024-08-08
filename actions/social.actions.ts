"use server"
import { db } from "@/lib/db";
import { socialMediaTable } from "@/lib/schema";
import { SocialMedia, NewSocialMedia } from "@/schemas/socialSchemas";
import { eq } from "drizzle-orm";
import { socialMediaSchema } from "@/schemas/socialSchemas";
import { z } from "zod";

export async function addSocialMedia(formData: FormData) {
  try {
    const icon = formData.get('icon');
    const social_link = formData.get('social_link');

    const validatedData = socialMediaSchema.parse({
      icon: icon,
      social_link: social_link,
    });

    await db.insert(socialMediaTable).values(validatedData);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
      return { success: false, error: error.errors };
    }
    console.error('Failed to add social media:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function getSocialMedia() {
  try {
    const socialMedia = await db.select().from(socialMediaTable);
    return socialMedia;
  } catch (error) {
    console.error('Failed to get social media:', error);
    return [];
  }
}

export async function updateSocialMedia(id: number, formData: FormData) {
    try {
      const icon = formData.get('icon') as string;
      const social_link = formData.get('social_link') as string;
  
      const validatedData = socialMediaSchema.parse({
        icon,
        social_link,
      });
  
      const [updated] = await db
        .update(socialMediaTable)
        .set(validatedData)
        .where(eq(socialMediaTable.id, id))
        .returning();
  
      return { success: true, data: updated };
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Validation error:', error.errors);
        return { success: false, error: error.errors };
      }
      console.error('Failed to update social media:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

export async function deleteSocialMedia(id: number): Promise<void> {
  await db.delete(socialMediaTable).where(eq(socialMediaTable.id, id));
}