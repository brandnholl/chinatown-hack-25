"use client"

import { Activity, AlertTriangle, Brain, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import StressLevelChart from "@/components/stress-level-chart"
import FocusMetricsChart from "@/components/focus-metrics-chart"

export default function OverviewTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Welcome back, Jane</h2>
        <p className="text-slate-600">Here's how your mom is doing today</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white border-slate-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Current Status</CardTitle>
            <Brain className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">Calm</div>
            <p className="text-xs text-slate-600">Last updated: 5 minutes ago</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Stress Level</CardTitle>
            <Brain className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">15%</div>
            <p className="text-xs text-slate-600">10% lower than yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Focus Duration</CardTitle>
            <Clock className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">4.5 hours</div>
            <p className="text-xs text-slate-600">Today's focused time</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Weekly Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">1</div>
            <p className="text-xs text-orange-600">Stress spike on Tuesday</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-white border-slate-100">
          <CardHeader>
            <CardTitle className="text-slate-900">Daily Stress Levels</CardTitle>
            <CardDescription>EEG stress percentages throughout the day</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <StressLevelChart />
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-100">
          <CardHeader>
            <CardTitle className="text-slate-900">Focus Metrics</CardTitle>
            <CardDescription>Cognitive engagement from EEG data</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <FocusMetricsChart />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-slate-100">
        <CardHeader>
          <CardTitle className="text-slate-900">Notable Events</CardTitle>
          <CardDescription>Recent spikes in stress or boredom</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: "Tuesday, 4:30 PM", event: "Stress spike (75%)", duration: "15 minutes", type: "stress" },
              { time: "Wednesday, 2:15 PM", event: "Extended boredom period", duration: "45 minutes", type: "boredom" },
              { time: "Thursday, 11:20 AM", event: "High engagement activity", duration: "30 minutes", type: "focus" },
              { time: "Friday, 6:45 PM", event: "Mild stress elevation (40%)", duration: "25 minutes", type: "stress" },
            ].map((item, index) => (
              <div key={index} className="flex items-start">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full mr-3 ${
                    item.type === "stress" ? "bg-red-100" : item.type === "boredom" ? "bg-blue-100" : "bg-green-100"
                  }`}
                >
                  {item.type === "stress" ? (
                    <Activity className={`h-5 w-5 text-red-600`} />
                  ) : item.type === "boredom" ? (
                    <Clock className={`h-5 w-5 text-blue-600`} />
                  ) : (
                    <Brain className={`h-5 w-5 text-green-600`} />
                  )}
                </div>
                <div>
                  <p className="font-medium text-slate-900">{item.event}</p>
                  <p className="text-sm text-slate-600">
                    {item.time} - {item.duration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

