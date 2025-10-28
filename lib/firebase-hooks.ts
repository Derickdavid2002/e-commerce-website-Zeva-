"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import { sampleProducts } from "@/lib/sample-data"

export function useProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    try {
      const productsQuery = query(collection(db, "products"), orderBy("createdAt", "desc"))

      const unsubscribe = onSnapshot(
        productsQuery,
        (querySnapshot) => {
          const productsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          setProducts(productsData)
          setLoading(false)
        },
        (err) => {
          console.warn("Firestore error, using sample data:", err.message)
          setProducts(sampleProducts)
          setError(null)
          setLoading(false)
        },
      )

      return () => unsubscribe()
    } catch (err) {
      console.warn("Error setting up products listener, using sample data:", err)
      setProducts(sampleProducts)
      setError(null)
      setLoading(false)
    }
  }, [])

  return { products, loading, error }
}

export function useOrders() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    try {
      const ordersQuery = query(collection(db, "orders"), orderBy("createdAt", "desc"))

      const unsubscribe = onSnapshot(
        ordersQuery,
        (querySnapshot) => {
          const ordersData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          setOrders(ordersData)
          setLoading(false)
        },
        (err) => {
          console.warn("Firestore orders error:", err.message)
          setOrders([])
          setError(null)
          setLoading(false)
        },
      )

      return () => unsubscribe()
    } catch (err) {
      console.warn("Error setting up orders listener:", err)
      setOrders([])
      setError(null)
      setLoading(false)
    }
  }, [])

  return { orders, loading, error }
}

export function useDashboardStats() {
  const [stats, setStats] = useState({
    totalProducts: sampleProducts.length,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    confirmedOrders: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const productsQuery = query(collection(db, "products"))
      const ordersQuery = query(collection(db, "orders"))
      const customersQuery = query(collection(db, "customers"))

      const unsubscribeProducts = onSnapshot(
        productsQuery,
        (snapshot) => {
          setStats((prev) => ({ ...prev, totalProducts: snapshot.docs.length }))
        },
        (err) => {
          console.warn("Firestore products error:", err.message)
          setStats((prev) => ({ ...prev, totalProducts: sampleProducts.length }))
        },
      )

      const unsubscribeOrders = onSnapshot(
        ordersQuery,
        (snapshot) => {
          const orders = snapshot.docs.map((doc) => doc.data())
          const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0)
          const pending = orders.filter((o) => o.status === "pending").length
          const confirmed = orders.filter((o) => o.status === "confirmed").length

          setStats((prev) => ({
            ...prev,
            totalOrders: snapshot.docs.length,
            totalRevenue,
            pendingOrders: pending,
            confirmedOrders: confirmed,
          }))
        },
        (err) => {
          console.warn("Firestore orders error:", err.message)
        },
      )

      const unsubscribeCustomers = onSnapshot(
        customersQuery,
        (snapshot) => {
          setStats((prev) => ({ ...prev, totalCustomers: snapshot.docs.length }))
          setLoading(false)
        },
        (err) => {
          console.warn("Firestore customers error:", err.message)
          setLoading(false)
        },
      )

      return () => {
        unsubscribeProducts()
        unsubscribeOrders()
        unsubscribeCustomers()
      }
    } catch (err) {
      console.error("Error setting up dashboard stats listener:", err)
      setLoading(false)
    }
  }, [])

  return { stats, loading }
}
