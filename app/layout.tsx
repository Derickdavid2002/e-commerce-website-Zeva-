import type React from "react"
import type { Metadata } from "next"
import { GeistMono } from "geist/font"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"

export const metadata: Metadata = {
  title: "Zeva - Premium Clothing Store",
  description:
    "Discover premium clothing collections at Zeva. Modern fashion for the contemporary lifestyle.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistMono.variable} antialiased`}>
      <body className="font-sans">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
