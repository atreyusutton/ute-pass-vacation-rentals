import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Ute Pass Vacation Rentals | Colorado Vacation Property Management",
    template: "%s | Ute Pass Vacation Rentals"
  },
  description: "Family-owned vacation rental management in the beautiful Ute Pass region. Professional property management services and quality vacation rentals in Colorado Springs area.",
  keywords: ["vacation rentals", "property management", "Ute Pass", "Colorado Springs", "Colorado vacation homes", "short-term rentals"],
  authors: [{ name: "Ute Pass Vacation Rentals" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://utepassvacationrentals.com",
    title: "Ute Pass Vacation Rentals | Colorado Vacation Property Management",
    description: "Family-owned vacation rental management in the beautiful Ute Pass region.",
    siteName: "Ute Pass Vacation Rentals",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

