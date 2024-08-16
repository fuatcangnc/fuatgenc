"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Users, Calendar } from "@phosphor-icons/react"

interface ButtonConfig {
  text: string
  variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  className: string
}

interface PluginCardProps {
  title: string
  description: string
  rating: number
  totalRatings: number
  author: string
  activeInstalls: string
  testedVersion: string
  icon: React.ReactNode
  buttons: ButtonConfig[]
}

function PluginCard({ title, description, rating, totalRatings, author, activeInstalls, testedVersion, icon, buttons }: PluginCardProps) {
  return (
    <Card className="w-full h-full min-h-[250px] flex flex-col">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12">{icon}</div>
          <div>
            <CardTitle>{title}</CardTitle>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} weight={i < Math.floor(rating) ? "fill" : "regular"} className="w-4 h-4 text-yellow-400" />
              ))}
              <span className="ml-2 text-sm text-gray-600">({totalRatings})</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="min-h-[60px]">
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="flex justify-between text-sm text-gray-600 w-full">
          <div>{author}</div>
          <div className="flex items-center"><Users className="w-4 h-4 mr-1" /> {activeInstalls}</div>
          <div className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {testedVersion}</div>
        </div>
        <div className={`flex w-full ${buttons.length === 1 ? 'justify-start' : 'justify-between'}`}>
          {buttons.map((button, index) => (
            <Button 
              key={index} 
              variant={button.variant} 
              className={`${button.className} ${buttons.length > 1 ? 'w-[48%]' : 'w-1/2'}`}
            >
              {button.text}
            </Button>
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}

export default PluginCard