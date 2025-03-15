"use client"

import { Button } from "@/components/ui/button"
import { Filter, Plus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface RelationshipFilterProps {
  relationshipFilter: string
  relationshipTypes: string[]
  setRelationshipFilter: (filter: string) => void
}

export default function RelationshipFilter({
  relationshipFilter,
  relationshipTypes,
  setRelationshipFilter,
}: RelationshipFilterProps) {
  const getRelationshipLabel = (relationship: string) => {
    return relationship === "all" ? "All Contacts" : relationship.charAt(0).toUpperCase() + relationship.slice(1)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-lg flex items-center gap-2 h-12">
          <Filter className="h-5 w-5" />
          {getRelationshipLabel(relationshipFilter)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {relationshipTypes.map((type) => (
          <DropdownMenuItem
            key={type}
            onClick={() => setRelationshipFilter(type)}
            className="text-lg py-3 cursor-pointer"
          >
            {getRelationshipLabel(type)}
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem className="text-lg py-3 cursor-pointer text-[#00a86b]">
          <Plus className="h-4 w-4 mr-2" />
          Add New Category
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

