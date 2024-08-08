// pages/blog-detay.tsx
"use client";

import React from "react";
import Link from "next/link";
import {
  ChatCircleText,
  WhatsappLogo,
  FacebookLogo,
  XLogo,
} from "@phosphor-icons/react";
import Post1 from "@/components/shared/single-post/article";

interface BlogDetayProps {
  // Add any necessary props here
}

function BlogDetay(props: BlogDetayProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row lg:gap-x-8 mt-8">
        <div className="hidden lg:flex flex-col items-center space-y-4 sticky top-4 self-start">
          <div className="flex flex-col items-center">
            <Link href="#comments" className="flex flex-col items-center">
              <span className="text-xs font-semibold text-gray-600">Yorum</span>
              <ChatCircleText weight="light" className="w-6 h-6 text-red-600" />
              <div className="bg-red-600 rounded-full w-full px-2 py-0.5 mt-1 flex items-center justify-center">
                <span className="text-xs font-semibold text-white">1</span>
              </div>
            </Link>
          </div>
          <div className="w-full h-px bg-gray-300"></div>
          <span className="text-xs font-semibold text-gray-600 mb-2">
            Paylaş
          </span>
          <Link href="#" className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full  bg-white shadow-md  flex items-center justify-center">
              <WhatsappLogo weight="fill" className="w-6 h-6 text-green-600" />
            </div>
          </Link>
          <Link href="#" className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-white shadow-md  flex items-center justify-center">
              <FacebookLogo weight="fill" className="w-6 h-6 text-blue-600" />
            </div>
          </Link>
          <Link href="#" className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full  bg-white shadow-md flex items-center justify-center">
              <XLogo className="w-6 h-6 text-blue-500" />
            </div>
          </Link>
        </div>

        <div className="lg:w-[calc(70%-40px)]">
          <Post1 />
        </div>

        <div className="lg:w-[30%] mt-8 lg:mt-0 lg:sticky lg:top-4 lg:self-start">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Related News</h3>
            {/* List of other news items goes here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetay;