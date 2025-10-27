'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { BookingStatus } from '@prisma/client'

export async function createBooking(data: {
  propertyId: string
  propertyName: string
  guestName: string
  guestEmail: string
  guestPhone: string
  checkIn: Date
  checkOut: Date
  numberOfNights: number
  subtotal: number
  message?: string
}) {
  try {
    const booking = await prisma.booking.create({
      data: {
        propertyId: data.propertyId,
        propertyName: data.propertyName,
        guestName: data.guestName,
        guestEmail: data.guestEmail,
        guestPhone: data.guestPhone,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        numberOfNights: data.numberOfNights,
        subtotal: data.subtotal,
        message: data.message,
        source: 'WEBSITE',
        status: 'PENDING',
      },
    })

    revalidatePath('/admin')
    return { success: true, booking }
  } catch (error) {
    console.error('Failed to create booking:', error)
    return { success: false, error: 'Failed to create booking' }
  }
}

export async function getAllBookings() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: {
        checkIn: 'asc',
      },
    })
    return { success: true, bookings }
  } catch (error) {
    console.error('Failed to fetch bookings:', error)
    return { success: false, error: 'Failed to fetch bookings', bookings: [] }
  }
}

export async function getBookingsByProperty(propertyId: string) {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        propertyId,
      },
      orderBy: {
        checkIn: 'asc',
      },
    })
    return { success: true, bookings }
  } catch (error) {
    console.error('Failed to fetch bookings:', error)
    return { success: false, error: 'Failed to fetch bookings', bookings: [] }
  }
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  try {
    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
    })

    revalidatePath('/admin')
    return { success: true, booking }
  } catch (error) {
    console.error('Failed to update booking:', error)
    return { success: false, error: 'Failed to update booking' }
  }
}

export async function deleteBooking(id: string) {
  try {
    // Check if it's a website booking (only website bookings can be deleted)
    const booking = await prisma.booking.findUnique({
      where: { id },
    })

    if (!booking) {
      return { success: false, error: 'Booking not found' }
    }

    if (booking.source === 'VRBO') {
      return { success: false, error: 'Cannot delete VRBO bookings' }
    }

    await prisma.booking.delete({
      where: { id },
    })

    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('Failed to delete booking:', error)
    return { success: false, error: 'Failed to delete booking' }
  }
}

export async function getBookedDates(propertyId: string) {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        propertyId,
        status: {
          in: ['APPROVED', 'PENDING'],
        },
      },
      select: {
        checkIn: true,
        checkOut: true,
      },
    })

    // Convert to array of blocked dates (including cleaning day after checkout)
    const blockedDates: Date[] = []
    bookings.forEach(booking => {
      let current = new Date(booking.checkIn)
      const end = new Date(booking.checkOut)
      
      while (current <= end) {
        blockedDates.push(new Date(current))
        current.setDate(current.getDate() + 1)
      }
      
      // Add one day after checkout for cleaning
      const cleaningDay = new Date(end)
      cleaningDay.setDate(cleaningDay.getDate() + 1)
      blockedDates.push(cleaningDay)
    })

    return { success: true, blockedDates }
  } catch (error) {
    console.error('Failed to fetch booked dates:', error)
    return { success: false, error: 'Failed to fetch dates', blockedDates: [] }
  }
}

