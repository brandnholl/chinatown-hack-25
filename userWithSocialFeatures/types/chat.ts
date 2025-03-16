export interface Contact {
  id: number
  name: string
  relationship: string
  lastMessage?: string
  lastMessageTime?: string
  avatar?: string
  isOnline?: boolean
  unreadCount?: number
}

export interface Message {
  id: number
  senderId: number
  text: string
  timestamp: string
}

