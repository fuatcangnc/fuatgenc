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
            <h1 className="tracking-tight text-3xl font-bold mb-2">
              Gerçek WordPress Uzmanlarından WordPress’in İnceliklerini Öğrenin
            </h1>
            <CardDescription>
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
            <Input placeholder="Full Name" />
            <Input placeholder="Your Email Address" />
            <Button className="w-full bg-[#02CA96] hover:bg-orange-600 text-white py-4">
              Get Our Free WordPress Training
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
