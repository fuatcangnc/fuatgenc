"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  FacebookLogo, TwitterLogo, InstagramLogo, PinterestLogo, YoutubeLogo, 
  Video, SoundcloudLogo, SpotifyLogo, Play, Clock, XLogo
} from "@phosphor-icons/react";
import Link from 'next/link';
import Image from 'next/image';
import Avatar from './home/avatar';
import { subscribeToNewsletter } from '@/actions/newsletter.actions';

const socialMediaData = [
    { name: 'Facebook', icon: FacebookLogo, url: 'https://facebook.com', iconColor: 'text-blue-600' },
    { name: 'X', icon: XLogo, url: 'https://x.com', iconColor: 'text-gray-500' },
    { name: 'Pinterest', icon: PinterestLogo, url: 'https://pinterest.com', iconColor: 'text-red-600' },
    { name: 'Instagram', icon: InstagramLogo, url: 'https://instagram.com', iconColor: 'text-pink-600' },
    { name: 'YouTube', icon: YoutubeLogo, url: 'https://youtube.com', iconColor: 'text-red-600' },
    { name: 'Vimeo', icon: Video, url: 'https://vimeo.com', iconColor: 'text-cyan-500' },
];

const exploreMoreData = [
  {
    category: 'Tech',
    title: 'Tencent Music Entertainment Group Sponsored ADR (TME)',
    author: 'Michael',
    readTime: '2 Mins Read',
    image: '/about.jpg',
    slug: 'tencent-music-entertainment'
  },
  {
    category: 'Tech',
    title: 'Fast food companies compete for the best value meal',
    readTime: '2 Mins Read',
    image: '/about.jpg',
    slug: 'fast-food-companies-compete'
  },
  {
    category: 'Business',
    title: 'What My Mother Taught Me About Black Conservatives',
    readTime: '2 Mins Read',
    image: '/about.jpg',
    slug: 'black-conservatives'
  },
  {
    category: 'Active',
    title: 'Economic Growth Is Essential. So Is Resilience',
    readTime: '2 Mins Read',
    image: '/about.jpg',
    slug: 'economic-growth-resilience'
  },
];

function HomeSidebar() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
  
    try {
      const result = await subscribeToNewsletter({ email });
      if (result.success) {
        setMessage(result.message);
        setEmail('');
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside className="space-y-8 text-[13px]">
      <Avatar />

      <div>
        <ul className="grid grid-cols-2 gap-2">
          {socialMediaData.map((item, index) => (
            <li key={index}>
              <Link 
                href={item.url} 
                target='_blank'
                rel="nofollow"
                className="py-2 px-6 flex justify-start items-center min-h-[45px] hover:bg-slate-100 transition-opacity border border-black border-opacity-10 text-black"
              >
                <span className="flex items-center">
                  <item.icon className={`mr-2 ${item.iconColor}`} size={16} weight="fill" />
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Card className='border'>
        <CardHeader>
          <p className="text-xl font-bold">Bültenimize Katılın</p>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-600">
            Hemen ücretsiz üye olun ve yeni güncellemelerden haberdar olan ilk kişi olun.
          </p>
          <form className="space-y-4" onSubmit={handleSubscribe}>
            <Input 
              type="email" 
              placeholder="E-Posta Adresiniz" 
              className="min-h-[45px]" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button 
              type="submit" 
              className="w-full bg-red-500 hover:bg-red-600 text-white min-h-[45px]"
              disabled={isLoading}
            >
              {isLoading ? 'İşleniyor...' : 'Abone Ol'}
            </Button>
          </form>
          {message && (
            <p className={`mt-2 text-sm ${message.includes('başarıyla') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </CardContent>
      </Card>

    </aside>
  );
}

export default HomeSidebar;