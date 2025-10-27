"use client"

import { useState } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, Clock, MapPin } from "lucide-react"

const contactSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    try {
      // Send email
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          ...data,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setIsSubmitted(true)
      reset()
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (error) {
      console.error('Contact form error:', error)
      alert('Failed to send message. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const faqs = [
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking 2-3 months in advance for peak season (summer and winter holidays) and 1-2 months for other times.",
    },
    {
      question: "What's included in the rental?",
      answer: "Linens, towels, kitchen essentials, WiFi, and parking are included. Specific amenities vary by property.",
    },
    {
      question: "Is there a minimum stay requirement?",
      answer: "Most properties have a 2-3 night minimum stay. Extended minimums may apply during peak seasons and holidays.",
    },
    {
      question: "How does property management work?",
      answer: "We handle listing creation, guest communication, cleaning, and maintenance — you collect the profits while we manage the details.",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Get in Touch
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
              We&apos;re here to help with reservations, owner inquiries, or any questions you may have.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="bg-muted/50 py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Phone</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Cell</p>
                  <a href="tel:720-987-5385" className="font-medium hover:text-primary transition-colors">
                    720-987-5385
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Office</p>
                  <a href="tel:719-687-1476" className="font-medium hover:text-primary transition-colors">
                    719-687-1476
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Personal</p>
                  <a href="mailto:christy@utepassvacationrentals.com" className="font-medium hover:text-primary transition-colors break-all">
                    christy@utepassvacationrentals.com
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bookings</p>
                  <a href="mailto:bookings@utepassvacationrentals.com" className="font-medium hover:text-primary transition-colors break-all">
                    bookings@utepassvacationrentals.com
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="sm:col-span-2 lg:col-span-1">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Office Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Monday - Friday</p>
                  <p className="font-medium">8:00 AM - 6:00 PM</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Weekend</p>
                  <p className="font-medium">9:00 AM - 5:00 PM</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form and Image Side by Side */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Send Us a Message</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Form - Left Side */}
            <Card>
              <CardContent className="pt-6">
              {isSubmitted && (
                <div className="mb-6 rounded-lg bg-green-50 p-4 text-green-800 border border-green-200">
                  <p className="font-medium">Message sent successfully!</p>
                  <p className="text-sm mt-1">We&apos;ll get back to you soon.</p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      {...register("fullName")}
                      placeholder="John Doe"
                      className="mt-1"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-destructive">{errors.fullName.message}</p>
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
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...register("phone")}
                      placeholder="(555) 123-4567"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="inquiryType">Inquiry Type *</Label>
                    <Select
                      id="inquiryType"
                      {...register("inquiryType")}
                      className="mt-1"
                    >
                      <option value="">Select...</option>
                      <option value="general">General</option>
                      <option value="reservations">Reservations</option>
                      <option value="owner">Owner Inquiry</option>
                      <option value="support">Support</option>
                    </Select>
                    {errors.inquiryType && (
                      <p className="mt-1 text-sm text-destructive">{errors.inquiryType.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    {...register("subject")}
                    placeholder="How can we help you?"
                    className="mt-1"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-destructive">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    placeholder="Tell us more about your inquiry..."
                    className="mt-1"
                    rows={6}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

            {/* Suttons Image - Right Side */}
            <div className="relative w-full h-full overflow-hidden rounded-2xl">
              <Image
                src="/assets/images/suttons.jpg"
                alt="The Sutton Family"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Find Us / Location */}
      <section className="bg-muted/50 py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Find Us</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Located in the heart of the beautiful Ute Pass and Colorado Springs area
            </p>
          </div>

          <div className="prose prose-lg max-w-4xl mx-auto mb-8">
            <p className="text-center text-muted-foreground">
              We&apos;re strategically located in the Ute Pass area, providing easy access to Colorado Springs&apos; most popular attractions including Pikes Peak, Garden of the Gods, and numerous hiking trails. Our properties offer the perfect blend of mountain tranquility and city convenience.
            </p>
          </div>

          {/* Map Placeholder - In production, integrate Google Maps */}
          <div className="relative aspect-[21/9] overflow-hidden rounded-2xl bg-muted border">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Google Maps integration will be added with backend setup
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Ute Pass & Colorado Springs Area
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

