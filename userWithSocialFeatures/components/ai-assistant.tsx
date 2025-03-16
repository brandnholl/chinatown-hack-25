"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bot, Mic, Phone, Send, Volume2, VolumeX, Calendar, Users } from "lucide-react"

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello Susan! I noticed your stress levels were a bit elevated earlier. Would you like me to suggest some calming activities?",
      isAI: true,
    },
  ])
  const [input, setInput] = useState("")
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const audioRef = useRef(null)

  // Simulate speech recognition
  const startListening = () => {
    setIsListening(true)
    // In a real app, this would connect to the Web Speech API
    setTimeout(() => {
      setIsListening(false)
      const randomQueries = [
        "Call my daughter",
        "Are there any Mahjong games today?",
        "What's the weather like?",
        "I'm feeling a bit lonely",
      ]
      const randomQuery = randomQueries[Math.floor(Math.random() * randomQueries.length)]
      setInput(randomQuery)
      // Auto-send after "hearing" the command
      setTimeout(() => {
        handleSendMessage(randomQuery)
      }, 500)
    }, 2000)
  }

  // Text-to-speech function
  const speakText = (text) => {
    if (!audioEnabled) return

    setIsSpeaking(true)

    // In a real app, this would use the Web Speech API
    // For now, we'll simulate the speaking duration
    const speakingDuration = text.length * 80 // Rough estimate

    setTimeout(() => {
      setIsSpeaking(false)
    }, speakingDuration)
  }

  const handleSendMessage = (messageText = null) => {
    const textToSend = messageText || input
    if (!textToSend.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { id: Date.now(), text: textToSend, isAI: false }])

    // Clear input
    setInput("")

    // Process the message and generate a response
    processUserMessage(textToSend)
  }

  const processUserMessage = (message) => {
    const lowerMessage = message.toLowerCase()
    let response = ""

    // Handle specific commands
    if (
      lowerMessage.includes("call") &&
      (lowerMessage.includes("daughter") || lowerMessage.includes("son") || lowerMessage.includes("family"))
    ) {
      response = "I'll call your daughter, Sarah, for you now. Connecting..."
      // In a real app, this would trigger a calling function
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: "Sarah has been notified and will call you back shortly.",
            isAI: true,
          },
        ])
        speakText("Sarah has been notified and will call you back shortly.")
      }, 3000)
    } else if (lowerMessage.includes("mahjong") || lowerMessage.includes("game") || lowerMessage.includes("chess")) {
      response =
        "I found 3 Mahjong games near you today. The closest one is at the Community Center at 2:00 PM, just 0.8 miles away. Would you like me to sign you up?"
    } else if (
      lowerMessage.includes("event") ||
      lowerMessage.includes("concert") ||
      lowerMessage.includes("exhibition")
    ) {
      response =
        "There's a Classical Music Concert at City Hall this Friday at 7:00 PM. There's also an Art Exhibition at the Community Gallery starting next Tuesday. Would you like more details?"
    } else if (lowerMessage.includes("weather")) {
      response =
        "It's currently 72°F and sunny outside. Perfect weather for a short walk, which might help reduce your stress levels."
    } else if (lowerMessage.includes("lonely") || lowerMessage.includes("alone") || lowerMessage.includes("sad")) {
      response =
        "I'm sorry to hear you're feeling that way, Susan. Would you like me to suggest some social activities nearby? The community center has a tea social this afternoon."
    } else {
      const responses = [
        "I understand. Would you like to try a 5-minute guided meditation?",
        "That's great to hear! Remember to stay hydrated throughout the day.",
        "I've found some local Mahjong games happening this week. Would you like to see them?",
      ]
      response = responses[Math.floor(Math.random() * responses.length)]
    }

    // Add AI response after a short delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: response,
          isAI: true,
        },
      ])

      // Speak the response
      speakText(response)
    }, 1000)
  }

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled)
    if (isSpeaking && !audioEnabled) {
      setIsSpeaking(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Voice activity indicator */}
      {(isListening || isSpeaking) && (
        <div
          className={`flex items-center justify-center p-3 rounded-lg ${isListening ? "bg-blue-100" : "bg-[#00a86b]/20"}`}
        >
          <div className="flex items-center gap-2">
            {isListening ? (
              <>
                <Mic className="h-6 w-6 text-blue-500 animate-pulse" />
                <span className="text-xl font-medium">Listening...</span>
              </>
            ) : (
              <>
                <Volume2 className="h-6 w-6 text-[#006d5a] animate-pulse" />
                <span className="text-xl font-medium">Speaking...</span>
              </>
            )}
          </div>
        </div>
      )}

      <Card className="bg-gray-50 p-4 min-h-[200px] max-h-[300px] overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isAI ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[80%] p-4 rounded-lg ${
                  message.isAI ? "bg-[#00a86b]/20 text-gray-800" : "bg-[#006d5a] text-white"
                }`}
              >
                {message.isAI && (
                  <div className="flex items-center mb-2">
                    <Bot className="h-6 w-6 mr-2" />
                    <span className="font-medium">AI Assistant</span>
                  </div>
                )}
                <p className="text-xl">{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick action buttons */}
      <div className="grid grid-cols-3 gap-3">
        <Button
          variant="outline"
          className="flex items-center justify-center gap-2 p-3 text-[#006d5a] border-[#00a86b]"
          onClick={() => handleSendMessage("Call my daughter")}
        >
          <Phone className="h-5 w-5" />
          <span className="text-lg">Call Family</span>
        </Button>

        <Button
          variant="outline"
          className="flex items-center justify-center gap-2 p-3 text-[#006d5a] border-[#00a86b]"
          onClick={() => handleSendMessage("Are there any Mahjong games today?")}
        >
          <Users className="h-5 w-5" />
          <span className="text-lg">Find Games</span>
        </Button>

        <Button
          variant="outline"
          className="flex items-center justify-center gap-2 p-3 text-[#006d5a] border-[#00a86b]"
          onClick={() => handleSendMessage("What events are happening this week?")}
        >
          <Calendar className="h-5 w-5" />
          <span className="text-lg">Local Events</span>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" size="icon" onClick={toggleAudio} className="h-12 w-12">
          {audioEnabled ? (
            <Volume2 className="h-6 w-6 text-[#006d5a]" />
          ) : (
            <VolumeX className="h-6 w-6 text-[#006d5a]" />
          )}
        </Button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-4 text-xl border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#00a86b]"
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />

        <Button type="button" onClick={() => handleSendMessage()} className="h-12 bg-[#00a86b] hover:bg-[#006d5a]">
          <Send className="h-6 w-6" />
        </Button>

        <Button
          type="button"
          variant={isListening ? "default" : "outline"}
          onClick={startListening}
          className={`h-12 w-12 ${isListening ? "bg-blue-500" : "border-[#00a86b]"}`}
          disabled={isListening}
        >
          <Mic className={`h-6 w-6 ${isListening ? "text-white" : "text-[#006d5a]"}`} />
        </Button>
      </div>
    </div>
  )
}

