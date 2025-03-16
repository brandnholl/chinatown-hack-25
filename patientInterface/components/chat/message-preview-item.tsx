"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Contact } from "@/types/chat"

interface MessagePreviewItemProps {
  contact: Contact
  onClick: (contact: Contact) => void
}

export default function MessagePreviewItem({ contact, onClick }: MessagePreviewItemProps) {
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
    <Card
      className={`p-4 hover:shadow-md transition-shadow cursor-pointer ${
        (contact.unreadCount || 0) > 0 ? "border-l-4 border-[#00a86b]" : ""
      }`}
      onClick={() => onClick(contact)}
    >
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
            <h3 className="text-2xl font-semibold text-[#006d5a]">{contact.name}</h3>
            <span className="text-lg text-gray-500">{contact.lastMessageTime}</span>
          </div>

          <p className="text-xl text-gray-700 line-clamp-1">{contact.lastMessage}</p>

          <div className="flex justify-between items-center mt-1">
            <span
              className={`inline-block px-2 py-1 rounded-full text-sm ${getRelationshipColor(contact.relationship)}`}
            >
              {getRelationshipLabel(contact.relationship)}
            </span>

            {(contact.unreadCount || 0) > 0 && (
              <span className="bg-[#00a86b] text-white text-sm px-2 py-1 rounded-full">{contact.unreadCount}</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

