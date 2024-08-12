"use server"

import { db } from "@/lib/db";
import { ContactForm, contactForm, NewContactForm } from "@/lib/schema";
import { contactFormSchema } from "@/schemas/contactFormSchema";
import { revalidatePath } from "next/cache";
import { sendEmail } from "@/utils/nodemailer";
import { eq } from "drizzle-orm";
export async function createContactForm(formData: FormData) {
  const name = formData.get('name') as string;
  const message = formData.get('message') as string;

  try {
    const validatedData = contactFormSchema.parse({ name, message });
    // Veritabanına kaydet
    await db.insert(contactForm).values({
      name: validatedData.name,
      message: validatedData.message
    });
    
    // E-posta gönder
    const emailResult = await sendEmail({
      to: process.env.CONTACT_FORM_RECIPIENT || 'your-email@example.com',
      subject: 'Yeni İletişim Formu Mesajı',
      text: `İsim: ${name}\nMesaj: ${message}`,
      html: `<h1>Yeni İletişim Formu Mesajı</h1><p><strong>İsim:</strong> ${name}</p><p><strong>Mesaj:</strong> ${message}</p>`,
    });

    if (!emailResult.success) {
      console.error('E-posta gönderilirken hata oluştu:', emailResult.error);
    }

    revalidatePath('/contact');
    
    return { success: true, message: 'Form başarıyla gönderildi.' };
  } catch (error) {
    console.error('Form gönderimi sırasında hata oluştu:', error);
    return { success: false, message: 'Form gönderilirken bir hata oluştu.' };
  }
}

export async function getContactForms(): Promise<ContactForm[]> {
  return db.select().from(contactForm).orderBy(contactForm.createdAt);
}

export async function getContactForm(id: number): Promise<ContactForm | null> {
  const [form] = await db.select().from(contactForm).where(eq(contactForm.id, id));
  return form || null;
}

export async function updateContactForm(id: number, data: Partial<NewContactForm>): Promise<ContactForm | null> {
  const validatedData = contactFormSchema.partial().parse(data);
  const [updatedForm] = await db
    .update(contactForm)
    .set(validatedData)
    .where(eq(contactForm.id, id))
    .returning();
  revalidatePath('/contact');
  return updatedForm || null;
}

export async function deleteContactForm(id: number): Promise<boolean> {
  const [deletedForm] = await db
    .delete(contactForm)
    .where(eq(contactForm.id, id))
    .returning();
  revalidatePath('/contact');
  return !!deletedForm;
}