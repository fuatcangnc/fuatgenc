'use client';

import React from 'react';
import { addSocialMedia, deleteSocialMedia } from '@/actions/social.actions';
import { DataTable } from '@/components/admin/data-table';
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import { FacebookLogo, XLogo,YoutubeLogo, InstagramLogo, LinkedinLogo, Icon, Pencil, Trash } from "@phosphor-icons/react";
import Link from 'next/link';

interface Platform {
  value: string;
  label: string;
  icon: Icon;
}

interface SocialMedia {
  id?: number;
  icon?: string;
  social_link?: string;
}

interface SocialMediaFormProps {
  platforms: Platform[];
  existingSocialMedia: SocialMedia[];
}

const formSchema = z.object({
  icon: z.string().min(1, {
    message: "Platform seçmelisiniz.",
  }),
  social_link: z.string().url({
    message: "Geçerli bir URL girmelisiniz.",
  }),
});

const platformIcons: { [key: string]: Icon } = {
  facebook: FacebookLogo,
  x: XLogo,
  instagram: InstagramLogo,
  linkedin: LinkedinLogo,
  youtube:YoutubeLogo
  // Diğer platformlar için ikonları ekleyin
};

export default function SocialMediaForm({ platforms, existingSocialMedia }: SocialMediaFormProps) {
  const [socialMediaData, setSocialMediaData] = React.useState<SocialMedia[]>(existingSocialMedia);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      icon: "",
      social_link: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append('icon', values.icon);
    formData.append('social_link', values.social_link);

    try {
      const result = await addSocialMedia(formData);
      if (result.success) {
        toast({
          title: "Başarılı!",
          description: "Sosyal medya başarıyla eklendi.",
        });
        form.reset();
        setSocialMediaData([...socialMediaData, { id: Date.now(), icon: values.icon, ...values }]);
      } else {
        toast({
          title: "Hata!",
          description: result.error ? JSON.stringify(result.error) : "Beklenmeyen bir hata oluştu.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Hata!",
        description: "Form gönderilirken bir hata oluştu.",
        variant: "destructive",
      });
      console.error(err);
    }
  }

  const columns: ColumnDef<SocialMedia>[] = [
    {
      accessorKey: "icon",
      header: "Platform",
      cell: ({ row }) => {
        const icon = row.original.icon;
        const IconComponent = platformIcons[icon] || FacebookLogo;
        const platform = platforms.find(p => p.value === icon)?.label || icon;
        return (
          <div className="flex items-center space-x-2">
            <IconComponent size={24} />
            <span>{platform}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "social_link",
      header: "Bağlantı",
      cell: ({ row }) => (
        <a href={row.original.social_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          {row.original.social_link}
        </a>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Link href={`/admin/sosyal-medya-yonetimi/duzenle/${row.original.id}`}>
            <Button variant="outline" size="sm">
              <Pencil className="mr-2 h-4 w-4" />
              Düzenle
            </Button>
          </Link>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={async () => {
              if (confirm("Bu sosyal medya bağlantısını silmek istediğinizden emin misiniz?")) {
                await deleteSocialMedia(row.original.id);
                setSocialMediaData(socialMediaData.filter(item => item.id !== row.original.id));
                toast({
                  title: "Başarılı!",
                  description: "Sosyal medya bağlantısı başarıyla silindi.",
                });
              }
            }}
          >
            <Trash className="mr-2 h-4 w-4" />
            Sil
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Platform</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Platform seçin" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {platforms.map((platform) => {
                      const IconComponent = platformIcons[platform.value] || FacebookLogo;
                      return (
                        <SelectItem key={platform.value} value={platform.value}>
                          <div className="flex items-center space-x-2">
                            <IconComponent size={24} />
                            <span>{platform.label}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Sosyal medya platformunu seçin.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="social_link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bağlantı</FormLabel>
                <FormControl>
                  <Input placeholder="https://www.example.com/profile" {...field} />
                </FormControl>
                <FormDescription>
                  Sosyal medya profilinizin bağlantısını girin.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Ekle</Button>
        </form>
      </Form>

      <div>
        <h3 className="text-lg font-medium mb-4">Mevcut Sosyal Medya Bağlantıları</h3>
        <DataTable columns={columns} data={socialMediaData} />
      </div>
    </div>
  );
}