"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { MessageSquare, Users } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import PageHeader from "@/components/page-header"
import BottomNavigation from "@/components/bottom-navigation"
import ContactItem from "@/components/chat/contact-item"
import MessagePreviewItem from "@/components/chat/message-preview-item"
import ChatHeader from "@/components/chat/chat-header"
import MessageBubble from "@/components/chat/message-bubble"
import MessageInput from "@/components/chat/message-input"
import AddContactButton from "@/components/chat/add-contact-button"
import RelationshipFilter from "@/components/chat/relationship-filter"
import SearchBar from "@/components/chat/search-bar"
import type { Contact, Message } from "@/types/chat"

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState<string>("contacts")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [relationshipFilter, setRelationshipFilter] = useState<string>("all")
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  // Sample contacts data
  const contacts: Contact[] = [
    {
      id: 1,
      name: "Sarah Chen",
      relationship: "family",
      lastMessage: "Are you coming to dinner on Sunday?",
      lastMessageTime: "2:30 PM",
      avatar: "/placeholder.svg?height=50&width=50",
      isOnline: true,
      unreadCount: 2,
    },
    {
      id: 2,
      name: "Michael Wong",
      relationship: "friend",
      lastMessage: "See you at Mahjong tomorrow!",
      lastMessageTime: "Yesterday",
      avatar: "/placeholder.svg?height=50&width=50",
      isOnline: false,
    },
    {
      id: 3,
      name: "Dr. Li",
      relationship: "healthcare",
      lastMessage: "Remember to take your medication",
      lastMessageTime: "Monday",
      avatar: "/placeholder.svg?height=50&width=50",
      isOnline: false,
    },
    {
      id: 4,
      name: "Betty Zhang",
      relationship: "friend",
      lastMessage: "The Tai Chi class was great!",
      lastMessageTime: "3/10/25",
      avatar: "/placeholder.svg?height=50&width=50",
      isOnline: true,
    },
    {
      id: 5,
      name: "John Lee",
      relationship: "family",
      lastMessage: "I'll pick you up at 3pm",
      lastMessageTime: "3/8/25",
      avatar: "/placeholder.svg?height=50&width=50",
      isOnline: false,
    },
    {
      id: 6,
      name: "Mary Huang",
      relationship: "neighbor",
      lastMessage: "Thanks for the tea recommendation",
      lastMessageTime: "3/5/25",
      avatar: "/placeholder.svg?height=50&width=50",
      isOnline: false,
    },
  ]

  // Sample messages data
  const messages: Record<number, Message[]> = {
    1: [
      {
        id: 1,
        senderId: 1,
        text: "Hi Mom, how are you feeling today?",
        timestamp: "Yesterday, 2:30 PM",
      },
      {
        id: 2,
        senderId: 0, // User's ID
        text: "I'm doing well, thank you for asking!",
        timestamp: "Yesterday, 2:45 PM",
      },
      {
        id: 3,
        senderId: 1,
        text: "That's great to hear. Are you coming to dinner on Sunday?",
        timestamp: "Today, 2:30 PM",
      },
    ],
    2: [
      {
        id: 1,
        senderId: 2,
        text: "Hello! Are you joining the Mahjong game tomorrow?",
        timestamp: "Yesterday, 10:15 AM",
      },
      {
        id: 2,
        senderId: 0, // User's ID
        text: "Yes, I'll be there at 2pm",
        timestamp: "Yesterday, 11:30 AM",
      },
      {
        id: 3,
        senderId: 2,
        text: "Great! See you at Mahjong tomorrow!",
        timestamp: "Yesterday, 11:45 AM",
      },
    ],
  }

  // Filter contacts based on search query and relationship filter
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRelationship = relationshipFilter === "all" || contact.relationship === relationshipFilter
    return matchesSearch && matchesRelationship
  })

  // Get unique relationship types for filter options
  const relationshipTypes = ["all", ...new Set(contacts.map((contact) => contact.relationship))]

  const handleSendMessage = (text: string) => {
    if (!selectedContact) return

    // In a real app, this would send the message to a backend
    console.log(`Sending message to ${selectedContact.name}: ${text}`)
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <PageHeader title="Messages" subtitle="Stay connected with friends and family" />

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {!selectedContact ? (
          // Contacts List View
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

              <RelationshipFilter
                relationshipFilter={relationshipFilter}
                relationshipTypes={relationshipTypes}
                setRelationshipFilter={setRelationshipFilter}
              />
            </div>

            {/* Tabs */}
            <Tabs defaultValue="contacts" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="w-full grid grid-cols-2 h-auto p-1 bg-[#00a86b]/10">
                <TabsTrigger
                  value="contacts"
                  className="text-2xl py-4 data-[state=active]:bg-[#00a86b] data-[state=active]:text-white"
                >
                  <Users className="h-6 w-6 mr-2" />
                  Contacts
                </TabsTrigger>
                <TabsTrigger
                  value="messages"
                  className="text-2xl py-4 data-[state=active]:bg-[#00a86b] data-[state=active]:text-white"
                >
                  <MessageSquare className="h-6 w-6 mr-2" />
                  Recent Messages
                </TabsTrigger>
              </TabsList>

              <TabsContent value="contacts" className="mt-6 space-y-4">
                {filteredContacts.length === 0 ? (
                  <Card className="p-6 text-center">
                    <p className="text-xl text-gray-500">No contacts found</p>
                  </Card>
                ) : (
                  filteredContacts.map((contact) => (
                    <ContactItem key={contact.id} contact={contact} onClick={setSelectedContact} />
                  ))
                )}
              </TabsContent>

              <TabsContent value="messages" className="mt-6 space-y-4">
                {filteredContacts.filter((contact) => contact.lastMessage).length === 0 ? (
                  <Card className="p-6 text-center">
                    <p className="text-xl text-gray-500">No messages found</p>
                  </Card>
                ) : (
                  filteredContacts
                    .filter((contact) => contact.lastMessage)
                    .sort((a, b) => {
                      // Sort by unread first, then by time (this is simplified)
                      if ((a.unreadCount || 0) > 0 && !(b.unreadCount || 0)) return -1
                      if (!(a.unreadCount || 0) && (b.unreadCount || 0) > 0) return 1
                      return 0
                    })
                    .map((contact) => (
                      <MessagePreviewItem key={contact.id} contact={contact} onClick={setSelectedContact} />
                    ))
                )}
              </TabsContent>
            </Tabs>

            <AddContactButton />
          </div>
        ) : (
          // Chat View
          <div className="flex flex-col h-[calc(100vh-13rem)]">
            <ChatHeader contact={selectedContact} onBack={() => setSelectedContact(null)} />

            {/* Chat Messages */}
            <ScrollArea className="flex-1 p-4 bg-gray-50 rounded-lg mb-4">
              <div className="space-y-4">
                {messages[selectedContact.id] ? (
                  messages[selectedContact.id].map((message) => (
                    <MessageBubble key={message.id} message={message} isUser={message.senderId === 0} />
                  ))
                ) : (
                  <div className="text-center p-6">
                    <p className="text-xl text-gray-500">No messages yet</p>
                    <p className="text-lg text-gray-400 mt-2">Send a message to start the conversation</p>
                  </div>
                )}
              </div>
            </ScrollArea>

            <MessageInput onSendMessage={handleSendMessage} />
          </div>
        )}
      </main>

      <BottomNavigation activePage="chat" />
    </div>
  )
}

