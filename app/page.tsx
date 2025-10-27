import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Building2, Phone, Award, Users, TrendingUp, Heart } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full overflow-hidden">
        <Image
          src="/assets/images/hero.jpg"
          alt="Beautiful Ute Pass mountain vacation rental"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative mx-auto flex h-full max-w-screen-xl items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Your Home Away From Home in the Ute Pass Region
            </h1>
            <p className="mt-6 text-lg sm:text-xl">
              Experience the perfect blend of mountain tranquility and personalized service with our family-owned vacation rentals and property management.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="xl" className="shadow-lg">
                <Link href="/vacation-rentals">Explore Rentals</Link>
              </Button>
              <Button asChild size="xl" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Services</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need for the perfect mountain getaway
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Home className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Vacation Rentals</CardTitle>
                <CardDescription>
                  Discover our carefully curated collection of vacation properties in the beautiful Ute Pass area. Each rental is maintained to the highest standards for your comfort and enjoyment.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Property Management</CardTitle>
                <CardDescription>
                  Maximize your investment with our comprehensive property management services. We handle everything from marketing to maintenance so you can enjoy the rewards.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Contact & Support</CardTitle>
                <CardDescription>
                  Our family team is here to help. With responsive communication and personalized service, we&apos;re available to ensure your experience exceeds expectations.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* About Our Family Business Section */}
      <section className="bg-muted/50 py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">About Our Family Business</h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Family-owned rental management with a personal touch since 2008
            </p>
          </div>

          <div className="mt-12 space-y-6 text-lg leading-relaxed">
            <p>
              Our story began in 2008 when Judy agreed to help a friend manage their vacation rental. What started as a simple favor quickly grew into something special as word spread about our exceptional service and personal attention to detail.
            </p>
            <p>
              From that single property, we&apos;ve grown into a trusted family operation serving the beautiful Ute Pass and Colorado Springs area. Our team includes family members who each bring their unique strengths — from maintenance and financial management to guest relations and daily operations.
            </p>
            <p>
              Today, we continue the tradition Judy started: treating every property owner like family and every guest like a valued friend. We handle everything from guest communication to property maintenance, ensuring your investment thrives while you enjoy peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart Section */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Sets Us Apart</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The family difference you can trust
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Family Owned Since 2008</CardTitle>
                <CardDescription className="mt-2">
                  Over 15 years of dedicated service and local expertise
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Personal Relationships</CardTitle>
                <CardDescription className="mt-2">
                  We treat every owner like family and every guest like a friend
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Proven Track Record</CardTitle>
                <CardDescription className="mt-2">
                  Consistent results and satisfied clients year after year
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Comprehensive Care</CardTitle>
                <CardDescription className="mt-2">
                  Full-service management covering every detail of your property
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-primary py-12 sm:py-16 lg:py-24 text-primary-foreground">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Experience the Family Difference?
          </h2>
          <p className="mt-4 text-lg opacity-90">
            Whether you&apos;re looking for the perfect vacation rental or want to maximize your property&apos;s potential, we&apos;re here to help.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="xl" variant="secondary">
              <Link href="/vacation-rentals">View Properties</Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="border-white text-white bg-white/10 hover:bg-white/20">
              <Link href="/contact">Contact Our Family</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

