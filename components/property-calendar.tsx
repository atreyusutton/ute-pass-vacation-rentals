"use client"

import { useState } from "react"
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isAfter, isBefore, startOfDay, differenceInDays, addDays } from "date-fns"
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PropertyCalendarProps {
  normalRate: string
  increasedRate?: {
    rate: string
    applies_during: string[]
  }
  onDateRangeSelect?: (startDate: Date | null, endDate: Date | null, isValid: boolean) => void
  minimumNights: number
  blockedDates?: Date[] // For future backend integration
}

export function PropertyCalendar({ 
  normalRate, 
  increasedRate, 
  onDateRangeSelect,
  minimumNights,
  blockedDates = []
}: PropertyCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedStart, setSelectedStart] = useState<Date | null>(null)
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(null)
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Check if a date is blocked (for cleaning or existing bookings)
  const isDateBlocked = (date: Date) => {
    return blockedDates.some(blocked => isSameDay(blocked, startOfDay(date)))
  }

  const handleDateClick = (date: Date) => {
    const today = startOfDay(new Date())
    if (isBefore(date, today) || isDateBlocked(date)) return

    if (!selectedStart || (selectedStart && selectedEnd)) {
      // Start new selection
      setSelectedStart(date)
      setSelectedEnd(null)
      setValidationError(null)
      onDateRangeSelect?.(date, null, false)
    } else {
      // Complete selection - validate minimum nights
      if (isAfter(date, selectedStart)) {
        const nights = differenceInDays(date, selectedStart)
        
        if (nights < minimumNights) {
          setValidationError(`Minimum stay is ${minimumNights} nights. Please select at least ${minimumNights} nights.`)
          setSelectedEnd(null)
          onDateRangeSelect?.(selectedStart, null, false)
        } else {
          setSelectedEnd(date)
          setValidationError(null)
          onDateRangeSelect?.(selectedStart, date, true)
        }
      } else {
        setSelectedStart(date)
        setSelectedEnd(null)
        setValidationError(null)
        onDateRangeSelect?.(date, null, false)
      }
    }
  }

  const isDateInRange = (date: Date) => {
    if (!selectedStart) return false
    
    const endDate = selectedEnd || hoveredDate
    if (!endDate) return isSameDay(date, selectedStart)
    
    return (
      (isAfter(date, selectedStart) || isSameDay(date, selectedStart)) &&
      (isBefore(date, endDate) || isSameDay(date, endDate))
    )
  }

  const isPastDate = (date: Date) => {
    const today = startOfDay(new Date())
    return isBefore(date, today)
  }

  // Show helper text when hovering with a start date selected
  const getHoverNights = () => {
    if (selectedStart && hoveredDate && !selectedEnd) {
      if (isAfter(hoveredDate, selectedStart)) {
        return differenceInDays(hoveredDate, selectedStart)
      }
    }
    return null
  }

  const hoverNights = getHoverNights()

  // Get the day of the week for the first day of the month (0 = Sunday)
  const firstDayOfWeek = monthStart.getDay()
  const emptyDays = Array(firstDayOfWeek).fill(null)

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Select Dates</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="min-w-[150px] text-center font-medium">
            {format(currentMonth, "MMMM yyyy")}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {daysInMonth.map((date) => {
          const isInRange = isDateInRange(date)
          const isStart = selectedStart && isSameDay(date, selectedStart)
          const isEnd = selectedEnd && isSameDay(date, selectedEnd)
          const isPast = isPastDate(date)
          const isBlocked = isDateBlocked(date)

          return (
            <button
              key={date.toISOString()}
              onClick={() => handleDateClick(date)}
              onMouseEnter={() => setHoveredDate(date)}
              onMouseLeave={() => setHoveredDate(null)}
              disabled={isPast || isBlocked}
              className={cn(
                "aspect-square p-2 text-sm rounded-md transition-colors",
                "hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isPast && "text-muted-foreground/40 cursor-not-allowed hover:bg-transparent",
                isBlocked && !isPast && "bg-destructive/10 text-destructive cursor-not-allowed line-through",
                isInRange && !isPast && !isBlocked && "bg-primary/10",
                (isStart || isEnd) && !isPast && "bg-primary text-primary-foreground hover:bg-primary/90",
                !isInRange && !isStart && !isEnd && !isPast && !isBlocked && "hover:bg-accent"
              )}
            >
              {format(date, "d")}
            </button>
          )
        })}
      </div>

      {/* Validation Error */}
      {validationError && (
        <div className="mt-4 rounded-lg bg-destructive/10 border border-destructive/20 p-3 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
          <p className="text-sm text-destructive">{validationError}</p>
        </div>
      )}

      {/* Hover Helper */}
      {selectedStart && !selectedEnd && hoverNights !== null && (
        <div className="mt-4 rounded-lg bg-primary/10 p-3">
          <p className="text-sm text-primary font-medium">
            {hoverNights} {hoverNights === 1 ? 'night' : 'nights'} selected
            {hoverNights < minimumNights && (
              <span className="text-destructive ml-2">
                (Need {minimumNights - hoverNights} more)
              </span>
            )}
          </p>
        </div>
      )}

      <div className="mt-6 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Normal Rate:</span>
          <span className="font-semibold">{normalRate}</span>
        </div>
        {increasedRate && (
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Peak Rate:</span>
            <span className="font-semibold">{increasedRate.rate}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Minimum Stay:</span>
          <span className="font-semibold">{minimumNights} nights</span>
        </div>
      </div>

      {increasedRate && increasedRate.applies_during.length > 0 && (
        <div className="mt-4 rounded-lg bg-muted/50 p-4">
          <p className="text-sm font-medium mb-2">Peak Season Dates:</p>
          <p className="text-xs text-muted-foreground">
            {increasedRate.applies_during.join(", ")}
          </p>
        </div>
      )}
    </div>
  )
}

