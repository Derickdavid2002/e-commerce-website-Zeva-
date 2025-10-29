"use client"

import type React from "react"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, Loader2, Upload, X, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { db, storage } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

const compressImage = async (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target?.result as string
      img.onload = () => {
        const canvas = document.createElement("canvas")
        let width = img.width
        let height = img.height

        if (width > 1200) {
          height = (height * 1200) / width
          width = 1200
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext("2d")
        if (!ctx) {
          reject(new Error("Failed to get canvas context"))
          return
        }

        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error("Failed to compress image"))
            }
          },
          "image/jpeg",
          0.8,
        )
      }
      img.onerror = () => reject(new Error("Failed to load image"))
    }
    reader.onerror = () => reject(new Error("Failed to read file"))
  })
}

const uploadWithRetry = async (storageRef: any, file: Blob, maxRetries = 3): Promise<string> => {
  let lastError: Error | null = null

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[v0] Upload attempt ${attempt}/${maxRetries}...`)
      await uploadBytes(storageRef, file)
      console.log(`[v0] Upload successful on attempt ${attempt}`)
      return await getDownloadURL(storageRef)
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))
      console.log(`[v0] Upload attempt ${attempt} failed: ${lastError.message}`)

      if (attempt < maxRetries) {
        const waitTime = Math.min(1000 * Math.pow(2, attempt - 1), 5000)
        console.log(`[v0] Waiting ${waitTime}ms before retry...`)
        await new Promise((resolve) => setTimeout(resolve, waitTime))
      }
    }
  }

  throw lastError || new Error("Upload failed after all retries")
}

export default function NewProductPage() {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([])
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [uploadProgress, setUploadProgress] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    inStock: true,
    featured: false,
  })

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImageFiles((prev) => [...prev, ...files])

    // Create preview URLs
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreviewUrls((prev) => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index))
    setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSave = async () => {
    if (!formData.name || !formData.price || !formData.category) {
      setErrorMessage("Please fill in all required fields (Name, Price, Category)")
      return
    }

    if (imageFiles.length === 0) {
      setErrorMessage("Please upload at least one product image")
      return
    }

    setErrorMessage("")
    setSuccessMessage("")
    setUploadProgress("")
    setIsSaving(true)
    setUploadingImages(true)

    try {
      console.log("[v0] Starting product upload process...")
      console.log("[v0] Number of images to upload:", imageFiles.length)

      const imageUrls: string[] = []

      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i]
        console.log(`[v0] Processing image ${i + 1}/${imageFiles.length}: ${file.name}`)
        setUploadProgress(`Compressing image ${i + 1}/${imageFiles.length}...`)

        try {
          console.log(`[v0] Compressing image ${i + 1}...`)
          const compressedBlob = await compressImage(file)
          console.log(
            `[v0] Image compressed: ${(file.size / 1024).toFixed(2)}KB → ${(compressedBlob.size / 1024).toFixed(2)}KB`,
          )

          const timestamp = Date.now()
          const storageRef = ref(storage, `products/${timestamp}-${i}-${file.name}`)

          setUploadProgress(`Uploading image ${i + 1}/${imageFiles.length}...`)
          console.log(`[v0] Uploading to path: products/${timestamp}-${i}-${file.name}`)

          const downloadUrl = await uploadWithRetry(storageRef, compressedBlob)
          console.log(`[v0] Got download URL for image ${i + 1}: ${downloadUrl.substring(0, 50)}...`)
          imageUrls.push(downloadUrl)
        } catch (imageError) {
          console.error(`[v0] Error uploading image ${i + 1}:`, imageError)
          throw new Error(
            `Failed to upload image ${i + 1}: ${imageError instanceof Error ? imageError.message : "Unknown error"}`,
          )
        }
      }

      console.log("[v0] All images uploaded successfully. Total URLs:", imageUrls.length)
      setUploadProgress("Saving product to database...")
      setUploadingImages(false)

      // Add product to Firestore
      console.log("[v0] Starting Firestore write with product data...")
      const productData = {
        name: formData.name,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        category: formData.category,
        sizes: formData.sizes,
        images: imageUrls,
        inStock: formData.inStock,
        featured: formData.featured,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }

      console.log("[v0] Product data to save:", {
        ...productData,
        images: `[${imageUrls.length} images]`,
      })

      const docRef = await addDoc(collection(db, "products"), productData)
      console.log("[v0] ✅ Product created successfully with ID:", docRef.id)

      setSuccessMessage(`✅ Product "${formData.name}" uploaded successfully!`)
      setUploadProgress("")

      // Reset form after successful upload
      setTimeout(() => {
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          sizes: ["XS", "S", "M", "L", "XL", "XXL"],
          inStock: true,
          featured: false,
        })
        setImageFiles([])
        setImagePreviewUrls([])
        setSuccessMessage("")
        router.push("/admin/products")
      }, 2000)
    } catch (error) {
      console.error("[v0] Error creating product:", error)
      const errorMsg = error instanceof Error ? error.message : "Unknown error occurred"
      setErrorMessage(`Failed to create product: ${errorMsg}`)
      setUploadProgress("")
    } finally {
      setIsSaving(false)
      setUploadingImages(false)
    }
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
              <h1 className="text-3xl font-bold">Add New Product</h1>
              <p className="text-muted-foreground">Create a new product for your store</p>
            </div>
          </div>
          <Button onClick={handleSave} disabled={isSaving || uploadingImages}>
            {isSaving || uploadingImages ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {uploadProgress || "Creating..."}
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Create Product
              </>
            )}
          </Button>
        </div>

        {successMessage && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="text-green-800">{successMessage}</p>
            </CardContent>
          </Card>
        )}

        {errorMessage && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-800">{errorMessage}</p>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter product name"
                    disabled={isSaving || uploadingImages}
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
                    disabled={isSaving || uploadingImages}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0.00"
                      disabled={isSaving || uploadingImages}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g., T-Shirts, Jackets"
                      disabled={isSaving || uploadingImages}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Images *</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    id="image-upload"
                    disabled={uploadingImages || isSaving}
                  />
                  <label
                    htmlFor="image-upload"
                    className={uploadingImages || isSaving ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <p className="font-medium">Click to upload or drag and drop</p>
                      <p className="text-sm text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </label>
                </div>

                {/* Image previews */}
                {imagePreviewUrls.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {imagePreviewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url || "/placeholder.svg"}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                          disabled={uploadingImages || isSaving}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
                    disabled={isSaving || uploadingImages}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="featured">Featured</Label>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                    disabled={isSaving || uploadingImages}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-900">✓ Live Sync Enabled</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-green-800">
                  Products created here will automatically appear on the customer store in real-time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
