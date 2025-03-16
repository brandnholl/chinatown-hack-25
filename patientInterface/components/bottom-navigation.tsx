import { Button } from "@/components/ui/button"
import { Bell, Home, MessageSquare, Users } from "lucide-react"
import Link from "next/link"

interface BottomNavigationProps {
  activePage?: "home" | "alerts" | "social" | "chat"
}

export default function BottomNavigation({ activePage }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#00a86b] p-4">
      <div className="container mx-auto">
        <div className="flex justify-around">
          <Link href="/">
            <Button
              variant="ghost"
              className={`flex flex-col items-center p-2 ${
                activePage === "home" ? "text-[#00a86b] font-medium" : "text-[#006d5a]"
              }`}
            >
              <Home className="h-8 w-8 mb-1" />
              <span className="text-lg">Home</span>
            </Button>
          </Link>
          <Link href="/alerts">
            <Button
              variant="ghost"
              className={`flex flex-col items-center p-2 ${
                activePage === "alerts" ? "text-[#00a86b] font-medium" : "text-[#006d5a]"
              }`}
            >
              <Bell className="h-8 w-8 mb-1" />
              <span className="text-lg">Alerts</span>
            </Button>
          </Link>
          <Link href="/social">
            <Button
              variant="ghost"
              className={`flex flex-col items-center p-2 ${
                activePage === "social" ? "text-[#00a86b] font-medium" : "text-[#006d5a]"
              }`}
            >
              <Users className="h-8 w-8 mb-1" />
              <span className="text-lg">Social</span>
            </Button>
          </Link>
          <Link href="/chat">
            <Button
              variant="ghost"
              className={`flex flex-col items-center p-2 ${
                activePage === "chat" ? "text-[#00a86b] font-medium" : "text-[#006d5a]"
              }`}
            >
              <MessageSquare className="h-8 w-8 mb-1" />
              <span className="text-lg">Chat</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

