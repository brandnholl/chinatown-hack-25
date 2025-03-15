import type { Message } from "@/types/chat"

interface MessageBubbleProps {
  message: Message
  isUser: boolean
}

export default function MessageBubble({ message, isUser }: MessageBubbleProps) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] p-4 rounded-lg ${
          isUser ? "bg-[#006d5a] text-white" : "bg-white border border-gray-200"
        }`}
      >
        <p className="text-xl">{message.text}</p>
        <p className={`text-sm mt-1 ${isUser ? "text-white/70" : "text-gray-500"}`}>{message.timestamp}</p>
      </div>
    </div>
  )
}

