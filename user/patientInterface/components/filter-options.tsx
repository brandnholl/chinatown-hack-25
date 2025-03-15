"use client"

import { Button } from "@/components/ui/button"
import { DollarSign, Filter } from "lucide-react"

interface FilterOptionsProps {
  costFilter: string
  setCostFilter: (filter: string) => void
}

export default function FilterOptions({ costFilter, setCostFilter }: FilterOptionsProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center mb-3">
        <Filter className="h-6 w-6 text-[#006d5a] mr-2" />
        <h3 className="text-xl font-semibold text-[#006d5a]">Filter Options</h3>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          variant={costFilter === "all" ? "default" : "outline"}
          className={`text-lg ${
            costFilter === "all" ? "bg-[#00a86b] hover:bg-[#006d5a]" : "text-[#006d5a] border-[#00a86b]"
          }`}
          onClick={() => setCostFilter("all")}
        >
          All
        </Button>

        <Button
          variant={costFilter === "free" ? "default" : "outline"}
          className={`text-lg ${
            costFilter === "free" ? "bg-[#00a86b] hover:bg-[#006d5a]" : "text-[#006d5a] border-[#00a86b]"
          }`}
          onClick={() => setCostFilter("free")}
        >
          Free Only
        </Button>

        <Button
          variant={costFilter === "paid" ? "default" : "outline"}
          className={`text-lg flex items-center ${
            costFilter === "paid" ? "bg-[#00a86b] hover:bg-[#006d5a]" : "text-[#006d5a] border-[#00a86b]"
          }`}
          onClick={() => setCostFilter("paid")}
        >
          <DollarSign className="h-4 w-4 mr-1" />
          Paid Only
        </Button>
      </div>
    </div>
  )
}

