"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Video,
  Search,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Drawer from "./drawer";

const Navbar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <nav className="flex flex-col">
      {/* Top black section */}
      <div className="bg-black text-white border-b-4 border-b-[#03C998] md:py-8 py-2 lg:block hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <ul className="hidden lg:flex items-center space-x-2 order-2">
            <li>
              <Link
                href="#"
                target="_black"
                rel="nofollow noopener"
                title="Facebook"
                className="w-[42px] h-[42px] bg-[#222222] rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Facebook className="text-white w-5 h-5" />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                target="_black"
                rel="nofollow noopener"
                title="Twitter"
                className="w-[42px] h-[42px] bg-[#222222] rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Twitter className="text-white w-5 h-5" />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                target="_black"
                rel="nofollow noopener"
                title="Instagram"
                className="w-[42px] h-[42px] bg-[#222222] rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Instagram className="text-white w-5 h-5" />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                target="_black"
                rel="nofollow noopener"
                title="Video"
                className="w-[42px] h-[42px] bg-[#222222] rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Video className="text-white w-5 h-5" />
              </Link>
            </li>
          </ul>
          <div className="flex justify-center">
            <Link href="/" className="flex items-center">
              <Image
                width={170}
                height={70}
                src={"/fuat-genc-logo.svg"}
                alt="fuat genc logo"
                title="Ana Sayfa"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Sticky bottom white section */}
      <div className="sticky top-0 z-50 bg-white text-black shadow">
        <div className="max-w-7xl mx-auto sm:px-6 ">
          <div className="flex justify-between h-16 items-center">
            
          <div className="hidden md:flex items-center  flex-1 ">
              <div className="flex space-x-8">
                <Link
                  href="/seo-ogren"
                  className="text-sm font-bold hover:text-gray-600"
                  title="SEO Öğren"
                >
                  SEO Öğren
                </Link>
                <Link
                  href="/wordpress-seo"
                  className="text-sm font-bold hover:text-gray-600"
                  title="WordPress SEO"
                >
                  WordPress SEO
                </Link>
                <Link
                  href="/wordpress-temalari"
                  className="text-sm font-bold hover:text-gray-600"
                  title="WordPress Temaları"
                >
                  WordPress Temaları
                </Link>
                <Link
                  href="/yapay-zeka"
                  className="text-sm font-bold hover:text-gray-600"
                  title="Yapay Zeka"
                >
                  Yapay Zeka
                </Link>
                <Link
                  href="/iletisim"
                  className="text-sm font-bold hover:text-gray-600"
                  title="İletişim"
                >
                  İletişim
                </Link>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDrawerOpen(true)}
              className="sm:flex lg:hidden"
              role="button"
              title="Mobil Menü"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <Drawer
              isOpen={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
            />
            
            <div className="socials flex gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-transparent p-0"
                role="button"
                title="Arama"
              >
                <Search className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;