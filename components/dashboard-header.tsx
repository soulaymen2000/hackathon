"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Download, RefreshCw } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"

interface DashboardHeaderProps {
  title: string
  description: string
}

export function DashboardHeader({ title, description }: DashboardHeaderProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="flex flex-col space-y-2 p-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <CalendarIcon className="h-3.5 w-3.5" />
              <span>{date ? format(date, "PPP") : "Pick a date"}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
        <Button size="sm" variant="outline" className="h-8 gap-1">
          <Download className="h-3.5 w-3.5" />
          <span>Export</span>
        </Button>
        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
          <RefreshCw className="h-3.5 w-3.5" />
          <span className="sr-only">Refresh data</span>
        </Button>
      </div>
    </div>
  )
}
