'use server'

import { db } from '@/lib/db';
import { NewNewsletter, newsletter } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { 
  newsletterSubscribeSchema, 
  newsletterUnsubscribeSchema, 
  NewsletterSubscribe, 
  NewsletterUnsubscribe 
} from '@/schemas/newsletterSchema';
import { ZodError } from 'zod';

// @ts-ignore
export async function subscribeToNewsletter(data: NewsletterSubscribe) {
    try {
      const { email } = newsletterSubscribeSchema.parse(data);
      
      const newSubscriber: NewNewsletter = {
        email,
        // @ts-ignore
        isSubscribed: true, // Bu kısım
      };
  
      
      await db.insert(newsletter).values(newSubscriber).onConflictDoUpdate({
        target: newsletter.email,
        // @ts-ignore
        set: { isSubscribed: true }, // Burada da aynı isim kullanılmalı
      });
      
      return { success: true, message: 'Bültene başarıyla abone oldunuz.' };
    } catch (error) {
      if (error instanceof ZodError) {
        return { success: false, message: error.errors[0].message };
      }
      console.error('Newsletter subscription error:', error);
      return { success: false, message: 'Abonelik işlemi sırasında bir hata oluştu.' };
    }
  }
  

export async function getSubscribers() {
  try {
    const subscribers = await db.select().from(newsletter).where(eq(newsletter.isSubscribed, true));
    return { success: true, data: subscribers };
  } catch (error) {
    console.error('Get subscribers error:', error);
    return { success: false, message: 'Aboneler alınırken bir hata oluştu.' };
  }
}