"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

interface MessageInputProps {
  onSendMessage: (text: string) => void
}

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [messageText, setMessageText] = useState<string>("")

  const handleSendMessage = () => {
    if (!messageText.trim()) return
    onSendMessage(messageText)
    setMessageText("")
  }

  return (
    <div className="flex gap-2">
      <Input
        type="text"
        placeholder="Type your message..."
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        className="text-xl h-14"
        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
      />
      <Button
        onClick={handleSendMessage}
        className="h-14 bg-[#00a86b] hover:bg-[#006d5a]"
        disabled={!messageText.trim()}
      >
        <Send className="h-6 w-6" />
      </Button>
    </div>
  )
}

