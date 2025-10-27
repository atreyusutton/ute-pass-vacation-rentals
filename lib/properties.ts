import antlers from "@/assets/data/vacation-rentals/antlers.json"
import chez from "@/assets/data/vacation-rentals/chez.json"
import falls1 from "@/assets/data/vacation-rentals/falls-1.json"
import falls2 from "@/assets/data/vacation-rentals/falls-2.json"
import mountainCabin from "@/assets/data/vacation-rentals/mountain-cabin.json"
import mountainHome from "@/assets/data/vacation-rentals/mountain-home.json"
import olathe from "@/assets/data/vacation-rentals/olathe.json"
import ottaWalla from "@/assets/data/vacation-rentals/otta-walla.json"
import sunValley from "@/assets/data/vacation-rentals/sun-valley.json"

export interface PropertyData {
  id: string
  name: string
  address: string
  type: string
  square_feet: string
  bedrooms: number
  beds: number
  sleeps: number
  bathrooms: number
  normal_rate: string
  increased_rate?: {
    rate: string
    applies_during: string[]
  }
  minimum_booking_nights: number
  short_description: string
  full_description: string
  images: {
    hero: string
    gallery: string[]
  }
  house_rules: {
    damage_responsibility: string
    check_in: string
    check_out: string
    max_guests: number
    min_age_to_rent: number
    children_allowed: boolean
    pets_allowed: boolean
    events_allowed: boolean
    smoking_allowed: boolean
    parking: {
      driveway_spaces: number
      garage_spaces: number
      street_parking: string
    }
  }
  bedroom_details: Array<{
    name: string
    bed: string
    features: string[]
  }>
  bathroom_details: Array<{
    name: string
    features: string[]
  }>
  living_spaces: Record<string, string[]>
  amenities: string[]
  kitchen_amenities: string[]
  parking: {
    driveway_spaces: number
    garage_spaces: number
    notes: string
  }
  nearby_activities: string[]
  extra_rooms: string[]
  vrbo_link: string
}

const properties: PropertyData[] = [
  antlers as PropertyData,
  chez as PropertyData,
  falls1 as PropertyData,
  falls2 as PropertyData,
  mountainCabin as PropertyData,
  mountainHome as PropertyData,
  olathe as PropertyData,
  ottaWalla as PropertyData,
  sunValley as PropertyData,
]

export function getAllProperties(): PropertyData[] {
  return properties
}

export function getPropertyById(id: string): PropertyData | undefined {
  return properties.find((property) => property.id === id)
}

export function getPropertyIds(): string[] {
  return properties.map((property) => property.id)
}

