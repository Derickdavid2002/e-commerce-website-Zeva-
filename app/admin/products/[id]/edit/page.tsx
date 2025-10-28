"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { sampleProducts } from "@/lib/sample-data"
import { useState, useEffect } from "react"

export default function ProductEditPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    inStock: true,
    featured: false,
  })

  useEffect(() => {
    // TODO: Connect Firebase here - Fetch product from Firestore
    /*
    import { db } from '@/lib/firebase'
    import { doc, getDoc } from 'firebase/firestore'
    
    const fetchProduct = async () => {
      const docSnap = await getDoc(doc(db, 'products', productId))
      if (docSnap.exists()) {
        setFormData(docSnap.data())
      }
      setIsLoading(false)
    }
    
    fetchProduct()
    */

    console.log("🔥 TODO: Connect Firebase here - Fetch product from Firestore for editing")
    const product = sampleProducts.find((p) => p.id === productId)
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        inStock: product.inStock,
        featured: product.featured,
      })
    }
    setIsLoading(false)
  }, [productId])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // TODO: Connect Firebase here - Update product in Firestore
      /*
      import { db } from '@/lib/firebase'
      import { doc, updateDoc } from 'firebase/firestore'
      
      await updateDoc(doc(db, 'products', productId), {
        ...formData,
        price: parseFloat(formData.price),
        updatedAt: new Date()
      })
      
      // This will trigger real-time updates across the app
      router.push('/admin/products')
      */

      console.log("🔥 TODO: Connect Firebase here - Update product in Firestore")
      console.log("Saving product:", { id: productId, ...formData })

      // Simulate save
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/admin/products")
    } catch (error) {
      console.error("Error saving product:", error)
      alert("Failed to save product")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading product...</p>
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
              <h1 className="text-3xl font-bold">Edit Product</h1>
              <p className="text-muted-foreground">{productId}</p>
            </div>
          </div>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter product name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter product description"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="Enter category"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="inStock">In Stock</Label>
                  <Switch
                    id="inStock"
                    checked={formData.inStock}
                    onCheckedChange={(checked) => setFormData({ ...formData, inStock: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="featured">Featured</Label>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center text-sm text-orange-600 p-4 bg-orange-50 rounded-lg">
          🔥 TODO: Connect Firebase here - Real-time product updates that sync to web automatically
        </div>
      </div>
    </AdminLayout>
  )
}
