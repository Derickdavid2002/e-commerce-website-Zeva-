import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Home } from "lucide-react"
import Link from "next/link"

export default function CheckoutConfirmationPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          {/* Success Message */}
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-balance">Order Received!</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Thank you for your order. We've received your payment proof and will confirm your payment within 24 hours.
            </p>
          </div>

          {/* Order Details Card */}
          <Card className="text-left">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">What happens next?</h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-primary">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Payment Verification</h3>
                    <p className="text-sm text-muted-foreground">
                      We'll review your payment proof and confirm within 24 hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-primary">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Order Processing</h3>
                    <p className="text-sm text-muted-foreground">
                      Once confirmed, we'll prepare your items for shipping.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-primary">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Shipping & Delivery</h3>
                    <p className="text-sm text-muted-foreground">
                      Your order will be shipped within 2-3 business days.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email Notification */}
          <div className="p-4 bg-primary/10 rounded-lg">
            <p className="text-sm text-primary">
              <strong>Email Confirmation:</strong> You'll receive an email notification once your payment is confirmed
              and when your order ships.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/products">
                Continue Shopping
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Support Info */}
          <div className="pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              Need help? Contact us at{" "}
              <a href="mailto:support@zeva.com" className="text-primary hover:underline">
                support@zeva.com
              </a>{" "}
              or call{" "}
              <a href="tel:+15551234567" className="text-primary hover:underline">
                +1 (555) 123-4567
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
