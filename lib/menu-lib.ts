import { Folders, Translate,File,Question } from "@phosphor-icons/react";
import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/admin/dashboard",
          label: "Dashboard",
          active: pathname.includes("/admin/dashboard"),
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Medya",
      menus: [
        {
          href: "/admin/ortam-kutuphanesi",
          label: "Ortam Kutuphanesi",
          active: pathname.includes("/admin/ortam-kutuphanesi"),
          icon: Bookmark,
          submenus: []
        },
      ]
    },
    {
      groupLabel: "İçerik",
      menus: [
        {
          href: "",
          label: "Sayfalar",
          active: pathname.includes("/admin/sayfalar"),
          icon: File,
          submenus: [
            {
              href: "/admin/sayfalar",
              label: "Tüm Sayfalar",
              active: pathname === "/admin/sayfalar"
            },
            {
              href: "/admin/sayfalar/yeni",
              label: "Yeni Sayfa",
              active: pathname === "/admin/sayfalar/yeni"
            },
          ]
        }, {
          href: "",
          label: "Dil Yönetimi",
          active: pathname.includes("/admin/sayfalar"),
          icon: Translate,
          submenus: [
            
            {
              href: "/admin/detayli",
              label: "Yeni Dil Ekle",
              active: pathname === "/admin/detayli"
            },
            {
              href: "/admin/cok-dilli",
              label: "Dil Listesi",
              active: pathname === "/admin/cok-dilli"
            },
          ]
        },
        {
          href: "",
          label: "Hizmetler",
          active: pathname.includes("/admin/hizmetler"),
          icon: Folders,
          submenus: [
            {
              href: "/admin/hizmet/ekle",
              label: "Yeni Hizmet Ekle",
              active: pathname === "/admin/hizmet/ekle"
            },
            {
              href: "/admin/hizmet/hizmetler",
              label: "New Post",
              active: pathname === "/admin/hizmet/hizmetler"
            },
          ]
        },
        {
          href: "",
          label: "Sıkça Sorulan Sorular",
          active: pathname.includes("/admin/sik-sorulan-sorular"),
          icon: Question,
          submenus: [
            {
              href: "/admin/sik-sorulan-sorular/tum-sorular",
              label: "Tüm Sorular",
              active: pathname === "/admin/sik-sorulan-sorular/tum-sorular"
            },
            {
              href: "/admin/sik-sorulan-sorular/yeni-soru-ekle",
              label: "Yeni Soru Ekle",
              active: pathname === "/admin/sik-sorulan-sorular/yeni-soru-ekle"
            },
          ]
        },
        {
          href: "",
          label: "İçerik Yönetimi",
          icon: Question,
          submenus: [
            {
              href: "/admin/blog-yonetimi",
              label: "Blog Yönetimi",
              active: pathname === "/admin/blog-yonetimi"
            },{
              href: "/admin/kategoriler",
              label: "Kategoriler",
              active: pathname === "/admin/kategoriler"
            },{
              href: "/admin/proje-yonetimi",
              label: "Proje Yönetimi",
              active: pathname === "/admin/proje-yonetimi"
            },
            {
              href: "/admin/sosyal-medya-yonetimi",
              label: "Sosyal Medya Yönetimi",
              active: pathname === "/admin/sosyal-medya-yonetimi"
            },{
              href: "/admin/musteri-yorumlari",
              label: "Müşteri Yorumları",
              active: pathname === "/admin/musteri-yorumlari"
            },
          ]
        },
        {
          href: "",
          label: "Ayarlar",
          icon: Question,
          submenus: [
            {
              href: "/admin/genel-ayarlar",
              label: "Genel Ayarlar",
              active: pathname === "/admin/genel-ayarlar"
            },
            {
              href: "/admin/iletisim-ayarlari",
              label: "İletişim Ayarları",
              active: pathname === "/admin/iletisim-ayarlari"
            },
            {
              href: "/admin/sosyal-medya-yonetimi",
              label: "Sosyal Medya Yönetimi",
              active: pathname === "/admin/sosyal-medya-yonetimi"
            }
          ]
        },
      ]
    },
    {
      groupLabel: "Seo Ayarları",
      menus: [
        {
          href: "",
          label: "Schema",
          active: pathname.includes("/posts"),
          icon: SquarePen,
          submenus: [
            {
              href: "/admin/cok-dilli",
              label: "Çok Dilli",
              active: pathname === "/admin/cok-dilli"
            },
            {
              href: "/admin/detayli",
              label: "New Post",
              active: pathname === "/admin/detayli"
            },
            {
              href: "/admin/seo-ayarlari/icerik-olusturucu",
              label: "Ai İçerik Oluşturucu",
              active: pathname === "/admin/seo-ayarlari/icerik-olusturucu"
            }
          ]
        },
        {
          href: "/admin/header-ayarlari",
          label: "Header Ayarları",
          active: pathname.includes("/admin/header-ayarlari"),
          icon: Bookmark,
          submenus: []
        },
        {
          href: "/tags",
          label: "Tags",
          active: pathname.includes("/tags"),
          icon: Tag,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Site Ayarları",
      menus: [
        {
          href: "/admin/api-ayarlari",
          label: "Site Ayarları",
          active: pathname.includes("/admin/api-ayarlari"),
          icon: Users,
          submenus: [
            {
              href: "/admin/api-ayarlari/google",
              label: "Google Ayarları",
              active: pathname === "/admin/api-ayarlari/google"
            },
            {
              href: "/admin/api-ayarlari/whatsapp",
              label: "Whatsapp Ayarları",
              active: pathname === "/admin/api-ayarlari/whatsapp"
            },
            {
              href: "/admin/sayfalar/yeni",
              label: "Yeni Sayfa",
              active: pathname === "/admin/sayfalar/yeni"
            }
          ]
        },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: []
        }
      ]
    }
  ];
}