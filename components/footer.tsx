import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">Z</span>
              </div>
              <span className="text-xl font-bold text-foreground">Zeva</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Premium clothing for the modern lifestyle. Quality, style, and comfort in every piece.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors block">
                Home
              </Link>
              <Link
                href="/products"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors block"
              >
                Products
              </Link>
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors block"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors block"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Customer Service</h3>
            <div className="space-y-2">
              <Link
                href="/shipping"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors block"
              >
                Shipping Info
              </Link>
              <Link
                href="/returns"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors block"
              >
                Returns
              </Link>
              <Link
                href="/size-guide"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors block"
              >
                Size Guide
              </Link>
              <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors block">
                FAQ
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Email: hello@zeva.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Mon-Fri: 9AM-6PM EST</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">© 2025 Zeva. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
