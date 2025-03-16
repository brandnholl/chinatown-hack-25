"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Phone } from "lucide-react"
import type { Contact } from "@/types/chat"

interface ContactItemProps {
  contact: Contact
  onClick: (contact: Contact) => void
}

export default function ContactItem({ contact, onClick }: ContactItemProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  const getRelationshipLabel = (relationship: string) => {
    return relationship.charAt(0).toUpperCase() + relationship.slice(1)
  }

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case "family":
        return "bg-pink-100 text-pink-800"
      case "friend":
        return "bg-blue-100 text-blue-800"
      case "healthcare":
        return "bg-red-100 text-red-800"
      case "neighbor":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => onClick(contact)}>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="h-16 w-16">
            <AvatarImage src={contact.avatar} alt={contact.name} />
            <AvatarFallback className="text-xl bg-[#00a86b] text-white">{getInitials(contact.name)}</AvatarFallback>
          </Avatar>
          {contact.isOnline && (
            <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-green-500 border-2 border-white" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-semibold text-[#006d5a]">{contact.name}</h3>
              <span
                className={`inline-block px-2 py-1 rounded-full text-sm ${getRelationshipColor(contact.relationship)}`}
              >
                {getRelationshipLabel(contact.relationship)}
              </span>
            </div>

            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-[#006d5a]">
                <MessageSquare className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-[#006d5a]">
                <Phone className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

