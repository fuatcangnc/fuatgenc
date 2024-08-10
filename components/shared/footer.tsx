"use client"
import React from 'react';
import Link from 'next/link';
import { FacebookLogo, XLogo, TelegramLogo, YoutubeLogo, InstagramLogo, Warning, WhatsappLogo, Phone, EnvelopeSimple } from "@phosphor-icons/react";

interface MenuItem {
  icon: React.ElementType;
  text: string;
  link?: string;
}

function Footer(): JSX.Element {
  const socialIcons: { icon: React.ElementType; link: string }[] = [
    { icon: FacebookLogo, link: "https://facebook.com" },
    { icon: XLogo, link: "https://x.com" },
    { icon: TelegramLogo, link: "https://telegram.org" },
    { icon: YoutubeLogo, link: "https://youtube.com" },
    { icon: InstagramLogo, link: "https://instagram.com" }
  ];

  const araclar: { text: string; href: string }[] = [
    { text: 'SEO Danışmanlığı', href: '/#' },
    { text: 'SEO Analiz', href: '/#' },
    { text: 'Ücretsiz SEO Eğitimi', href: '/#' },
    { text: 'Blog', href: '/#' },
  ];

  const forumItems: { text: string; href: string }[] = [
    { text: 'SEO Sözlüğü', href: '/#' },
    { text: 'Bilgi Merkezi', href: '/#' },
    { text: 'Kaynaklar', href: '/#' },
    { text: 'HTML Sitemap', href: '/#' },
  ];

  const digerSayfalar: { text: string; href: string }[] = [
    { text: 'Hakkımızda', href: '/hakkimizda' },
    { text: 'Premium Üyelikler', href: '/premium-uyelikler' },
    { text: 'Gizlilik Politikası', href: '/gizlilik-politikasi' },
    { text: 'Mesafeli Satış Sözleşmesi', href: '/mesafeli-satis-sozlesmesi' },
    { text: 'Teslimat ve İade Politikası', href: '/teslimat-ve-iade-politikasi' },
    { text: 'Hukuka Aykırılık Bildirimi', href: '/hukuka-aykirilik-bildirimi' }
  ];

  const altMenu: { text: string; href: string }[] = [
    { text: 'Hakkımızda', href: '/hakkimizda' },
    { text: 'Kullanım Şartları', href: '/kullanim-sartlari' },
    { text: 'Gizlilik Politikası', href: '/gizlilik-politikasi' },
    { text: 'İletişim', href: '/iletisim' }
  ];

  const contactItems: MenuItem[] = [
    { icon: WhatsappLogo, text: 'WhatsApp', link: 'https://wa.me/+905530805798' },
    { icon: Phone, text: '05530805798' },
    { icon: EnvelopeSimple, text: 'bilgi@fuatgenc.com' },
  ];

  function renderMenuItems(items: { text: string; href: string }[]): JSX.Element[] {
    return items.map(function(item: { text: string; href: string }): JSX.Element {
      return (
        <li key={item.text}>
          <Link href={item.href} className="hover:underline text-[13px] text-[#d1d4db]">{item.text}</Link>
        </li>
      );
    });
  }

  function renderContactItems(): JSX.Element[] {
    return contactItems.map(function(item: MenuItem, index: number): JSX.Element {
      const Icon = item.icon;
      return (
        <div key={index} className="flex items-center space-x-2 bg-[#2c2f38] p-2 rounded">
          <Icon size={20} />
          {item.link ? (
            <Link href={item.link} className="text-[13px] text-[#d1d4db]">{item.text}</Link>
          ) : (
            <span className="text-[13px] text-[#d1d4db]">{item.text}</span>
          )}
        </div>
      );
    });
  }

  return (
    <footer className="bg-[#171A22] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo, Açıklama ve İletişim Bilgileri */}
          <div className="space-y-4 md:mr-auto">
            <Link href="/" className="text-2xl font-bold">Fuat Genc</Link>
            <p className="text-sm text-[#d1d4db]">
              En güvenilir SEO rehberiniz.
            </p>
            <div className="space-y-2">
              {renderContactItems()}
            </div>
            <div className="flex space-x-4">
              {socialIcons.map(function({ icon: Icon, link }: { icon: React.ElementType; link: string }, index: number): JSX.Element {
                return (
                  <Link key={index} href={link} target="_blank" rel="noopener noreferrer nofollow external">
                    <Icon size={20} className="text-[#d1d4db] hover:text-white transition-colors duration-300" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Araçlar */}
          <div >
            <h3 className="text-lg font-semibold mb-4 text-white ">Hizmetler</h3>
            <ul className="space-y-2">
              {renderMenuItems(araclar)}
            </ul>
          </div>

          {/* WM Aracı Forum */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Sayfalar</h3>
            <ul className="space-y-2">
              {renderMenuItems(forumItems)}
            </ul>
          </div>

          {/* Diğer Sayfalar */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Yazılar</h3>
            <ul className="space-y-2">
              {renderMenuItems(digerSayfalar)}
            </ul>
          </div>
        </div>

        {/* Alt Menü */}
        <div className="mt-8 pt-8 border-t border-[#2c2f38] flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            {altMenu.map(function(item: { text: string; href: string }): JSX.Element {
              return <Link key={item.text} href={item.href} className="hover:underline text-[13px] text-[#d1d4db]">{item.text}</Link>;
            })}
          </div>
          <p className="text-sm text-[#d1d4db]">Felo Studio tarafından tasarlanmıştır.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;