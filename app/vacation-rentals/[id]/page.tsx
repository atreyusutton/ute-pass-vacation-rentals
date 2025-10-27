"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getPropertyById, getPropertyIds } from "@/lib/properties"
import { PropertyCalendar } from "@/components/property-calendar"
import { BookingForm } from "@/components/booking-form"
import { ImageGallery } from "@/components/image-gallery"
import { PropertyMap } from "@/components/property-map"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BedDouble, Users, Bath, Square, MapPin, Check, X } from "lucide-react"
import { differenceInDays } from "date-fns"

interface PropertyPageProps {
  params: {
    id: string
  }
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const property = getPropertyById(params.id)
  const [selectedStart, setSelectedStart] = useState<Date | null>(null)
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(null)
  const [isValidSelection, setIsValidSelection] = useState(false)

  if (!property) {
    notFound()
  }

  const handleDateRangeSelect = (startDate: Date | null, endDate: Date | null, isValid: boolean) => {
    setSelectedStart(startDate)
    setSelectedEnd(endDate)
    setIsValidSelection(isValid)
  }

  // Calculate pricing details
  const pricingDetails = useMemo(() => {
    if (!selectedStart || !selectedEnd || !isValidSelection) {
      return { nights: 0, nightly: 0, subtotal: 0 }
    }

    const nights = differenceInDays(selectedEnd, selectedStart)
    
    // Parse the rate (remove $ and /night)
    const normalRateValue = parseInt(property.normal_rate.replace(/[^0-9]/g, ""))
    
    // Simple calculation - in production, would check actual dates against peak dates
    const subtotal = normalRateValue * nights
    
    return {
      nights,
      nightly: normalRateValue,
      subtotal
    }
  }, [selectedStart, selectedEnd, isValidSelection, property.normal_rate])

  return (
    <div className="flex flex-col">
      {/* Image Gallery */}
      <section className="py-8">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <ImageGallery images={property.images.gallery} propertyName={property.name} />
        </div>
      </section>

      {/* Property Details */}
      <section className="py-8">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {property.name}
                </h1>
                <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{property.address}</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="flex flex-col items-center rounded-lg border p-4">
                  <Square className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm text-muted-foreground">Size</span>
                  <span className="font-semibold">{property.square_feet}</span>
                </div>
                <div className="flex flex-col items-center rounded-lg border p-4">
                  <BedDouble className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm text-muted-foreground">Bedrooms</span>
                  <span className="font-semibold">{property.bedrooms}</span>
                </div>
                <div className="flex flex-col items-center rounded-lg border p-4">
                  <Bath className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm text-muted-foreground">Bathrooms</span>
                  <span className="font-semibold">{property.bathrooms}</span>
                </div>
                <div className="flex flex-col items-center rounded-lg border p-4">
                  <Users className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm text-muted-foreground">Sleeps</span>
                  <span className="font-semibold">{property.sleeps}</span>
                </div>
              </div>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>About This Property</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground whitespace-pre-line">
                    {property.full_description}
                  </p>
                </CardContent>
              </Card>

              {/* Bedrooms */}
              <Card>
                <CardHeader>
                  <CardTitle>Bedrooms</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {property.bedroom_details.map((bedroom, index) => (
                      <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                        <h4 className="font-semibold">{bedroom.name}</h4>
                        <p className="text-sm text-muted-foreground">{bedroom.bed}</p>
                        {bedroom.features.length > 0 && (
                          <ul className="mt-2 text-sm text-muted-foreground list-disc list-inside">
                            {bedroom.features.map((feature, idx) => (
                              <li key={idx}>{feature}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Bathrooms */}
              <Card>
                <CardHeader>
                  <CardTitle>Bathrooms</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {property.bathroom_details.map((bathroom, index) => (
                      <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                        <h4 className="font-semibold">{bathroom.name}</h4>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {bathroom.features.map((feature, idx) => (
                            <span key={idx} className="text-xs bg-muted px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Amenities */}
              <Card>
                <CardHeader>
                  <CardTitle>Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* House Rules */}
              <Card>
                <CardHeader>
                  <CardTitle>House Rules</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium">Check-in</p>
                      <p className="text-sm text-muted-foreground">{property.house_rules.check_in}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Check-out</p>
                      <p className="text-sm text-muted-foreground">{property.house_rules.check_out}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Maximum Guests</p>
                      <p className="text-sm text-muted-foreground">{property.house_rules.max_guests} guests</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Minimum Age</p>
                      <p className="text-sm text-muted-foreground">{property.house_rules.min_age_to_rent} years old</p>
                    </div>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="flex items-center gap-2">
                      {property.house_rules.children_allowed ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <X className="h-4 w-4 text-destructive" />
                      )}
                      <span className="text-sm">Children Allowed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {property.house_rules.pets_allowed ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <X className="h-4 w-4 text-destructive" />
                      )}
                      <span className="text-sm">Pets Allowed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {property.house_rules.events_allowed ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <X className="h-4 w-4 text-destructive" />
                      )}
                      <span className="text-sm">Events Allowed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {property.house_rules.smoking_allowed ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <X className="h-4 w-4 text-destructive" />
                      )}
                      <span className="text-sm">Smoking Allowed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location Map */}
              <PropertyMap address={property.address} propertyName={property.name} />
            </div>

            {/* Sidebar - Calendar and Booking */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-baseline gap-2">
                      <span className="text-3xl">{property.normal_rate}</span>
                      {property.increased_rate && (
                        <span className="text-sm text-muted-foreground font-normal">
                          ({property.increased_rate.rate} peak)
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PropertyCalendar
                      normalRate={property.normal_rate}
                      increasedRate={property.increased_rate}
                      onDateRangeSelect={handleDateRangeSelect}
                      minimumNights={property.minimum_booking_nights}
                    />
                  </CardContent>
                </Card>

                <BookingForm
                  propertyId={property.id}
                  propertyName={property.name}
                  startDate={selectedStart}
                  endDate={selectedEnd}
                  nights={pricingDetails.nights}
                  nightly={pricingDetails.nightly}
                  subtotal={pricingDetails.subtotal}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

