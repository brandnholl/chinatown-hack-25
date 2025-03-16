"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { day: "Mon", deep: 2.1, light: 4.5, rem: 1.2 },
  { day: "Tue", deep: 1.8, light: 4.2, rem: 1.5 },
  { day: "Wed", deep: 2.3, light: 3.8, rem: 1.4 },
  { day: "Thu", deep: 1.9, light: 4.0, rem: 1.3 },
  { day: "Fri", deep: 2.0, light: 4.3, rem: 1.1 },
  { day: "Sat", deep: 2.4, light: 4.7, rem: 1.6 },
  { day: "Sun", deep: 2.2, light: 4.4, rem: 1.4 },
]

export default function SleepQualityChart() {
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
        <CartesianGrid strokeDasharray="3 3" stroke="#f9d0e3" />
        <XAxis dataKey="day" stroke="#db2777" />
        <YAxis stroke="#db2777" />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            borderColor: "#f9d0e3",
            borderRadius: "8px",
          }}
        />
        <Legend />
        <Bar dataKey="deep" name="Deep Sleep" stackId="a" fill="#db2777" />
        <Bar dataKey="light" name="Light Sleep" stackId="a" fill="#f472b6" />
        <Bar dataKey="rem" name="REM Sleep" stackId="a" fill="#fbcfe8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

