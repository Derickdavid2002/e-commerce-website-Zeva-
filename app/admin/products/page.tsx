"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Trash2, Eye, Loader2, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { db } from "@/lib/firebase"
import { collection, deleteDoc, doc, query, orderBy, onSnapshot } from "firebase/firestore"
import { sampleProducts } from "@/lib/sample-data"

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [products, setProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isUsingFallback, setIsUsingFallback] = useState(false)

  useEffect(() => {
    let unsubscribe: (() => void) | undefined

    const setupProductsListener = () => {
      try {
        const productsQuery = query(collection(db, "products"), orderBy("createdAt", "desc"))

        unsubscribe = onSnapshot(
          productsQuery,
          (querySnapshot) => {
            const productsData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            setProducts(productsData)
            setIsLoading(false)
            setIsUsingFallback(false)
            setError(null)
          },
          (error: any) => {
            if (error.code === "permission-denied" || error.code === "failed-precondition") {
              setProducts(sampleProducts)
              setIsUsingFallback(true)
              setError("Using sample data. Configure Firestore security rules to enable live data.")
            } else {
              setProducts(sampleProducts)
              setIsUsingFallback(true)
              setError(`Database error: ${error.message}. Using sample data.`)
            }
            setIsLoading(false)
          },
        )
      } catch (error: any) {
        setProducts(sampleProducts)
        setIsUsingFallback(true)
        setError("Failed to connect to database. Using sample data.")
        setIsLoading(false)
      }
    }

    setupProductsListener()

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    setDeletingId(productId)
    try {
      if (isUsingFallback) {
        setProducts(products.filter((p) => p.id !== productId))
        alert("Product removed from sample data. Configure Firestore to persist changes.")
      } else {
        await deleteDoc(doc(db, "products", productId))
        alert("Product deleted successfully!")
      }
    } catch (error: any) {
      console.error("[v0] Error deleting product:", error)
      if (error.code === "permission-denied") {
        alert(
          "Permission denied. Configure Firestore security rules to allow product deletion. For now, you can delete from sample data.",
        )
        setProducts(products.filter((p) => p.id !== productId))
      } else {
        alert("Failed to delete product. Please try again.")
      }
    } finally {
      setDeletingId(null)
    }
  }

  const handleViewProduct = (productId: string) => {
    window.location.href = `/admin/products/${productId}/view`
  }

  const handleEditProduct = (productId: string) => {
    window.location.href = `/admin/products/${productId}/edit`
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-muted-foreground">Manage your product catalog</p>
          </div>
          <Button asChild>
            <Link href="/admin/products/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Link>
          </Button>
        </div>

        {error && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-800">{error}</p>
                <p className="text-xs text-yellow-700 mt-1">
                  To enable live data, set up Firestore security rules that allow authenticated users to read/write
                  products.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>{isLoading ? "Loading Products..." : `${filteredProducts.length} Products`}</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && !products.length ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>${product.price}</TableCell>
                        <TableCell>
                          <Badge variant={product.inStock ? "default" : "secondary"}>
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewProduct(product.id)}
                              title="View product"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditProduct(product.id)}
                              title="Edit product"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteProduct(product.id)}
                              disabled={deletingId === product.id}
                              title="Delete product"
                            >
                              {deletingId === product.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
