export interface Alert {
  id: number
  title: string
  type: "event" | "appointment" | "reminder"
  location?: string
  date: string
  time: string
  description?: string
  isUpcoming: boolean
}

