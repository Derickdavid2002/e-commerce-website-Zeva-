"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { sampleProducts } from "@/lib/sample-data"
import { useState, useEffect } from "react"

export default function ProductViewPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string
  const [product, setProduct] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: Connect Firebase here - Fetch product from Firestore
    /*
    import { db } from '@/lib/firebase'
    import { doc, getDoc } from 'firebase/firestore'
    
    const fetchProduct = async () => {
      const docSnap = await getDoc(doc(db, 'products', productId))
      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() })
      }
      setIsLoading(false)
    }
    
    fetchProduct()
    */

    console.log("🔥 TODO: Connect Firebase here - Fetch product from Firestore")
    const foundProduct = sampleProducts.find((p) => p.id === productId)
    setProduct(foundProduct)
    setIsLoading(false)
  }, [productId])

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </AdminLayout>
    )
  }

  if (!product) {
    return (
      <AdminLayout>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Product not found</p>
          <Link href="/admin/products">
            <Button className="mt-4">Back to Products</Button>
          </Link>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-muted-foreground">{product.id}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Link href={`/admin/products/${productId}/edit`}>
              <Button>Edit Product</Button>
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Product Images */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="w-full h-96 bg-muted rounded-lg overflow-hidden">
                    <img
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {product.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {product.images.map((img: string, idx: number) => (
                        <div key={idx} className="h-20 bg-muted rounded-lg overflow-hidden">
                          <img
                            src={img || "/placeholder.svg"}
                            alt={`${product.name} ${idx}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="text-2xl font-bold">${product.price}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <Badge variant="outline">{product.category}</Badge>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Stock Status</p>
                  <Badge variant={product.inStock ? "default" : "destructive"}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Featured</p>
                  <Badge variant={product.featured ? "secondary" : "outline"}>{product.featured ? "Yes" : "No"}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{product.description}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center text-sm text-orange-600 p-4 bg-orange-50 rounded-lg">
          🔥 TODO: Connect Firebase here - Real-time product view with live updates
        </div>
      </div>
    </AdminLayout>
  )
}
