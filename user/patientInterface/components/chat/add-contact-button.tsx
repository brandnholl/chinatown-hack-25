import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"

export default function AddContactButton() {
  return (
    <div className="fixed bottom-24 right-6">
      <Button className="rounded-full h-16 w-16 bg-[#00a86b] hover:bg-[#006d5a] shadow-lg">
        <UserPlus className="h-8 w-8" />
      </Button>
    </div>
  )
}

