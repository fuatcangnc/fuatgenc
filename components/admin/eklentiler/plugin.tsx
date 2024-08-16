"use client"
import React from 'react'
import PluginCard from './plugin-card'
import { Pencil, Calendar, Ticket, Clock, ShoppingCart, Image, ChartBar, LockSimple } from "@phosphor-icons/react"

function Plugin() {
  const plugins = [
    {
      title: "Appointment Booking Calendar",
      description: "Unlimited appointments, booking calendars, and notifications. Powerful appointment booking plugin and booking system.",
      rating: 5,
      totalRatings: 137,
      author: "NSquared",
      activeInstalls: "40.000+ etkin kurulum",
      testedVersion: "6.6.1 ile test edildi",
      icon: <Pencil className="w-full h-full text-orange-500" />,
      buttons: [
        { text: "Etkisizleştir", variant: "outline" as const, className: "bg-orange-500 text-white hover:bg-orange-600 hover:text-white" },
        { text: "Kaldır", variant: "outline" as const, className: "border-red-500 text-red-500 hover:bg-red-500 hover:text-white" }
      ]
    },
    {
      title: "The Events Calendar",
      description: "The Events Calendar: #1 calendar plugin for WordPress. Create/manage events (virtual too!) on your site with the free plugin.",
      rating: 4.5,
      totalRatings: 2260,
      author: "The Events Calendar",
      activeInstalls: "700.000+ etkin kurulum",
      testedVersion: "6.6.1 ile test edildi",
      icon: <Calendar className="w-full h-full text-blue-500" />,
      buttons: [
        { text: "Eklentiyi Kur", variant: "outline" as const, className: "bg-blue-500 text-white hover:bg-blue-600 hover:text-white" }
      ]
    },
    {
      title: "WooCommerce",
      description: "An eCommerce toolkit that helps you sell anything. Beautifully.",
      rating: 4.5,
      totalRatings: 7845,
      author: "Automattic",
      activeInstalls: "5.000.000+ etkin kurulum",
      testedVersion: "6.6.1 ile test edildi",
      icon: <ShoppingCart className="w-full h-full text-purple-500" />,
      buttons: [
        { text: "Güncelle", variant: "outline" as const, className: "bg-green-500 text-white hover:bg-green-600 hover:text-white" }
      ]
    },
    {
      title: "Yoast SEO",
      description: "Improve your WordPress SEO: Write better content and have a fully optimized WordPress site using the Yoast SEO plugin.",
      rating: 4.5,
      totalRatings: 28750,
      author: "Team Yoast",
      activeInstalls: "5.000.000+ etkin kurulum",
      testedVersion: "6.6.1 ile test edildi",
      icon: <ChartBar className="w-full h-full text-green-500" />,
      buttons: [
        { text: "Etkisizleştir", variant: "outline" as const, className: "bg-orange-500 text-white hover:bg-orange-600 hover:text-white" },
        { text: "Kaldır", variant: "outline" as const, className: "border-red-500 text-red-500 hover:bg-red-500 hover:text-white" }
      ]
    },
    {
      title: "Wordfence Security",
      description: "Wordfence Security - Anti-virus, Firewall and Malware Scan",
      rating: 4.5,
      totalRatings: 4520,
      author: "Wordfence",
      activeInstalls: "4.000.000+ etkin kurulum",
      testedVersion: "6.6.1 ile test edildi",
      icon: <LockSimple className="w-full h-full text-red-500" />,
      buttons: [
        { text: "Eklentiyi Kur", variant: "outline" as const, className: "bg-blue-500 text-white hover:bg-blue-600 hover:text-white" }
      ]
    },
    {
      title: "Elementor Website Builder",
      description: "The Elementor Website Builder has it all: drag and drop page builder, pixel perfect design, mobile responsive editing, and more.",
      rating: 4.5,
      totalRatings: 5890,
      author: "Elementor.com",
      activeInstalls: "5.000.000+ etkin kurulum",
      testedVersion: "6.6.1 ile test edildi",
      icon: <Image className="w-full h-full text-pink-500" />,
      buttons: [
        { text: "Güncelle", variant: "outline" as const, className: "bg-green-500 text-white hover:bg-green-600 hover:text-white" }
      ]
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {plugins.map((plugin, index) => (
        <PluginCard key={index} {...plugin} />
      ))}
    </div>
  )
}

export default Plugin