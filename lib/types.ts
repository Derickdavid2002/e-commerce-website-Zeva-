export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  sizes: string[]
  category: string
  inStock: boolean
  featured?: boolean
}

export interface CartItem {
  product: Product
  size: string
  quantity: number
}

export interface Order {
  id: string
  items: CartItem[]
  customerInfo: {
    fullName: string
    phone: string
    address: string
    city: string
    state: string
  }
  paymentProof?: string
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered"
  total: number
  createdAt: Date
  deliveryType?: "same-day" | "2-day"
}

export interface User {
  id: string
  email: string
  role: "admin" | "customer"
}
