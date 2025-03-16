"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { week: "Week 1", average: 32, peak: 60 },
  { week: "Week 2", average: 28, peak: 55 },
  { week: "Week 3", average: 35, peak: 65 },
  { week: "Week 4", average: 25, peak: 50 },
]

export default function MonthlyStressChart() {
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
        <XAxis dataKey="week" stroke="#475569" />
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
        <Line type="monotone" dataKey="average" name="Average Stress" stroke="#475569" strokeWidth={2} />
        <Line
          type="monotone"
          dataKey="peak"
          name="Peak Stress"
          stroke="#1e293b"
          strokeWidth={2}
          strokeDasharray="5 5"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

