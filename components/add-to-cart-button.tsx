"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/types"
import { useState } from "react"

interface AddToCartButtonProps {
  product: Product
  size?: string
  quantity?: number
  variant?: "default" | "outline" | "ghost"
  className?: string
  children?: React.ReactNode
}

export function AddToCartButton({
  product,
  size = "M",
  quantity = 1,
  variant = "default",
  className,
  children,
}: AddToCartButtonProps) {
  const { dispatch } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)

    dispatch({
      type: "ADD_ITEM",
      payload: {
        product,
        size,
        quantity,
      },
    })

    // Simulate loading state
    setTimeout(() => {
      setIsAdding(false)
    }, 500)
  }

  return (
    <Button variant={variant} className={className} onClick={handleAddToCart} disabled={!product.inStock || isAdding}>
      <ShoppingBag className="h-4 w-4 mr-2" />
      {children || (isAdding ? "Adding..." : product.inStock ? "Add to Cart" : "Out of Stock")}
    </Button>
  )
}
