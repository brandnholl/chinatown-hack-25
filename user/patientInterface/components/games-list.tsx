"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Users, DollarSign, Clock } from "lucide-react"

// Game types with their own sections
const GAME_TYPES = ["Mahjong", "Chinese Chess", "Card Games", "Go", "Dominoes"]

interface Game {
  id: number
  title: string
  type: string
  location: string
  distance: string
  time: string
  participants: number
  spots: number
  isFree: boolean
}

interface GamesListProps {
  costFilter: string
}

export default function GamesList({ costFilter }: GamesListProps) {
  const [expandedType, setExpandedType] = useState<string | null>("Mahjong")

  // Sample games data tailored for SF Chinatown
  const games: Game[] = [
    {
      id: 1,
      title: "Portsmouth Square Mahjong",
      type: "Mahjong",
      location: "Portsmouth Square",
      distance: "0.2 miles away",
      time: "Daily, 10:00 AM - 4:00 PM",
      participants: 16,
      spots: 4,
      isFree: true,
    },
    {
      id: 2,
      title: "Chinatown YMCA Mahjong Club",
      type: "Mahjong",
      location: "Chinatown YMCA",
      distance: "0.3 miles away",
      time: "Tuesdays & Thursdays, 1:00 PM",
      participants: 12,
      spots: 4,
      isFree: false,
    },
    {
      id: 3,
      title: "Beginner's Mahjong",
      type: "Mahjong",
      location: "Chinatown Branch Library",
      distance: "0.4 miles away",
      time: "Mondays, 10:00 AM",
      participants: 8,
      spots: 8,
      isFree: true,
    },
    {
      id: 4,
      title: "Traditional Chinese Chess",
      type: "Chinese Chess",
      location: "Portsmouth Square",
      distance: "0.2 miles away",
      time: "Daily, 9:00 AM - 5:00 PM",
      participants: 10,
      spots: 6,
      isFree: true,
    },
    {
      id: 5,
      title: "Chinese Chess Tournament",
      type: "Chinese Chess",
      location: "Chinatown Cultural Center",
      distance: "0.5 miles away",
      time: "Last Saturday of month, 1:00 PM",
      participants: 16,
      spots: 8,
      isFree: false,
    },
    {
      id: 6,
      title: "Big Two Card Game",
      type: "Card Games",
      location: "Golden Gate Senior Center",
      distance: "0.3 miles away",
      time: "Fridays, 2:00 PM",
      participants: 12,
      spots: 4,
      isFree: true,
    },
    {
      id: 7,
      title: "Zheng Shangyou Card Club",
      type: "Card Games",
      location: "Chinatown Community Center",
      distance: "0.4 miles away",
      time: "Wednesdays, 1:00 PM",
      participants: 8,
      spots: 4,
      isFree: true,
    },
    {
      id: 8,
      title: "Go/Weiqi Masters",
      type: "Go",
      location: "Tea House on Grant Avenue",
      distance: "0.2 miles away",
      time: "Saturdays, 2:00 PM",
      participants: 8,
      spots: 4,
      isFree: false,
    },
    {
      id: 9,
      title: "Beginners Go/Weiqi",
      type: "Go",
      location: "Chinatown Branch Library",
      distance: "0.4 miles away",
      time: "Thursdays, 3:00 PM",
      participants: 6,
      spots: 6,
      isFree: true,
    },
    {
      id: 10,
      title: "Pai Gow Tiles Group",
      type: "Dominoes",
      location: "Self-Help for the Elderly Center",
      distance: "0.3 miles away",
      time: "Tuesdays, 2:00 PM",
      participants: 8,
      spots: 4,
      isFree: true,
    },
  ]

  // Filter games based on cost filter
  const filteredGames = games.filter((game) => {
    if (costFilter === "all") return true
    if (costFilter === "free") return game.isFree
    if (costFilter === "paid") return !game.isFree
    return true
  })

  const toggleGameType = (type: string) => {
    if (expandedType === type) {
      setExpandedType(null)
    } else {
      setExpandedType(type)
    }
  }

  return (
    <div className="space-y-8">
      {GAME_TYPES.map((gameType) => {
        const gamesOfType = filteredGames.filter((game) => game.type === gameType)

        if (gamesOfType.length === 0) return null

        return (
          <div key={gameType} className="space-y-4">
            <Button
              variant="ghost"
              onClick={() => toggleGameType(gameType)}
              className="w-full flex items-center justify-between bg-[#00a86b]/10 hover:bg-[#00a86b]/20 p-4 rounded-lg"
            >
              <div className="flex items-center">
                <Users className="h-8 w-8 text-[#006d5a] mr-3" />
                <h2 className="text-2xl font-bold text-[#006d5a] text-left">{gameType}</h2>
              </div>
              <span className="text-xl text-[#006d5a]">{gamesOfType.length} groups</span>
            </Button>

            {expandedType === gameType && (
              <div className="space-y-4 pl-2">
                {gamesOfType.map((game) => (
                  <Card key={game.id} className="p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                      <div className="space-y-2 mb-4 md:mb-0">
                        <div className="flex items-center">
                          <h3 className="text-2xl font-semibold text-[#006d5a]">{game.title}</h3>
                          {!game.isFree && (
                            <span className="ml-2 bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-sm flex items-center">
                              <DollarSign className="h-4 w-4 mr-1" />
                              Paid
                            </span>
                          )}
                          {game.isFree && (
                            <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm flex items-center">
                              Free
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-xl text-gray-700">
                          <MapPin className="h-5 w-5 mr-2 text-[#00a86b]" />
                          <span>
                            {game.location} • {game.distance}
                          </span>
                        </div>
                        <div className="flex items-center text-xl">
                          <Clock className="h-5 w-5 mr-2 text-[#00a86b]" />
                          <span>{game.time}</span>
                        </div>
                        <p className="text-xl">
                          {game.participants} participants • {game.spots} spots available
                        </p>
                      </div>

                      <Button className="text-xl bg-[#00a86b] hover:bg-[#006d5a] py-6 px-8">Join Group</Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

