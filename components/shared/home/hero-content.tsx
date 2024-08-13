"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

function WordPressLanding() {
  return (
    <Card className=" bg-[#FAFAFA] shadow-sm">
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-12 p-6 items-center">
        <div>
          <CardHeader className="px-0">
            <h1 className="tracking-tight text-3xl font-bold mb-2 leading-normal">
              Gerçek WordPress Uzmanlarından WordPress’in İnceliklerini Öğrenin
            </h1>
            <CardDescription className="leading-relaxed text-[16px] text-[#1a1a1a]">
              25 milyondan fazla web sitesi tarafından kullanılan çeşitli
              WordPress markaları oluşturduk. Başladığımızda bilmeyi dilediğimiz
              dersleri öğrenmek için abone olun.
            </CardDescription>
          </CardHeader>

          <div className="flex flex-wrap gap-2 my-4">
            {[
              "Starting a Blog",
              "WordPress SEO",
              "WordPress Performance",
              "WordPress Errors",
              "WordPress Security",
              "Building an Online Store",
            ].map((topic, index) => (
              <Badge key={index} variant="secondary">
                {topic}
              </Badge>
            ))}
          </div>

          <form className="space-y-4 mt-6">
            <div className="flex flex-col md:flex-row gap-4">
            <Input placeholder="Ad Soyad" />
            <Input placeholder="Email adresiniz" />
            </div>
            <Button className="w-full bg-[#02CA96] hover:bg-orange-600 text-[#000] py-4 ">
            Ücretsiz SEO & WordPress E-Kitabı İndir
            </Button>
          </form>
        </div>

        <div className="flex items-center justify-center">
          <Image
            src="/wordpress-seo-ogren.webp"
            alt="WordPress SEO Öğren"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default WordPressLanding;
