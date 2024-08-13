import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  varchar,
  serial,
  jsonb,
} from "drizzle-orm/pg-core"
import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import { type InferSelectModel, type InferInsertModel, relations } from 'drizzle-orm';
import * as z from 'zod';
import { sikSorulanSorularSchema } from '@/schemas/faqSchema';
import { categorySchema, CategorySchema } from '@/schemas/categorySchema';

export type SikSorulanSorularSchemaType = z.infer<typeof sikSorulanSorularSchema>;
const connectionString = process.env.POSTGRES_URL!
const pool = postgres(connectionString, { max: 1 })

export const db = drizzle(pool)


export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  password: text("password").notNull().unique(),
  email: text("email").notNull(),
})

export const topBar = pgTable("top_bar", {
  id: serial("id").primaryKey(),
  socialLinks: jsonb("social_links").notNull(), // JSON field to store multiple social links
  phone: text("phone").notNull(), // String field to store phone number
  getHelp: text("get_help").notNull(), // String field to store help text
});

// Header Schema
export const header = pgTable("header", {
  id: serial("id").primaryKey(),
  image: text("image").notNull(),
  menus: jsonb("menus").notNull(),
  menuOrder: jsonb("menuOrder").notNull().default([]), // Add this line
});

export const googleFormSchema = pgTable("google_forms", {
  id: serial("id").primaryKey().notNull(),
  googleVerificationCode: text("google_verification_code"),
  googleAnalyticsCode: text("google_analytics_code"),
  captchaSiteKey: text("captcha_site_key"),
  microsoftClarityCode: text("microsoft_clarity_code"), // Yeni eklenen alan
})

export type GoogleForm = typeof googleFormSchema.$inferSelect;
export type NewGoogleForm = typeof googleFormSchema.$inferInsert;

export const whatsAppForms = pgTable('whatsapp_forms', {
  id: serial('id').primaryKey(),
  whatsappMessage: text('whatsapp_message').notNull(),
  customerMessage: text('customer_message').notNull(),
  personelName: text('personel_name').notNull(),
  whatsappNumber: text('whatsapp_number').notNull(),
  status: boolean('status').notNull().default(true),
});

export type WhatsAppForm = InferSelectModel<typeof whatsAppForms>;
export type NewWhatsAppForm = InferInsertModel<typeof whatsAppForms>;


export const sikSorulanSorular = pgTable('sik_sorulan_sorular', {
  id: serial('id').primaryKey(),
  soruAdi: text('soru_adi').notNull(),
  durumu: boolean('durumu').notNull().default(true),
  icerik: text('icerik').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type SikSorulanSoru = InferSelectModel<typeof sikSorulanSorular>;
export type NewSikSorulanSoru = InferInsertModel<typeof sikSorulanSorular>;

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("active"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  image: text("image").notNull(), 
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;


export const socialMediaTable = pgTable("social_media", {
  id: serial("id").primaryKey(),
  icon: varchar("icon", { length: 50 }).notNull(),
  social_link: varchar("social_link", { length: 255 }).notNull(),
});

export const mediaFiles = pgTable('media_files', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  size: integer('size').notNull(),
  url: varchar('url', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  alternativeText: varchar('alternative_text', { length: 255 }),
  title: varchar('title', { length: 255 }),
  description: varchar('description', { length: 1000 }),
});
export type MediaFile = typeof mediaFiles.$inferSelect
export type NewMediaFile = typeof mediaFiles.$inferInsert

export const generalSettings = pgTable('general_settings', {
  id: serial('id').primaryKey(),
  siteTitle: varchar('site_title', { length: 255 }),
  tagline: text('tagline'),
  siteIcon: varchar('site_icon', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const contactSettings = pgTable('contact_settings', {
  id: serial('id').primaryKey(),
  address: text('address').notNull(),
  city: varchar('city', { length: 100 }).notNull(),
  district: varchar('district', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  fax: varchar('fax', { length: 20 }),
  phone: varchar('phone', { length: 20 }).notNull(),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  content: text('content'),
  excerpt: text('excerpt'),
  featuredImage: text('featured_image'),
  isFeatured: boolean('is_featured').default(false),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  metaTitle: varchar('meta_title', { length: 255 }), // Yeni eklenen alan
  metaDescription: text('meta_description'), // Yeni eklenen alan
});

export const musteriYorumlari = pgTable("musteri_yorumlari", {
  id: serial("id").primaryKey(),
  musteriAdi: varchar("musteri_adi", { length: 255 }).notNull(),
  musteriAciklamasi: text("musteri_aciklamasi").notNull(),
  musteriResmi: text('musteri_resmi'),
  durum: boolean("durum").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type MusteriYorumu = InferSelectModel<typeof musteriYorumlari>;
export type YeniMusteriYorumu = Omit<MusteriYorumu, 'id' | 'createdAt' | 'updatedAt'>;







export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  isDefault: boolean('is_default').default(false),
  seoTitle: varchar('seo_title', { length: 255 }),
  seoDescription: text('seo_description'),
  seoImage: text('seo_image'),
  isIndexed: boolean('is_indexed').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Post ve Category arasındaki ilişkiyi sağlayan ara tablo
export const postCategories = pgTable('post_categories', {
  postId: integer('post_id').notNull().references(() => posts.id),
  categoryId: integer('category_id').notNull().references(() => categories.id),
}, (t) => ({
  pk: primaryKey({ columns: [t.postId, t.categoryId] }),
}));
// İlişkileri tanımlayalım
export const categoriesRelations = relations(categories, ({ many }) => ({
  posts: many(postCategories),
}));

export const postCategoriesRelations = relations(postCategories, ({ one }) => ({
  post: one(posts, {
    fields: [postCategories.postId],
    references: [posts.id],
  }),
  category: one(categories, {
    fields: [postCategories.categoryId],
    references: [categories.id],
  }),
}));

export const postsRelations = relations(posts, ({ many }) => ({
  categories: many(postCategories)
}));


export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export const contactForm = pgTable('contact_form', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  status: boolean('status').notNull().default(false), // false = Okunmadı, true = Okundu
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type ContactForm = typeof contactForm.$inferSelect;
export type NewContactForm = typeof contactForm.$inferInsert;


export const newsletter = pgTable('newsletter', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  isSubscribed: boolean('is_subscribed').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type Newsletter = typeof newsletter.$inferSelect;
export type NewNewsletter = typeof newsletter.$inferInsert;