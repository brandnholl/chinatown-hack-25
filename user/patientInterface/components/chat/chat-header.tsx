"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, Phone, MoreHorizontal } from "lucide-react"
import type { Contact } from "@/types/chat"

interface ChatHeaderProps {
  contact: Contact
  onBack: () => void
}

export default function ChatHeader({ contact, onBack }: ChatHeaderProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card className="p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="h-10 w-10 text-[#006d5a]" onClick={onBack}>
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Avatar className="h-12 w-12">
            <AvatarImage src={contact.avatar} alt={contact.name} />
            <AvatarFallback className="text-lg bg-[#00a86b] text-white">{getInitials(contact.name)}</AvatarFallback>
          </Avatar>

          <div>
            <h3 className="text-xl font-semibold text-[#006d5a]">{contact.name}</h3>
            <div className="flex items-center">
              {contact.isOnline ? (
                <span className="flex items-center text-green-600 text-sm">
                  <span className="h-2 w-2 rounded-full bg-green-600 mr-1"></span>
                  Online
                </span>
              ) : (
                <span className="text-gray-500 text-sm">Offline</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-[#006d5a]">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-[#006d5a]">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

