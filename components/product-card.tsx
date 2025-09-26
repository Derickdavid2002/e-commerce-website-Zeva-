"use client"

import type { Product } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart } from "lucide-react"
import { AddToCartButton } from "./add-to-cart-button"
import Link from "next/link"
import { useState } from "react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden">
          <Link href={`/products/${product.id}`}>
            <img
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.featured && (
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                Featured
              </Badge>
            )}
            {!product.inStock && <Badge variant="destructive">Out of Stock</Badge>}
          </div>

          {/* Like Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={(e) => {
              e.preventDefault()
              setIsLiked(!isLiked)
            }}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
          </Button>

          {/* Quick Add to Cart */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <AddToCartButton
              product={product}
              size={product.sizes[0]} // Default to first available size
              className="w-full"
            >
              {product.inStock ? "Quick Add" : "Out of Stock"}
            </AddToCartButton>
          </div>
        </div>

        <Link href={`/products/${product.id}`}>
          <div className="p-4 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <p className="font-bold text-lg text-primary shrink-0">${product.price}</p>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

            <div className="flex items-center justify-between pt-2">
              <Badge variant="outline" className="text-xs">
                {product.category}
              </Badge>
              <p className="text-xs text-muted-foreground">{product.sizes.length} sizes available</p>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}
