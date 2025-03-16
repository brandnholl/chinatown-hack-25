"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Calendar, Clock, DollarSign } from "lucide-react"

// Event categories
const EVENT_CATEGORIES = ["Cultural", "Exercise", "Educational", "Community"]

interface Event {
  id: number
  title: string
  category: string
  location: string
  distance: string
  date: string
  time: string
  isFree: boolean
  description: string
}

interface EventsListProps {
  costFilter: string
}

export default function EventsList({ costFilter }: EventsListProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("Cultural")

  // Sample events data tailored for SF Chinatown
  const events: Event[] = [
    {
      id: 1,
      title: "Chinese New Year Festival",
      category: "Cultural",
      location: "Grant Avenue",
      distance: "0.1 miles away",
      date: "February 10-26, 2025",
      time: "Various times",
      isFree: true,
      description: "Annual celebration with parades, performances, and food stalls throughout Chinatown.",
    },
    {
      id: 2,
      title: "Mid-Autumn Festival",
      category: "Cultural",
      location: "Portsmouth Square",
      distance: "0.2 miles away",
      date: "September 15, 2025",
      time: "5:00 PM - 9:00 PM",
      isFree: true,
      description: "Celebration with mooncakes, lanterns, and traditional performances.",
    },
    {
      id: 3,
      title: "Chinese Opera Performance",
      category: "Cultural",
      location: "Great Star Theater",
      distance: "0.3 miles away",
      date: "April 5, 2025",
      time: "7:00 PM",
      isFree: false,
      description: "Traditional Cantonese opera performed by the SF Chinese Opera Company.",
    },
    {
      id: 4,
      title: "Tai Chi in Portsmouth Square",
      category: "Exercise",
      location: "Portsmouth Square",
      distance: "0.2 miles away",
      date: "Every morning",
      time: "7:00 AM - 8:00 AM",
      isFree: true,
      description: "Daily Tai Chi practice led by Master Chen. All skill levels welcome.",
    },
    {
      id: 5,
      title: "Senior Qigong Class",
      category: "Exercise",
      location: "Chinatown YMCA",
      distance: "0.3 miles away",
      date: "Mondays, Wednesdays, Fridays",
      time: "9:00 AM",
      isFree: false,
      description: "Gentle Qigong exercises specifically designed for seniors.",
    },
    {
      id: 6,
      title: "Walking Group",
      category: "Exercise",
      location: "Starts at Dragon Gate",
      distance: "0.1 miles away",
      date: "Tuesdays & Thursdays",
      time: "8:30 AM",
      isFree: true,
      description: "Group walks through Chinatown and nearby neighborhoods. Pace suitable for seniors.",
    },
    {
      id: 7,
      title: "Chinese Calligraphy Workshop",
      category: "Educational",
      location: "Chinatown Branch Library",
      distance: "0.4 miles away",
      date: "Saturdays",
      time: "10:00 AM - 12:00 PM",
      isFree: true,
      description: "Learn the art of Chinese calligraphy. Materials provided.",
    },
    {
      id: 8,
      title: "Technology Help in Cantonese",
      category: "Educational",
      location: "Self-Help for the Elderly Center",
      distance: "0.3 miles away",
      date: "Wednesdays",
      time: "1:00 PM - 3:00 PM",
      isFree: true,
      description: "Get help with smartphones, tablets, and computers in Cantonese or English.",
    },
    {
      id: 9,
      title: "Chinese Medicine Seminar",
      category: "Educational",
      location: "Chinatown Cultural Center",
      distance: "0.5 miles away",
      date: "March 20, 2025",
      time: "2:00 PM",
      isFree: false,
      description: "Learn about traditional Chinese medicine approaches to senior health.",
    },
    {
      id: 10,
      title: "Community Tea Gathering",
      category: "Community",
      location: "Red Blossom Tea Company",
      distance: "0.2 miles away",
      date: "First Sunday of each month",
      time: "3:00 PM - 5:00 PM",
      isFree: true,
      description: "Monthly tea tasting and social gathering for seniors.",
    },
    {
      id: 11,
      title: "Chinatown Clean-up Day",
      category: "Community",
      location: "Starts at Portsmouth Square",
      distance: "0.2 miles away",
      date: "April 22, 2025",
      time: "9:00 AM - 12:00 PM",
      isFree: true,
      description: "Community clean-up event. Light tasks available for seniors.",
    },
    {
      id: 12,
      title: "Senior Community Lunch",
      category: "Community",
      location: "Golden Gate Senior Center",
      distance: "0.3 miles away",
      date: "Every weekday",
      time: "12:00 PM - 1:30 PM",
      isFree: false,
      description: "Affordable community lunch with Chinese and American options. $3 suggested donation.",
    },
  ]

  // Filter events based on cost filter
  const filteredEvents = events.filter((event) => {
    if (costFilter === "all") return true
    if (costFilter === "free") return event.isFree
    if (costFilter === "paid") return !event.isFree
    return true
  })

  const toggleCategory = (category: string) => {
    if (expandedCategory === category) {
      setExpandedCategory(null)
    } else {
      setExpandedCategory(category)
    }
  }

  return (
    <div className="space-y-8">
      {EVENT_CATEGORIES.map((category) => {
        const eventsInCategory = filteredEvents.filter((event) => event.category === category)

        if (eventsInCategory.length === 0) return null

        return (
          <div key={category} className="space-y-4">
            <Button
              variant="ghost"
              onClick={() => toggleCategory(category)}
              className="w-full flex items-center justify-between bg-[#00a86b]/10 hover:bg-[#00a86b]/20 p-4 rounded-lg"
            >
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-[#006d5a] mr-3" />
                <h2 className="text-2xl font-bold text-[#006d5a] text-left">{category} Events</h2>
              </div>
              <span className="text-xl text-[#006d5a]">{eventsInCategory.length} events</span>
            </Button>

            {expandedCategory === category && (
              <div className="space-y-4 pl-2">
                {eventsInCategory.map((event) => (
                  <Card key={event.id} className="p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                      <div className="space-y-2 mb-4 md:mb-0 md:flex-1">
                        <div className="flex items-center flex-wrap">
                          <h3 className="text-2xl font-semibold text-[#006d5a] mr-2">{event.title}</h3>
                          {!event.isFree && (
                            <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-sm flex items-center">
                              <DollarSign className="h-4 w-4 mr-1" />
                              Paid
                            </span>
                          )}
                          {event.isFree && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm flex items-center">
                              Free
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-xl text-gray-700">
                          <MapPin className="h-5 w-5 mr-2 text-[#00a86b]" />
                          <span>
                            {event.location} • {event.distance}
                          </span>
                        </div>
                        <div className="flex items-center text-xl">
                          <Calendar className="h-5 w-5 mr-2 text-[#00a86b]" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center text-xl">
                          <Clock className="h-5 w-5 mr-2 text-[#00a86b]" />
                          <span>{event.time}</span>
                        </div>
                        <p className="text-xl mt-2">{event.description}</p>
                      </div>

                      <div className="flex flex-col gap-3 md:ml-4">
                        <Button className="text-xl bg-[#00a86b] hover:bg-[#006d5a] py-6 px-8">RSVP</Button>
                        <Button variant="outline" className="text-xl text-[#006d5a] border-[#00a86b]">
                          More Info
                        </Button>
                      </div>
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

