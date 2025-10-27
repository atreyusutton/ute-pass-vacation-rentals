"use client"

import { useEffect, useRef, useState } from "react"
import { Loader } from "@googlemaps/js-api-loader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface PropertyMapProps {
  address: string
  propertyName: string
}

export function PropertyMap({ address, propertyName }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initMap = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        
        if (!apiKey) {
          setError("Google Maps API key is not configured")
          setIsLoading(false)
          return
        }

        const loader = new Loader({
          apiKey,
          version: "weekly",
          libraries: ["places", "geocoding"],
        })

        const { Map } = await loader.importLibrary("maps")
        const { Geocoder } = await loader.importLibrary("geocoding")

        if (!mapRef.current) return

        // Geocode the address to get coordinates
        const geocoder = new Geocoder()
        const geocodeResult = await geocoder.geocode({ address })

        if (!geocodeResult.results || geocodeResult.results.length === 0) {
          setError("Could not find location for this address")
          setIsLoading(false)
          return
        }

        const location = geocodeResult.results[0].geometry.location

        // Create the map
        const map = new Map(mapRef.current, {
          center: location,
          zoom: 14,
          mapTypeId: "roadmap",
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true,
        })

        // Add a marker (using standard marker to avoid Map ID requirement)
        const { Marker } = await loader.importLibrary("marker")
        new Marker({
          map,
          position: location,
          title: propertyName,
        })

        setIsLoading(false)
      } catch (err) {
        console.error("Error loading map:", err)
        setError("Failed to load map")
        setIsLoading(false)
      }
    }

    initMap()
  }, [address, propertyName])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Location
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{address}</p>
          
          {error ? (
            <div className="flex items-center justify-center h-[400px] bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          ) : (
            <div className="relative">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-lg z-10">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                    <p className="text-sm text-muted-foreground">Loading map...</p>
                  </div>
                </div>
              )}
              <div
                ref={mapRef}
                className="w-full h-[400px] rounded-lg"
                style={{ minHeight: "400px" }}
              />
            </div>
          )}
          
          <p className="text-xs text-muted-foreground">
            This map shows the general area. Exact location will be provided after booking.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

