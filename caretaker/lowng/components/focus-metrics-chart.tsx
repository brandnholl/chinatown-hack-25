"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { time: "Morning", focus: 65, boredom: 20 },
  { time: "Midday", focus: 45, boredom: 35 },
  { time: "Afternoon", focus: 75, boredom: 15 },
  { time: "Evening", focus: 55, boredom: 30 },
]

export default function FocusMetricsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
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
          formatter={(value) => [`${value}%`, ""]}
        />
        <Legend />
        <Bar dataKey="focus" name="Focus Level" fill="#475569" />
        <Bar dataKey="boredom" name="Boredom Level" fill="#94a3b8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

