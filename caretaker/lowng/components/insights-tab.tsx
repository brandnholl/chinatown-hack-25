"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import WeeklyStressChart from "@/components/weekly-stress-chart"
import MonthlyStressChart from "@/components/monthly-stress-chart"
import BrainActivityChart from "@/components/brain-activity-chart"
import { Brain } from "lucide-react"

export default function InsightsTab() {
  const [timeRange, setTimeRange] = useState("week")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Insights & Trends</h2>
          <p className="text-slate-600">Detailed analysis of your mom's EEG patterns</p>
        </div>

        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px] border-slate-200">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="stress" className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
          <TabsTrigger value="stress">Stress Levels</TabsTrigger>
          <TabsTrigger value="activity">Brain Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="stress">
          <Card className="bg-white border-slate-100">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-slate-900">Stress Level Trends</CardTitle>
                  <CardDescription>EEG stress measurements over time (%)</CardDescription>
                </div>
                <Brain className="h-5 w-5 text-slate-600" />
              </div>
            </CardHeader>
            <CardContent className="h-96">
              {timeRange === "week" ? <WeeklyStressChart /> : <MonthlyStressChart />}
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3 mt-6">
            <Card className="bg-white border-slate-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Average Stress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">28%</div>
                <p className="text-xs text-green-600">10% improvement</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Peak Stress Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">4:30 PM</div>
                <p className="text-xs text-slate-600">Usually during evening news</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Calm Periods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">68%</div>
                <p className="text-xs text-green-600">5% increase from last week</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white border-slate-100 mt-6">
            <CardHeader>
              <CardTitle className="text-slate-900">Potential Stress Triggers</CardTitle>
              <CardDescription>Based on time patterns in EEG data</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-slate-900">Evening news (4:30-5:00 PM)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span className="text-slate-900">Phone calls with unknown numbers</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <span className="text-slate-900">Before doctor appointments</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-500"></div>
                  <span className="text-slate-900">When alone for extended periods</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card className="bg-white border-slate-100">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-slate-900">Brain Activity Patterns</CardTitle>
                  <CardDescription>EEG frequency band analysis</CardDescription>
                </div>
                <Brain className="h-5 w-5 text-slate-600" />
              </div>
            </CardHeader>
            <CardContent className="h-96">
              <BrainActivityChart />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 mt-6">
            <Card className="bg-white border-slate-100">
              <CardHeader>
                <CardTitle className="text-slate-900">Cognitive Activity</CardTitle>
                <CardDescription>Brain engagement during different times</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-900">Morning (8-10 AM)</span>
                    <div className="w-2/3 bg-slate-100 rounded-full h-2.5">
                      <div className="bg-slate-600 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <span className="text-slate-900 font-medium">65%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-900">Midday (11 AM-2 PM)</span>
                    <div className="w-2/3 bg-slate-100 rounded-full h-2.5">
                      <div className="bg-slate-600 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                    <span className="text-slate-900 font-medium">45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-900">Afternoon (3-5 PM)</span>
                    <div className="w-2/3 bg-slate-100 rounded-full h-2.5">
                      <div className="bg-slate-600 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                    <span className="text-slate-900 font-medium">75%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-900">Evening (6-9 PM)</span>
                    <div className="w-2/3 bg-slate-100 rounded-full h-2.5">
                      <div className="bg-slate-600 h-2.5 rounded-full" style={{ width: "55%" }}></div>
                    </div>
                    <span className="text-slate-900 font-medium">55%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-100">
              <CardHeader>
                <CardTitle className="text-slate-900">Cognitive Health Indicators</CardTitle>
                <CardDescription>Key metrics from EEG data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-900">Focus Duration</span>
                      <span className="text-green-600 font-medium">Good</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "80%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-900">Concentration</span>
                      <span className="text-green-600 font-medium">Excellent</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-900">Emotional Regulation</span>
                      <span className="text-yellow-600 font-medium">Fair</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-900">Cognitive Flexibility</span>
                      <span className="text-green-600 font-medium">Good</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

