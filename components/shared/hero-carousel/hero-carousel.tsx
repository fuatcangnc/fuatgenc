"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Link from "next/link";

interface CarouselItem {
  category: string;
  date: string;
  readTime: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface HeroCarouselProps {
  items: CarouselItem[];
  autoplayInterval?: number;
}

function HeroCarousel({ items, autoplayInterval = 5000 }: HeroCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    setProgress(0); // Reset progress when slide changes
  }, [api]);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  useEffect(() => {
    if (!api) return;

    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          const nextIndex = (current + 1) % count;
          api.scrollTo(nextIndex);
          return 0;
        }
        return prevProgress + 100 / (autoplayInterval / 100);
      });
    }, 100);

    return () => clearInterval(intervalId);
  }, [api, autoplayInterval, current, count]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Carousel setApi={setApi} className="min-h-[400px]">
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={index}>
              <Card className="border-2 border overflow-hidden bg-[#fafafa]">
                <CardContent className="p-0 flex flex-col md:flex-row min-h-[400px]">
                  <div className="md:w-1/3 relative h-48 md:h-auto">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6 flex flex-col justify-center gap-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-gray-200 text-gray-700 px-2 py-1 text-xs">
                        {item.category}
                      </span>
                      <span className="text-gray-500 text-xs">{item.date}</span>
                      <span className="text-gray-500 text-xs">
                        {item.readTime}
                      </span>
                    </div>
                    <Link href={`/post/`}>
                      <h3 className="font-semibold text-4xl transition-colors cursor-pointer group">
                        <span className="bg-left-bottom bg-gradient-to-r from-green-500 to-green-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-300 ease-out">
                          {item.title}
                        </span>
                      </h3>
                    </Link>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center mt-4">
        <div className="flex space-x-2" style={{ width: "15%" }}>
          {items.map((_, index) => (
            <div
              key={index}
              className="h-1 bg-gray-200 overflow-hidden flex-grow"
            >
              <div
                className="h-full bg-green-500 transition-all duration-100"
                style={{
                  width: index === current ? `${progress}%` : "0%",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroCarousel;
