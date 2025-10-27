import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/assets/images/logo.png"
                alt="Ute Pass Vacation Rentals"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="font-semibold">Ute Pass Vacation Rentals</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Vacation Property Management in the Beautiful Ute Pass Region
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Family-owned rental management with a personal touch since 2008.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/vacation-rentals"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Vacation Rentals
                </Link>
              </li>
              <li>
                <Link
                  href="/property-management"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Property Management
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold">Contact Us</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <div className="text-sm">
                  <div className="text-muted-foreground">Cell: 720-987-5385</div>
                  <div className="text-muted-foreground">Office: 719-687-1476</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <div className="text-sm">
                  <a
                    href="mailto:christy@utepassvacationrentals.com"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    christy@utepassvacationrentals.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <div>Mon-Fri: 8AM-6PM</div>
                  <div>Weekend: 9AM-5PM</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Ute Pass Vacation Rentals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

