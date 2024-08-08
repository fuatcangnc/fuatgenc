"use client"

import React from 'react';
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { ThumbsUp, Smiley, Brain, AngryFace, ThumbsDown, TwitterLogo, FacebookLogo, InstagramLogo, LinkedinLogo, YoutubeLogo } from "@phosphor-icons/react";

// Arayüz tanımlamaları
interface Reaction {
  icon: React.ReactNode;
  label: string;
  count: number;
}

interface Tag {
  name: string;
}

interface Author {
  name: string;
  avatar: string;
  description: string;
}

interface PostFooterProps {
  reactions?: Reaction[];
  tags?: Tag[];
  author?: Author;
}

// Varsayılan değerler
const defaultReactions: Reaction[] = [
  { icon: <Smiley weight="fill" />, label: "Beğendim", count: 97 },
  { icon: <ThumbsUp weight="fill" />, label: "Alkışlıyorum", count: 30 },
  { icon: <Brain weight="fill" />, label: "Düşünceliyim", count: 17 },
  { icon: <Smiley weight="fill" />, label: "Üzüldüm", count: 16 },
  { icon: <Smiley weight="fill" />, label: "Çok kızdım", count: 19 },
  { icon: <ThumbsDown weight="fill" />, label: "Beğenmedim", count: 11 },
];

const defaultTags: Tag[] = [
  { name: "GEOIT" },
  { name: "GEOIT TEMA" },
  { name: "TESLA" },
  { name: "WORDPRESS" },
];

const defaultAuthor: Author = {
  name: "Kan Themes",
  avatar: "/default-avatar.jpg",
  description: "Geoit, blog/teknoloji ve viral siteleri için geliştirilmiş ücretli bir wordpress temasıdır.",
};

function PostFooter({ 
  reactions = defaultReactions, 
  tags = defaultTags, 
  author = defaultAuthor 
}: PostFooterProps) {
  return (
    <Card className="w-full max-w-3xl mx-auto mt-8">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Bu Yazıya Tepkiniz Ne Oldu?</h2>
        
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-6">
          {reactions.map((reaction, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-3xl mb-2">{reaction.icon}</div>
              <span className="text-sm text-center">{reaction.label}</span>
              <span className="text-xs text-gray-500">{reaction.count}</span>
            </div>
          ))}
        </div>

        <Separator className="my-6" />

        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary">{tag.name}</Badge>
          ))}
        </div>

        <Separator className="my-6" />

        <div className="flex items-center space-x-4">
          <Avatar>
            <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
            <span className="sr-only">{author.name}</span>
          </Avatar>
          <div>
            <h3 className="font-semibold">{author.name}</h3>
            <p className="text-sm text-gray-500">{author.description}</p>
          </div>
        </div>

        <div className="flex mt-4 space-x-2">
          <TwitterLogo size={24} />
          <FacebookLogo size={24} />
          <InstagramLogo size={24} />
          <LinkedinLogo size={24} />
          <YoutubeLogo size={24} />
        </div>
      </div>
    </Card>
  );
}

export default PostFooter;