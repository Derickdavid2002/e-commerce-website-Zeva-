"use client"

import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase-config"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
}

export function FirebaseTest() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const querySnapshot = await getDocs(collection(db, "Products"))
        const productsData: Product[] = []

        querySnapshot.forEach((doc) => {
          productsData.push({
            id: doc.id,
            name: doc.data().name || "Unnamed Product",
            price: doc.data().price || 0,
          })
        })

        setProducts(productsData)
        setError(null)
      } catch (err) {
        console.error("Error fetching products:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch products")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Firebase Connection Test</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="ml-2">Loading products from Firestore...</span>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full max-w-2xl mx-auto border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Firebase Connection Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-destructive">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Firebase Connection Test - Products from Firestore</CardTitle>
      </CardHeader>
      <CardContent>
        {products.length === 0 ? (
          <p className="text-muted-foreground">No products found in Firestore</p>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Successfully loaded {products.length} product(s) from Firestore:
            </p>
            <ul className="space-y-2">
              {products.map((product) => (
                <li key={product.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="font-medium">{product.name}</span>
                  <span className="text-primary font-semibold">${product.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
