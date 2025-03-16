"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { time: "6 AM", stress: 15 },
  { time: "8 AM", stress: 25 },
  { time: "10 AM", stress: 35 },
  { time: "12 PM", stress: 20 },
  { time: "2 PM", stress: 15 },
  { time: "4 PM", stress: 75 },
  { time: "6 PM", stress: 40 },
  { time: "8 PM", stress: 20 },
  { time: "10 PM", stress: 10 },
]

export default function StressLevelChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="time" stroke="#475569" />
        <YAxis stroke="#475569" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            borderColor: "#e2e8f0",
            borderRadius: "8px",
          }}
          formatter={(value) => [`${value}%`, "Stress Level"]}
        />
        <Legend />
        <Line type="monotone" dataKey="stress" stroke="#475569" activeDot={{ r: 8 }} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}

