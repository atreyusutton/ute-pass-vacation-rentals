import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, MessageSquare, Sparkles, TrendingUp, Check } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Property Management Services",
  description: "Maximize your investment potential with comprehensive short-term rental management solutions in the Ute Pass and Colorado Springs area.",
}

export default function PropertyManagementPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with Images */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Property Management Services
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
              Maximize your investment potential with our comprehensive short-term rental management solutions.
            </p>
          </div>

          {/* Image Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative h-64 overflow-hidden rounded-2xl">
              <Image
                src="/assets/images/property-managment/property-managment-1.jpg"
                alt="Property management service"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-2xl">
              <Image
                src="/assets/images/property-managment/property-managment-2.jpg"
                alt="Property management service"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-2xl sm:col-span-2 lg:col-span-1">
              <Image
                src="/assets/images/property-managment/property-managment-3.jpg"
                alt="Property management service"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-muted/50 py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Choose Ute Pass Vacation Rentals?
            </h2>
          </div>

          <div className="mt-12 space-y-6 text-lg leading-relaxed max-w-4xl mx-auto">
            <p>
              Transform your Colorado property into a profitable vacation rental with our full-service management approach. We combine local market expertise with proven strategies to maximize your revenue while maintaining the highest standards of guest satisfaction and property care.
            </p>
            <p>
              Our comprehensive management services allow you to enjoy the benefits of rental income without the daily responsibilities. From marketing and bookings to cleaning and maintenance, we handle every aspect of your short-term rental business.
            </p>
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="xl">
              <Link href="/contact">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Management Services Cards */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Management Services</h2>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <Card className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Complete Property Setup</CardTitle>
                <CardDescription className="mt-4 text-base">
                  Professional photography, compelling property descriptions, and competitive pricing strategy to maximize your property&apos;s appeal and revenue potential.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Guest Management</CardTitle>
                <CardDescription className="mt-4 text-base">
                  End-to-end guest communication, from inquiry to check-out, ensuring exceptional experiences that lead to positive reviews and repeat bookings.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Cleaning & Maintenance</CardTitle>
                <CardDescription className="mt-4 text-base">
                  Professional cleaning after each stay plus proactive maintenance to protect your investment and ensure guest satisfaction.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Revenue Optimization</CardTitle>
                <CardDescription className="mt-4 text-base">
                  Dynamic pricing, market analysis, and booking optimization for all seasons to maximize your rental income year-round.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted/50 py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Benefits of Working With Us</h2>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {[
              "Hands-off property management — we handle everything",
              "Professional marketing across multiple platforms",
              "Competitive management fees with transparent pricing",
              "Local expertise in Ute Pass and Colorado Springs markets",
              "24/7 emergency response and guest support",
              "Regular property inspections and maintenance coordination",
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <p className="text-base">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "1",
                title: "Property Assessment",
                description: "We evaluate your property and recommend improvements to maximize its rental potential.",
              },
              {
                step: "2",
                title: "Setup & Marketing",
                description: "Professional photography, listing creation, and distribution across major booking platforms.",
              },
              {
                step: "3",
                title: "Guest Management",
                description: "We handle all communications, bookings, check-ins, and guest support throughout their stay.",
              },
              {
                step: "4",
                title: "Ongoing Operations",
                description: "Cleaning, maintenance, financial reporting, and continuous optimization of your listing.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  {item.step}
                </div>
                <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-primary py-12 sm:py-16 lg:py-24 text-primary-foreground">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Maximize Your Property&apos;s Potential?
          </h2>
          <p className="mt-4 text-lg opacity-90 max-w-3xl mx-auto">
            Let us help you turn your Colorado property into a successful vacation rental. Contact us today for a free consultation and property assessment.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="xl" variant="secondary">
              <Link href="/contact">Get Free Consultation</Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="border-white text-white bg-white/10 hover:bg-white/20">
              <Link href="/vacation-rentals">View Our Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

