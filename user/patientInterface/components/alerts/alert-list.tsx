import { Card } from "@/components/ui/card"
import AlertItem from "./alert-item"
import type { Alert } from "@/types/alerts"

interface AlertListProps {
  alerts: Alert[]
  isPast?: boolean
}

export default function AlertList({ alerts, isPast = false }: AlertListProps) {
  if (alerts.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-xl text-gray-500">{isPast ? "No past alerts" : "No upcoming alerts"}</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <AlertItem key={alert.id} alert={alert} isPast={isPast} />
      ))}
    </div>
  )
}

