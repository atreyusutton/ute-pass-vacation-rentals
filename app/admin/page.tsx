"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getAllBookings, updateBookingStatus, deleteBooking } from "@/app/actions/bookings"
import { format } from "date-fns"
import { CheckCircle, XCircle, Trash2, Calendar, DollarSign, User, Mail, Phone } from "lucide-react"

type Booking = {
  id: string
  propertyName: string
  guestName: string
  guestEmail: string
  guestPhone: string
  checkIn: Date
  checkOut: Date
  numberOfNights: number
  subtotal: number
  message: string | null
  source: string
  status: string
  createdAt: Date
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if already authenticated via session storage
    const auth = sessionStorage.getItem('admin_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      loadBookings()
    } else {
      setLoading(false)
    }
  }, [])

  const loadBookings = async () => {
    setLoading(true)
    const result = await getAllBookings()
    if (result.success) {
      setBookings(result.bookings as Booking[])
    }
    setLoading(false)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simple password check - In production, use proper authentication
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === "admin123") {
      sessionStorage.setItem('admin_auth', 'true')
      setIsAuthenticated(true)
      setError("")
      loadBookings()
    } else {
      setError("Incorrect password")
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth')
    setIsAuthenticated(false)
    setBookings([])
  }

  const handleApprove = async (id: string) => {
    const booking = bookings.find(b => b.id === id)
    if (!booking) return

    const result = await updateBookingStatus(id, 'APPROVED')
    if (result.success) {
      // Send approval email to guest
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'booking-approved',
          to: booking.guestEmail,
          guestName: booking.guestName,
          propertyName: booking.propertyName,
          checkIn: format(new Date(booking.checkIn), 'MMM dd, yyyy'),
          checkOut: format(new Date(booking.checkOut), 'MMM dd, yyyy'),
          nights: booking.numberOfNights,
          subtotal: booking.subtotal,
        }),
      })
      
      loadBookings()
    }
  }

  const handleReject = async (id: string) => {
    const booking = bookings.find(b => b.id === id)
    if (!booking) return

    const result = await updateBookingStatus(id, 'REJECTED')
    if (result.success) {
      // Send rejection email to guest
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'booking-rejected',
          to: booking.guestEmail,
          guestName: booking.guestName,
          propertyName: booking.propertyName,
          checkIn: format(new Date(booking.checkIn), 'MMM dd, yyyy'),
          checkOut: format(new Date(booking.checkOut), 'MMM dd, yyyy'),
        }),
      })
      
      loadBookings()
    }
  }

  const handleDelete = async (id: string) => {
    const booking = bookings.find(b => b.id === id)
    if (!booking) return

    if (!confirm('Are you sure you want to delete this booking? The guest will be notified.')) return
    
    const result = await deleteBooking(id)
    if (result.success) {
      // Send cancellation email to guest
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'booking-cancelled',
          to: booking.guestEmail,
          guestName: booking.guestName,
          propertyName: booking.propertyName,
          checkIn: format(new Date(booking.checkIn), 'MMM dd, yyyy'),
          checkOut: format(new Date(booking.checkOut), 'MMM dd, yyyy'),
        }),
      })
      
      loadBookings()
    } else {
      alert(result.error)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Enter password to access admin dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="mt-1"
                />
                {error && (
                  <p className="mt-2 text-sm text-destructive">{error}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Reservations Dashboard
            </h1>
            <p className="mt-2 text-muted-foreground">
              Manage all booking requests and reservations
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No bookings yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid gap-4 sm:grid-cols-3">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Pending</CardDescription>
                  <CardTitle className="text-3xl">
                    {bookings.filter(b => b.status === 'PENDING').length}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Approved</CardDescription>
                  <CardTitle className="text-3xl">
                    {bookings.filter(b => b.status === 'APPROVED').length}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Bookings</CardDescription>
                  <CardTitle className="text-3xl">{bookings.length}</CardTitle>
                </CardHeader>
              </Card>
            </div>

            {/* Bookings List */}
            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{booking.propertyName}</CardTitle>
                        <CardDescription className="mt-1">
                          Submitted {format(new Date(booking.createdAt), 'MMM dd, yyyy')}
                        </CardDescription>
                      </div>
                      <div className={`rounded-full px-3 py-1 text-sm font-medium ${
                        booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        booking.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                        booking.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {booking.status}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-2">
                      {/* Guest Info */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm">Guest Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{booking.guestName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <a href={`mailto:${booking.guestEmail}`} className="text-primary hover:underline">
                              {booking.guestEmail}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <a href={`tel:${booking.guestPhone}`} className="text-primary hover:underline">
                              {booking.guestPhone}
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Booking Details */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm">Booking Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {format(new Date(booking.checkIn), 'MMM dd')} - {format(new Date(booking.checkOut), 'MMM dd, yyyy')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">{booking.numberOfNights} nights</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span className="font-semibold">${booking.subtotal.toLocaleString()}</span>
                            <span className="text-xs text-muted-foreground">plus taxes & fees</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {booking.message && (
                      <div className="mt-4 rounded-lg bg-muted/50 p-3">
                        <p className="text-sm font-medium mb-1">Guest Message:</p>
                        <p className="text-sm text-muted-foreground">{booking.message}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {booking.status === 'PENDING' && (
                        <>
                          <Button
                            onClick={() => handleApprove(booking.id)}
                            size="sm"
                            className="gap-2"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleReject(booking.id)}
                            size="sm"
                            variant="outline"
                            className="gap-2"
                          >
                            <XCircle className="h-4 w-4" />
                            Reject
                          </Button>
                        </>
                      )}
                      
                      {booking.source === 'WEBSITE' && (
                        <Button
                          onClick={() => handleDelete(booking.id)}
                          size="sm"
                          variant="destructive"
                          className="gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      )}

                      {booking.source === 'VRBO' && (
                        <span className="text-xs text-muted-foreground px-3 py-2 bg-muted rounded">
                          VRBO Booking (Read Only)
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

