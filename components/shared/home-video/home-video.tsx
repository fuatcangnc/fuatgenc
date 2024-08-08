"use client"
import React from "react";
import Image from "next/image";
import { Play } from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";

interface VideoItem {
  id: string;
  title: string;
  image: string;
  category: string;
  timeAgo: string;
}

interface HomeVideoProps {
  mainVideo: VideoItem;
  sideVideos: VideoItem[];
}

function HomeVideo({ mainVideo, sideVideos }: HomeVideoProps) {
    return (
      <div className="w-full bg-black text-white">
        <h2 className="text-center text-2xl font-bold py-4 bg-pink-600">VIDEOS</h2>
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 relative">
            <Image
              src={mainVideo.image}
              alt={mainVideo.title}
              width={800}
              height={450}
              className="w-full h-auto object-cover"
            />
            <div className="absolute top-4 left-4">
              <Play size={48} weight="fill" className="text-green-400" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-4">
              <span className="text-green-400 text-sm">{mainVideo.category} / {mainVideo.timeAgo}</span>
              <h3 className="text-xl font-bold mt-2">{mainVideo.title}</h3>
            </div>
          </div>
          <div className="space-y-4">
            {sideVideos.map((video) => (
              <Card key={video.id} className="bg-gray-800 overflow-hidden">
                <CardContent className="p-0 flex">
                  <div className="relative w-1/3">
                    <Image
                      src={video.image}
                      alt={video.title}
                      width={150}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Play size={24} weight="fill" className="text-green-400" />
                    </div>
                  </div>
                  <div className="w-2/3 p-4">
                    <span className="text-green-400 text-xs">{video.category} / {video.timeAgo}</span>
                    <h4 className="text-sm font-semibold mt-1">{video.title}</h4>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default HomeVideo;