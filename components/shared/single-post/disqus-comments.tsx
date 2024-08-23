"use client"
import { DiscussionEmbed } from 'disqus-react';

interface DisqusCommentsProps {
  post: {
    slug: string;
    title: string;
  };
}

export default function DisqusComments({ post }: DisqusCommentsProps) {
  const disqusConfig = {
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/${post.slug}`,
    identifier: post.slug,
    title: post.title,
    language: 'tr_TR' // Türkçe için
  };

  return (
    <DiscussionEmbed
      shortname="fuatgenc"
      config={disqusConfig}
    />
  );
}