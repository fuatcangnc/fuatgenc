"use client"

import React from 'react';
import { X, Facebook, Twitter, Instagram } from 'lucide-react';
import { Button } from "@/components/ui/button";

import Image from 'next/image';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import Link from 'next/link';

interface DrawerComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DrawerContent className="h-full w-full sm:w-80 bg-black text-white p-0 border-r-0">
        <DrawerHeader className="border-b border-gray-700 p-4">
          <DrawerTitle className="text-xl font-bold">
          <div className="flex justify-center">
            <Link href="/" className="flex items-center">
              <Image
                width={170}
                height={70}
                src={"/fuat-genc-logo.svg"}
                alt=""
              />
            </Link>
          </div>
          </DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        
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
      </DrawerContent>
    </Drawer>
  );
};

const ArticlePreview: React.FC<{ title: string; date: string; imageUrl: string }> = ({ title, date, imageUrl }) => (
  <div className="flex space-x-4">
    <img src={imageUrl} alt={title} className="w-24 h-16 object-cover" />
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-400">{date}</p>
    </div>
  </div>
);

export default DrawerComponent;