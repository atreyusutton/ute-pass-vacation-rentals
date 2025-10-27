import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllProperties } from "@/lib/properties"
import { BedDouble, Users, Bath, Square } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Vacation Rentals",
  description: "Browse our selection of quality vacation rental properties in the Ute Pass and Colorado Springs area. Find your perfect mountain getaway.",
}

export default function VacationRentalsPage() {
  const properties = getAllProperties()

  return (
    <div className="flex flex-col">
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Our Vacation Rentals
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our carefully curated collection of vacation properties in the beautiful Ute Pass area. Each rental is maintained to the highest standards for your comfort and enjoyment.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <Link
                key={property.id}
                href={`/vacation-rentals/${property.id}`}
                className="group"
              >
                <Card className="h-full overflow-hidden transition-all hover:shadow-xl">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={property.images.hero}
                      alt={property.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {property.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {property.short_description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Square className="h-4 w-4 text-muted-foreground" />
                        <span>{property.square_feet}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BedDouble className="h-4 w-4 text-muted-foreground" />
                        <span>{property.bedrooms} Beds</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bath className="h-4 w-4 text-muted-foreground" />
                        <span>{property.bathrooms} Baths</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>Sleeps {property.sleeps}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">
                        {property.normal_rate}
                      </span>
                      {property.increased_rate && (
                        <span className="text-sm text-muted-foreground">
                          ({property.increased_rate.rate} peak)
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {property.minimum_booking_nights} night minimum
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

