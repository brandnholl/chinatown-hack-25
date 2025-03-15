import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Bell, Calendar, Home, MessageSquare, Settings, Users, MapPin } from "lucide-react"
import Link from "next/link"
import StressLevel from "@/components/stress-level"
import AIAssistant from "@/components/ai-assistant"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#006d5a] text-white p-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%80%81%20%E5%AE%89%20%281%29-Zd1KJvDG6iqfDnMf6fKwKt413jI60I.png"
              alt="Wellness Companion Logo"
              className="h-12 w-12 object-contain bg-white rounded-lg p-1"
            />
            <div>
              <h1 className="text-3xl font-bold">Wellness Companion</h1>
              <p className="text-sm text-white/80">San Francisco Chinatown</p>
            </div>
          </div>
          <Button variant="ghost" className="bg-white/20 text-white hover:bg-white/30 border-2 border-white">
            <Settings className="h-6 w-6 mr-2" />
            <span className="text-xl">Settings</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6 space-y-8">
        {/* Welcome Section */}
        <section className="text-center mb-8">
          <h2 className="text-4xl font-bold text-[#006d5a] mb-4">Welcome, Susan</h2>
          <p className="text-2xl text-gray-700">Today is Monday, March 15</p>
        </section>

        {/* Stress Level Monitor */}
        <Card className="p-6 shadow-lg border-2 border-[#00a86b]">
          <h3 className="text-3xl font-semibold text-[#006d5a] mb-4">Your Wellness Today</h3>
          <StressLevel />
        </Card>

        {/* AI Assistant */}
        <Card className="p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-3xl font-semibold text-[#006d5a]">Voice Companion</h3>
            <div className="flex items-center gap-3">
              <span className="text-xl">Active</span>
              <Switch id="ai-toggle" className="scale-125" />
            </div>
          </div>
          <AIAssistant />
        </Card>

        {/* Social Connections */}
        <Card className="p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-3xl font-semibold text-[#006d5a]">Chinatown Activities</h3>
            <MapPin className="h-6 w-6 text-[#006d5a]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/social" className="no-underline">
              <Card className="p-6 bg-[#00a86b]/10 hover:bg-[#00a86b]/20 transition-colors cursor-pointer h-full">
                <div className="flex flex-col items-center text-center">
                  <Users className="h-16 w-16 text-[#006d5a] mb-4" />
                  <h4 className="text-2xl font-medium text-[#006d5a] mb-2">Find Games</h4>
                  <p className="text-xl text-gray-700">Connect with others for Mahjong, Chinese Chess, and more</p>
                </div>
              </Card>
            </Link>
            <Link href="/social" className="no-underline">
              <Card className="p-6 bg-[#00a86b]/10 hover:bg-[#00a86b]/20 transition-colors cursor-pointer h-full">
                <div className="flex flex-col items-center text-center">
                  <Calendar className="h-16 w-16 text-[#006d5a] mb-4" />
                  <h4 className="text-2xl font-medium text-[#006d5a] mb-2">Local Events</h4>
                  <p className="text-xl text-gray-700">Discover cultural events and activities in Chinatown</p>
                </div>
              </Card>
            </Link>
          </div>
        </Card>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#00a86b] p-4">
        <div className="container mx-auto">
          <div className="flex justify-around">
            <Link href="/">
              <Button variant="ghost" className="flex flex-col items-center p-2 text-[#006d5a]">
                <Home className="h-8 w-8 mb-1" />
                <span className="text-lg">Home</span>
              </Button>
            </Link>
            <Link href="/alerts">
              <Button variant="ghost" className="flex flex-col items-center p-2 text-[#006d5a]">
                <Bell className="h-8 w-8 mb-1" />
                <span className="text-lg">Alerts</span>
              </Button>
            </Link>
            <Link href="/social">
              <Button variant="ghost" className="flex flex-col items-center p-2 text-[#006d5a]">
                <Users className="h-8 w-8 mb-1" />
                <span className="text-lg">Social</span>
              </Button>
            </Link>
            <Link href="/chat">
              <Button variant="ghost" className="flex flex-col items-center p-2 text-[#006d5a]">
                <MessageSquare className="h-8 w-8 mb-1" />
                <span className="text-lg">Chat</span>
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

