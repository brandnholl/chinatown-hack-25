"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Check } from "lucide-react"
import PageHeader from "@/components/page-header"
import BottomNavigation from "@/components/bottom-navigation"
import AlertList from "@/components/alerts/alert-list"
import AddAlertButton from "@/components/alerts/add-alert-button"
import type { Alert } from "@/types/alerts"

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState<string>("upcoming")

  // Sample alerts data
  const alerts: Alert[] = [
    {
      id: 1,
      title: "Mahjong Group",
      type: "event",
      location: "Portsmouth Square",
      date: "Today",
      time: "2:00 PM",
      description: "Weekly Mahjong group meeting",
      isUpcoming: true,
    },
    {
      id: 2,
      title: "Doctor's Appointment",
      type: "appointment",
      location: "Chinatown Health Clinic",
      date: "Tomorrow",
      time: "10:30 AM",
      description: "Regular check-up with Dr. Wong",
      isUpcoming: true,
    },
    {
      id: 3,
      title: "Take Blood Pressure Medication",
      type: "reminder",
      date: "Today",
      time: "8:00 PM",
      isUpcoming: true,
    },
    {
      id: 4,
      title: "Tai Chi in the Park",
      type: "event",
      location: "Portsmouth Square",
      date: "March 18, 2025",
      time: "7:00 AM",
      description: "Morning Tai Chi session",
      isUpcoming: true,
    },
    {
      id: 5,
      title: "Call Daughter",
      type: "reminder",
      date: "Tomorrow",
      time: "6:00 PM",
      description: "Weekly call with Sarah",
      isUpcoming: true,
    },
    {
      id: 6,
      title: "Chinese Opera Performance",
      type: "event",
      location: "Great Star Theater",
      date: "March 20, 2025",
      time: "7:00 PM",
      description: "Traditional Cantonese opera",
      isUpcoming: true,
    },
    {
      id: 7,
      title: "Mahjong Group",
      type: "event",
      location: "Portsmouth Square",
      date: "March 8, 2025",
      time: "2:00 PM",
      description: "Weekly Mahjong group meeting",
      isUpcoming: false,
    },
    {
      id: 8,
      title: "Eye Doctor Appointment",
      type: "appointment",
      location: "Vision Care Center",
      date: "March 5, 2025",
      time: "11:00 AM",
      description: "Annual eye exam",
      isUpcoming: false,
    },
  ]

  const upcomingAlerts = alerts.filter((alert) => alert.isUpcoming)
  const pastAlerts = alerts.filter((alert) => !alert.isUpcoming)

  return (
    <div className="min-h-screen bg-white pb-20">
      <PageHeader title="Alerts & Reminders" subtitle="San Francisco Chinatown" />

      {/* Main Content */}
      <main className="container mx-auto p-6 space-y-6">
        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-2 h-auto p-1 bg-[#00a86b]/10">
            <TabsTrigger
              value="upcoming"
              className="text-2xl py-4 data-[state=active]:bg-[#00a86b] data-[state=active]:text-white"
            >
              <Bell className="h-6 w-6 mr-2" />
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="past">Upcoming</TabsTrigger>
            <TabsTrigger
              value="past"
              className="text-2xl py-4 data-[state=active]:bg-[#00a86b] data-[state=active]:text-white"
            >
              <Check className="h-6 w-6 mr-2" />
              Past
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6 space-y-4">
            <AlertList alerts={upcomingAlerts} />
          </TabsContent>

          <TabsContent value="past" className="mt-6 space-y-4">
            <AlertList alerts={pastAlerts} isPast />
          </TabsContent>
        </Tabs>

        <AddAlertButton />
      </main>

      <BottomNavigation activePage="alerts" />
    </div>
  )
}

