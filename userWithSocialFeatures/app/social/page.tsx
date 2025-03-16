"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, MapPin, Calendar, Users } from "lucide-react"
import Link from "next/link"
import GamesList from "@/components/games-list"
import EventsList from "@/components/events-list"
import FilterOptions from "@/components/filter-options"

export default function SocialPage() {
  const [costFilter, setCostFilter] = useState<string>("all") // "all", "free", "paid"

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="bg-[#006d5a] text-white p-6">
        <div className="container mx-auto">
          <div className="flex items-center">
            <Link href="/">
              <Button
                variant="ghost"
                className="bg-white/20 text-white hover:bg-white/30 border-2 border-white p-2 mr-4"
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%80%81%20%E5%AE%89%20%281%29-Zd1KJvDG6iqfDnMf6fKwKt413jI60I.png"
                alt="Wellness Companion Logo"
                className="h-10 w-10 object-contain bg-white rounded-lg p-1"
              />
              <div>
                <h1 className="text-3xl font-bold">Social Connections</h1>
                <p className="text-lg text-white/80">San Francisco Chinatown</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6 space-y-6">
        {/* Location Banner */}
        <Card className="bg-[#00a86b]/10 p-4">
          <div className="flex items-center">
            <MapPin className="h-6 w-6 text-[#006d5a] mr-2" />
            <p className="text-xl text-[#006d5a]">
              Showing activities in <span className="font-bold">San Francisco Chinatown</span>
            </p>
          </div>
        </Card>

        {/* Filter Options */}
        <FilterOptions costFilter={costFilter} setCostFilter={setCostFilter} />

        {/* Tabs */}
        <Tabs defaultValue="games" className="w-full">
          <TabsList className="w-full grid grid-cols-2 h-auto p-1 bg-[#00a86b]/10">
            <TabsTrigger
              value="games"
              className="text-2xl py-4 data-[state=active]:bg-[#00a86b] data-[state=active]:text-white"
            >
              <Users className="h-6 w-6 mr-2" />
              Games
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="text-2xl py-4 data-[state=active]:bg-[#00a86b] data-[state=active]:text-white"
            >
              <Calendar className="h-6 w-6 mr-2" />
              Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value="games" className="mt-6">
            <GamesList costFilter={costFilter} />
          </TabsContent>

          <TabsContent value="events" className="mt-6">
            <EventsList costFilter={costFilter} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

