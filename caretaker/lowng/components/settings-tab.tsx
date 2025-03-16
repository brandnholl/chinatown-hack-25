"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Brain, User, Shield } from "lucide-react"

export default function SettingsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Settings</h2>
        <p className="text-slate-600">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="parent">Parent</TabsTrigger>
          <TabsTrigger value="device">Device</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-white border-slate-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-slate-900">Your Profile</CardTitle>
                    <CardDescription>Manage your personal information</CardDescription>
                  </div>
                  <User className="h-5 w-5 text-slate-600" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center space-y-3 mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg" alt="Profile" />
                    <AvatarFallback className="bg-slate-200 text-slate-900 text-xl">JD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="border-slate-200">
                    Change Photo
                  </Button>
                </div>

                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first-name" className="text-slate-900">
                        First Name
                      </Label>
                      <Input id="first-name" defaultValue="Jane" className="border-slate-200 mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="last-name" className="text-slate-900">
                        Last Name
                      </Label>
                      <Input id="last-name" defaultValue="Doe" className="border-slate-200 mt-1" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-slate-900">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="jane.doe@example.com"
                      className="border-slate-200 mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-slate-900">
                      Phone
                    </Label>
                    <Input id="phone" type="tel" defaultValue="(123) 456-7890" className="border-slate-200 mt-1" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-slate-600 hover:bg-slate-700">Save Changes</Button>
              </CardFooter>
            </Card>

            <Card className="bg-white border-slate-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-slate-900">Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences</CardDescription>
                  </div>
                  <Shield className="h-5 w-5 text-slate-600" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="timezone" className="text-slate-900">
                    Timezone
                  </Label>
                  <Select defaultValue="america_new_york">
                    <SelectTrigger id="timezone" className="border-slate-200 mt-1">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america_new_york">America/New York</SelectItem>
                      <SelectItem value="america_chicago">America/Chicago</SelectItem>
                      <SelectItem value="america_denver">America/Denver</SelectItem>
                      <SelectItem value="america_los_angeles">America/Los Angeles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="language" className="text-slate-900">
                    Language
                  </Label>
                  <Select defaultValue="english">
                    <SelectTrigger id="language" className="border-slate-200 mt-1">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-2">
                  <h3 className="text-sm font-medium text-slate-900 mb-3">Preferences</h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-notifications" className="text-slate-900">
                        Email Notifications
                      </Label>
                      <Switch id="email-notifications" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms-notifications" className="text-slate-900">
                        SMS Notifications
                      </Label>
                      <Switch id="sms-notifications" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="weekly-report" className="text-slate-900">
                        Weekly Report
                      </Label>
                      <Switch id="weekly-report" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="data-sharing" className="text-slate-900">
                        Data Sharing with Doctor
                      </Label>
                      <Switch id="data-sharing" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="border-slate-200 text-slate-900">
                  Reset Defaults
                </Button>
                <Button className="bg-slate-600 hover:bg-slate-700">Save Preferences</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="parent">
          <Card className="bg-white border-slate-100">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-slate-900">Parent Profile</CardTitle>
                  <CardDescription>Information about your parent</CardDescription>
                </div>
                <User className="h-5 w-5 text-slate-600" />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col items-center space-y-3">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg" alt="Parent Profile" />
                    <AvatarFallback className="bg-slate-200 text-slate-900 text-xl">MD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="border-slate-200">
                    Change Photo
                  </Button>
                </div>

                <div className="flex-1 grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="parent-first-name" className="text-slate-900">
                        First Name
                      </Label>
                      <Input id="parent-first-name" defaultValue="Mary" className="border-slate-200 mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="parent-last-name" className="text-slate-900">
                        Last Name
                      </Label>
                      <Input id="parent-last-name" defaultValue="Doe" className="border-slate-200 mt-1" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="parent-age" className="text-slate-900">
                      Age
                    </Label>
                    <Input id="parent-age" type="number" defaultValue="78" className="border-slate-200 mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="parent-address" className="text-slate-900">
                      Address
                    </Label>
                    <Input
                      id="parent-address"
                      defaultValue="123 Main St, Anytown, USA"
                      className="border-slate-200 mt-1"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="medical-conditions" className="text-slate-900">
                  Medical Conditions
                </Label>
                <Textarea
                  id="medical-conditions"
                  className="border-slate-200 mt-1"
                  defaultValue="Mild hypertension, arthritis"
                />
              </div>

              <div>
                <Label htmlFor="medications" className="text-slate-900">
                  Current Medications
                </Label>
                <Textarea
                  id="medications"
                  className="border-slate-200 mt-1"
                  defaultValue="Lisinopril 10mg daily, Acetaminophen as needed"
                />
              </div>

              <div>
                <Label htmlFor="emergency-contact" className="text-slate-900">
                  Emergency Contact
                </Label>
                <Input
                  id="emergency-contact"
                  defaultValue="Dr. Smith - (555) 123-4567"
                  className="border-slate-200 mt-1"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-slate-600 hover:bg-slate-700">Save Parent Profile</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="device">
          <Card className="bg-white border-slate-100">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-slate-900">EEG Headband Settings</CardTitle>
                  <CardDescription>Manage your parent's EEG device</CardDescription>
                </div>
                <Brain className="h-5 w-5 text-slate-600" />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-green-700 font-medium">Device Connected</span>
                </div>
                <span className="text-green-700 text-sm">Battery: 78%</span>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-900 mb-3">Device Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Model</span>
                    <span className="text-slate-900 font-medium">Lowng EEG-2000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Serial Number</span>
                    <span className="text-slate-900 font-medium">LNG-78542-B</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Firmware Version</span>
                    <span className="text-slate-900 font-medium">v2.3.5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Last Synced</span>
                    <span className="text-slate-900 font-medium">Today, 10:45 AM</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-900 mb-3">Device Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="data-collection" className="text-slate-900">
                      Data Collection
                    </Label>
                    <Switch id="data-collection" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-sync" className="text-slate-900">
                      Auto Sync
                    </Label>
                    <Switch id="auto-sync" defaultChecked />
                  </div>

                  <div>
                    <Label htmlFor="sync-frequency" className="text-slate-900">
                      Sync Frequency
                    </Label>
                    <Select defaultValue="15">
                      <SelectTrigger id="sync-frequency" className="border-slate-200 mt-1">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">Every 5 minutes</SelectItem>
                        <SelectItem value="15">Every 15 minutes</SelectItem>
                        <SelectItem value="30">Every 30 minutes</SelectItem>
                        <SelectItem value="60">Every hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="power-saving" className="text-slate-900">
                      Power Saving Mode
                    </Label>
                    <Switch id="power-saving" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <Button variant="outline" className="border-slate-200 text-slate-900">
                  Check for Firmware Updates
                </Button>
                <Button variant="outline" className="border-slate-200 text-slate-900">
                  Sync Device Now
                </Button>
                <Button variant="outline" className="border-slate-200 text-slate-900">
                  Reset Device
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

