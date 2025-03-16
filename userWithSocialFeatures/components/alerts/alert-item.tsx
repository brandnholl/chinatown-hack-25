import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bell, Calendar, Clock, MapPin, Check, X } from "lucide-react"
import type { Alert } from "@/types/alerts"

interface AlertItemProps {
  alert: Alert
  isPast?: boolean
}

export default function AlertItem({ alert, isPast = false }: AlertItemProps) {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "event":
        return <Calendar className="h-6 w-6 text-[#00a86b]" />
      case "appointment":
        return <Clock className="h-6 w-6 text-[#f80610]" />
      case "reminder":
        return <Bell className="h-6 w-6 text-amber-500" />
      default:
        return <Bell className="h-6 w-6 text-[#00a86b]" />
    }
  }

  const getAlertTypeLabel = (type: string) => {
    switch (type) {
      case "event":
        return "Event"
      case "appointment":
        return "Appointment"
      case "reminder":
        return "Reminder"
      default:
        return "Alert"
    }
  }

  return (
    <Card className={`p-6 hover:shadow-md transition-shadow ${isPast ? "bg-gray-50" : ""}`}>
      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
        <div className="flex items-start gap-4">
          <div className="mt-1">{getAlertIcon(alert.type)}</div>
          <div className="space-y-2">
            <div>
              <h3 className={`text-2xl font-semibold ${isPast ? "text-gray-500" : "text-[#006d5a]"}`}>{alert.title}</h3>
              <span
                className={`inline-block ${
                  isPast ? "bg-gray-200 text-gray-500" : "bg-[#00a86b]/10 text-[#006d5a]"
                } px-3 py-1 rounded-full text-lg`}
              >
                {getAlertTypeLabel(alert.type)}
              </span>
            </div>

            <div className={`flex items-center text-xl ${isPast ? "text-gray-500" : ""}`}>
              <Calendar className={`h-5 w-5 mr-2 ${isPast ? "text-gray-400" : "text-[#00a86b]"}`} />
              <span>{alert.date}</span>
            </div>

            <div className={`flex items-center text-xl ${isPast ? "text-gray-500" : ""}`}>
              <Clock className={`h-5 w-5 mr-2 ${isPast ? "text-gray-400" : "text-[#00a86b]"}`} />
              <span>{alert.time}</span>
            </div>

            {alert.location && (
              <div className={`flex items-center text-xl ${isPast ? "text-gray-500" : ""}`}>
                <MapPin className={`h-5 w-5 mr-2 ${isPast ? "text-gray-400" : "text-[#00a86b]"}`} />
                <span>{alert.location}</span>
              </div>
            )}

            {alert.description && !isPast && <p className="text-xl text-gray-700 mt-2">{alert.description}</p>}
          </div>
        </div>

        {!isPast && (
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" className="text-lg text-[#006d5a] border-[#00a86b]">
              <Check className="h-5 w-5 mr-2" />
              Mark Done
            </Button>
            <Button variant="outline" className="text-lg text-[#f80610] border-[#f80610]">
              <X className="h-5 w-5 mr-2" />
              Dismiss
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}

