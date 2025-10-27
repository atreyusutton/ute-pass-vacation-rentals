export interface Property {
  id: string;
  name: string;
  tagline: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  squareFeet: number;
  bedrooms: number;
  bathrooms: number;
  sleeps: number;
  minimumStay: number;
  images: string[];
  heroImage: string;
  baseRatePerNight: number;
  cleaningFee: number;
  amenities: string[];
  houseRules: string[];
  rooms: Room[];
  bathRooms: Bathroom[];
  livingSpaces: LivingSpace[];
  increasedRateDates?: DateRange[];
  peakSeasonDates?: DateRange[];
}

export interface Room {
  name: string;
  bedType: string;
}

export interface Bathroom {
  type: string;
  features: string[];
}

export interface LivingSpace {
  name: string;
  description: string;
}

export interface DateRange {
  start: string;
  end: string;
  rate?: number;
}

