"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"

export default function StressLevel() {
  const [stressLevel, setStressLevel] = useState(30)
  const [message, setMessage] = useState("")

  useEffect(() => {
    // Determine message based on stress level
    if (stressLevel < 30) {
      setMessage("You're doing great today! Very relaxed.")
    } else if (stressLevel < 60) {
      setMessage("Your stress levels are moderate. Consider a short break.")
    } else {
      setMessage("Your stress levels are elevated. Try some deep breathing.")
    }
  }, [stressLevel])

  // This would normally be connected to the EEG headband data
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate small changes in stress level for demo purposes
      setStressLevel((prev) => {
        const change = Math.floor(Math.random() * 10) - 5
        const newValue = Math.max(10, Math.min(90, prev + change))
        return newValue
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Determine color based on stress level
  const getColorClass = () => {
    if (stressLevel < 30) return "text-[#00a86b]"
    if (stressLevel < 60) return "text-amber-500"
    return "text-[#f80610]"
  }

  const getProgressColor = () => {
    if (stressLevel < 30) return "bg-[#00a86b]"
    if (stressLevel < 60) return "bg-amber-500"
    return "bg-[#f80610]"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-2xl font-medium">Current Stress Level:</h4>
        <span className={`text-3xl font-bold ${getColorClass()}`}>{stressLevel}%</span>
      </div>

      <Progress value={stressLevel} className="h-4 bg-gray-200" indicatorClassName={getProgressColor()} />

      <p className="text-xl mt-4">{message}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <button className="bg-[#00a86b] hover:bg-[#006d5a] text-white text-xl py-4 px-6 rounded-lg transition-colors">
          Start Breathing Exercise
        </button>
        <button className="bg-white border-2 border-[#00a86b] text-[#006d5a] hover:bg-[#00a86b]/10 text-xl py-4 px-6 rounded-lg transition-colors">
          View Wellness History
        </button>
      </div>
    </div>
  )
}

