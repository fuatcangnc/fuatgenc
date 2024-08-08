"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Video,
  Search,
  Moon,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Drawer from "./drawer";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <nav className="flex flex-col">
      {/* Top black section */}
      <div className="bg-black text-white py-0 border-b-4 border-b-[#03C998] md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <ul className="flex items-center space-x-2">
            <li>
              <Link
                href="#"
                target="_black"
                rel="nofollow noopener"
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
                className="w-[42px] h-[42px] bg-[#222222] rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Video className="text-white w-5 h-5" />
              </Link>
            </li>
          </ul>
          <div className="flex-grow flex justify-center">
            <Link href="/" className="flex items-center">
              <Image
                width={263}
                height={70}
                src={"/goodnews-logo-2.webp"}
                alt=""
              />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="default"
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              SUBSCRIBE
            </Button>
          </div>
        </div>
      </div>

      {/* Sticky bottom white section */}
      <div className="sticky top-0 z-50 bg-white text-black shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDrawerOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <Drawer
              isOpen={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
            />
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="flex space-x-8">
                <Link
                  href="/kategori"
                  className="text-sm font-bold hover:text-gray-600"
                >
                  SEO Öğren
                </Link>
                <Link
                  href="/kategori"
                  className="text-sm font-bold hover:text-gray-600"
                >
                  WordPress SEO
                </Link>
                <Link
                  href="/kategori"
                  className="text-sm font-bold hover:text-gray-600"
                >
                  WordPress Temaları
                </Link>
                <Link
                  href="/kategori"
                  className="text-sm font-bold hover:text-gray-600"
                >
                  Yapay Zeka
                </Link>
                <Link
                  href="/iletisim"
                  className="text-sm font-bold hover:text-gray-600"
                >
                  İletişim
                </Link>
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </Button>
            </div>
            
            <div className="socials flex gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-transparent p-0"
              >
                <Search className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-transparent p-0"
              >
                <Moon className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                HOME
              </Link>
              <Link
                href="/features"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                FEATURES
              </Link>
              <Link
                href="/health-fitness"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                HEALTH & FITNESS
              </Link>
              <Link
                href="/workout-programs"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                WORKOUT PROGRAMS
              </Link>
              <Link
                href="/buy-theme"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                BUY THEME
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;