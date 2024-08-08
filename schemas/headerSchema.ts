import * as z from "zod";

const socialLinkSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  url: z.string().url("Invalid URL"),
});

const topBarSchema = z.object({
  socialLinks: z.array(socialLinkSchema),
  phone: z.string().min(1, "Phone number is required"),
  getHelp: z.string().min(1, "Help text is required"),
});

const menuItemSchema = z.object({
    name: z.string().min(1, "Name is required"),
    link: z.string().min(1, "Link is required"), // Changed from url validation to simple text
    submenus: z.array(z.object({
      name: z.string().min(1, "Submenu name is required"),
      link: z.string().min(1, "Link is required"), // Changed from url validation to simple text
    })).optional(),
  });
  
  const headerSchema = z.object({
    image: z.string().min(1, "Image URL is required"),
    menus: z.array(menuItemSchema),
    menuOrder: z.array(z.string()).optional(), // Add this line
  });
  
  export { topBarSchema, headerSchema };
  export type HeaderData = z.infer<typeof headerSchema>;