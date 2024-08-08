"use client"

import React from 'react';
import { X, Facebook, Twitter, Instagram } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

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
            <span className="text-white">FITNESS</span>
            <span className="text-red-600">+MUSCLE</span>
          </DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Get the latest creative news from FooBar about art, design and business.</h2>
          <form className="space-y-4">
            <Input type="email" placeholder="Your email address.." className="bg-gray-800 border-gray-700" />
            <Button className="w-full bg-red-600 hover:bg-red-700">SUBSCRIBE</Button>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm text-gray-300">
                By signing up, you agree to the our terms and our Privacy Policy agreement.
              </Label>
            </div>
          </form>
        </div>

        <Separator className="bg-gray-700" />

        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">WHAT'S HOT</h2>
          <div className="space-y-4">
            <ArticlePreview 
              title="Intensity and Insanity: The Real Life Story of Two Legend Bodybuilders"
              date="Mar 15, 2021"
              imageUrl="/api/placeholder/300/200"
            />
            <ArticlePreview 
              title="This 5-Minute Workout Will Strengthen Your Core Without Sit-Ups"
              date="Mar 14, 2021"
              imageUrl="/api/placeholder/300/200"
            />
            <ArticlePreview 
              title="4 Best Workout Supplements for Men – Workouts Magazine"
              date="Mar 13, 2021"
              imageUrl="/api/placeholder/300/200"
            />
          </div>
        </div>

        <div className="absolute bottom-4 left-4 flex space-x-4">
          <Button variant="ghost" size="icon">
            <Facebook className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Twitter className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Instagram className="h-5 w-5" />
          </Button>
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