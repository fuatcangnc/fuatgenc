"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MediaLibraryModal } from "@/components/admin/media-library-modal";
import { musteriYorumuSchema, MusteriYorumuFormValues } from "@/schemas/musteriFormSchema";
import { ImageIcon } from "lucide-react";
import { createTestimonial } from "@/actions/testimonial.actions";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export function YeniMusteriForm() {
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false);
  const router = useRouter();

  const form = useForm<MusteriYorumuFormValues>({
    resolver: zodResolver(musteriYorumuSchema),
    defaultValues: {
      musteriAdi: "",
      musteriAciklamasi: "",
      musteriResmi: "",
      durum: true,
    },
  });

  const handleMediaSelect = (media: any) => {
    console.log("Selected media:", media);
    if (typeof media === 'string') {
      form.setValue("musteriResmi", media);
    } else if (media && typeof media.url === 'string') {
      form.setValue("musteriResmi", media.url);
    } else {
      console.error("Unexpected media format:", media);
      toast({
        title: "Hata",
        description: "Resim seçiminde bir hata oluştu.",
        variant: "destructive",
      });
    }
    setIsMediaLibraryOpen(false);
  };

  async function onSubmit(values: MusteriYorumuFormValues) {
    try {
      console.log("Form values:", values);
      
      await createTestimonial({
        musteriAdi: values.musteriAdi,
        musteriAciklamasi: values.musteriAciklamasi,
        musteriResmi: values.musteriResmi || null,
        durum: values.durum,
      });
      
      toast({
        title: "Başarılı",
        description: "Müşteri yorumu başarıyla eklendi.",
      });
      router.push("/admin/musteri-yorumlari");
    } catch (error) {
      toast({
        title: "Hata",
        description: "Müşteri yorumu eklenirken bir hata oluştu.",
        variant: "destructive",
      });
      console.error("Error details:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="musteriAdi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Müşteri Adı</FormLabel>
              <FormControl>
                <Input placeholder="Müşteri adını giriniz" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="musteriAciklamasi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Müşteri Açıklaması</FormLabel>
              <FormControl>
                <Textarea placeholder="Müşteri açıklamasını giriniz" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="musteriResmi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Müşteri Resmi</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-4">
                  {field.value && (
                    <div className="relative w-32 h-32">
                      <Image 
                        src={field.value} 
                        alt="Müşteri Resmi" 
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                  )}
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsMediaLibraryOpen(true)}
                  >
                    <ImageIcon className="mr-2 h-4 w-4" /> Resim Seç
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="durum"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Durum</FormLabel>
                <FormDescription>
                  Müşteri yorumunun durumunu belirleyin
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Gönder</Button>
      </form>
      {isMediaLibraryOpen && (
        <MediaLibraryModal
          isOpen={isMediaLibraryOpen}
          onClose={() => setIsMediaLibraryOpen(false)}
          onSelect={handleMediaSelect}
        />
      )}
    </Form>
  );
}