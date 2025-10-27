"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createBooking } from "@/app/actions/bookings"

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().optional(),
})

type BookingFormData = z.infer<typeof bookingSchema>

interface BookingFormProps {
  propertyId: string
  propertyName: string
  startDate: Date | null
  endDate: Date | null
  nights: number
  nightly: number
  subtotal: number
}

export function BookingForm({ propertyId, propertyName, startDate, endDate, nights, nightly, subtotal }: BookingFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  })

  const onSubmit = async (data: BookingFormData) => {
    if (!startDate || !endDate) return
    
    setIsSubmitting(true)
    
    try {
      // Create booking in database
      const bookingResult = await createBooking({
        propertyId,
        propertyName,
        guestName: data.name,
        guestEmail: data.email,
        guestPhone: data.phone,
        checkIn: startDate,
        checkOut: endDate,
        numberOfNights: nights,
        subtotal,
        message: data.message,
      })

      if (!bookingResult.success) {
        throw new Error('Failed to create booking')
      }

      // Send email notification to admin
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'booking-admin',
          propertyName,
          guestName: data.name,
          guestEmail: data.email,
          guestPhone: data.phone,
          checkIn: format(startDate, "MMM dd, yyyy"),
          checkOut: format(endDate, "MMM dd, yyyy"),
          nights,
          subtotal,
          message: data.message,
        }),
      })

      // Send confirmation email to guest
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'booking-guest-confirmation',
          to: data.email,
          guestName: data.name,
          propertyName,
          checkIn: format(startDate, "MMM dd, yyyy"),
          checkOut: format(endDate, "MMM dd, yyyy"),
          nights,
          subtotal,
        }),
      })

      setIsSubmitted(true)
      reset()
    } catch (error) {
      console.error('Booking submission error:', error)
      alert('Failed to submit booking. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Request Submitted!</CardTitle>
          <CardDescription>
            Thank you for your interest. We&apos;ll contact you shortly to confirm your booking.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setIsSubmitted(false)} variant="outline" className="w-full">
            Submit Another Request
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request to Book</CardTitle>
        <CardDescription>
          Fill out this form to inquire about booking {propertyName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {startDate && endDate && nights > 0 && (
            <div className="rounded-lg bg-muted/50 p-4 space-y-3">
              <div>
                <p className="text-sm font-medium">Selected Dates</p>
                <p className="text-sm text-muted-foreground">
                  {format(startDate, "MMM dd, yyyy")} - {format(endDate, "MMM dd, yyyy")}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {nights} {nights === 1 ? 'night' : 'nights'}
                </p>
              </div>
              
              <div className="border-t pt-3 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">${nightly} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
                  <span className="font-medium">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-lg font-bold border-t pt-2">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <p className="text-xs text-muted-foreground text-center pt-1">
                  Plus taxes and cleaning fees
                </p>
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="John Doe"
              className="mt-1"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="john@example.com"
              className="mt-1"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              placeholder="(555) 123-4567"
              className="mt-1"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="message">Additional Information</Label>
            <Textarea
              id="message"
              {...register("message")}
              placeholder="Any special requests or questions?"
              className="mt-1"
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting || !startDate || !endDate || nights === 0}>
            {isSubmitting ? "Submitting..." : "Submit Booking Request"}
          </Button>

          {!startDate || !endDate || nights === 0 ? (
            <p className="text-sm text-muted-foreground text-center">
              Please select valid check-in and check-out dates above
            </p>
          ) : null}
        </form>
      </CardContent>
    </Card>
  )
}

