"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { time: "6 AM", alpha: 20, beta: 10, theta: 5, delta: 15 },
  { time: "8 AM", alpha: 25, beta: 15, theta: 8, delta: 12 },
  { time: "10 AM", alpha: 30, beta: 20, theta: 10, delta: 10 },
  { time: "12 PM", alpha: 35, beta: 25, theta: 12, delta: 8 },
  { time: "2 PM", alpha: 40, beta: 30, theta: 15, delta: 5 },
  { time: "4 PM", alpha: 35, beta: 25, theta: 12, delta: 8 },
  { time: "6 PM", alpha: 30, beta: 20, theta: 10, delta: 10 },
  { time: "8 PM", alpha: 25, beta: 15, theta: 8, delta: 12 },
  { time: "10 PM", alpha: 20, beta: 10, theta: 5, delta: 15 },
]

export default function BrainActivityChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="time" stroke="#475569" />
        <YAxis stroke="#475569" />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            borderColor: "#e2e8f0",
            borderRadius: "8px",
          }}
        />
        <Legend />
        <Area type="monotone" dataKey="alpha" name="Alpha Waves" stackId="1" stroke="#475569" fill="#e2e8f0" />
        <Area type="monotone" dataKey="beta" name="Beta Waves" stackId="1" stroke="#1e293b" fill="#94a3b8" />
        <Area type="monotone" dataKey="theta" name="Theta Waves" stackId="1" stroke="#334155" fill="#cbd5e1" />
        <Area type="monotone" dataKey="delta" name="Delta Waves" stackId="1" stroke="#0f172a" fill="#64748b" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

