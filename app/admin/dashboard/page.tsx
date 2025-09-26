"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { sampleProducts } from "@/lib/sample-data"
import { useState, useEffect } from "react"

// Sample data for dashboard
const sampleDashboardStats = {
  totalProducts: sampleProducts.length,
  totalOrders: 24,
  totalCustomers: 156,
  totalRevenue: 12450,
  pendingOrders: 8,
  confirmedOrders: 16,
}

const sampleRecentOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    items: 2,
    total: 158,
    status: "pending",
    date: "2025-01-15",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    items: 1,
    total: 89,
    status: "confirmed",
    date: "2025-01-15",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    items: 3,
    total: 247,
    status: "pending",
    date: "2025-01-14",
  },
  {
    id: "ORD-004",
    customer: "Sarah Wilson",
    items: 1,
    total: 49,
    status: "confirmed",
    date: "2025-01-14",
  },
]

export default function AdminDashboardPage() {
  const [dashboardStats, setDashboardStats] = useState(sampleDashboardStats)
  const [recentOrders, setRecentOrders] = useState(sampleRecentOrders)
  const [isLoading, setIsLoading] = useState(false)

  // TODO: Connect Firebase here - Fetch real-time dashboard data from Firestore
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true)
      try {
        /*
        import { db } from '@/lib/firebase'
        import { collection, getDocs, query, orderBy, limit, where } from 'firebase/firestore'
        
        // Fetch products count
        const productsSnapshot = await getDocs(collection(db, 'products'))
        const totalProducts = productsSnapshot.size
        
        // Fetch orders data
        const ordersSnapshot = await getDocs(collection(db, 'orders'))
        const orders = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        
        const totalOrders = orders.length
        const pendingOrders = orders.filter(order => order.status === 'pending').length
        const confirmedOrders = orders.filter(order => order.status === 'confirmed').length
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
        
        // Fetch recent orders
        const recentOrdersQuery = query(
          collection(db, 'orders'), 
          orderBy('createdAt', 'desc'), 
          limit(4)
        )
        const recentOrdersSnapshot = await getDocs(recentOrdersQuery)
        const recentOrdersData = recentOrdersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        
        // Fetch customers count (you might want to create a separate customers collection)
        const customersSnapshot = await getDocs(collection(db, 'customers'))
        const totalCustomers = customersSnapshot.size
        
        setDashboardStats({
          totalProducts,
          totalOrders,
          totalCustomers,
          totalRevenue,
          pendingOrders,
          confirmedOrders
        })
        
        setRecentOrders(recentOrdersData)
        */

        console.log("🔥 TODO: Connect Firebase here - Fetch real-time dashboard data from Firestore")
        // Using sample data for now
        setDashboardStats(sampleDashboardStats)
        setRecentOrders(sampleRecentOrders)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()

    // TODO: Connect Firebase here - Set up real-time listeners for live updates
    /*
    import { onSnapshot } from 'firebase/firestore'
    
    const unsubscribeOrders = onSnapshot(collection(db, 'orders'), (snapshot) => {
      // Update dashboard stats in real-time when orders change
      const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      // Update state with new data
    })
    
    const unsubscribeProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
      // Update product count in real-time
      setDashboardStats(prev => ({ ...prev, totalProducts: snapshot.size }))
    })
    
    return () => {
      unsubscribeOrders()
      unsubscribeProducts()
    }
    */
  }, [])

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your store.</p>
        </div>

        {/* Firebase Connection Notice */}
        <div className="text-center text-sm text-orange-600 p-4 bg-orange-50 rounded-lg">
          🔥 TODO: Connect Firebase here - Replace sample data with real-time Firestore data and analytics
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">Active products in store</p>
              {/* TODO: Connect Firebase here - Real-time product count from Firestore */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> from last month
              </p>
              {/* TODO: Connect Firebase here - Real-time order count and growth metrics */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalCustomers}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8%</span> from last month
              </p>
              {/* TODO: Connect Firebase here - Customer analytics from Firestore */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${dashboardStats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+15%</span> from last month
              </p>
              {/* TODO: Connect Firebase here - Revenue calculations from order data */}
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              {/* TODO: Connect Firebase here - Real-time recent orders from Firestore */}
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Loading recent orders...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{order.id}</span>
                          <Badge variant={order.status === "pending" ? "secondary" : "default"}>
                            {order.status === "pending" ? (
                              <>
                                <Clock className="h-3 w-3 mr-1" />
                                Pending
                              </>
                            ) : (
                              <>
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Confirmed
                              </>
                            )}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.items} items • {order.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${order.total}</p>
                        <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions & Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Pending Orders</span>
                  </div>
                  <Badge variant="secondary">{dashboardStats.pendingOrders}</Badge>
                  {/* TODO: Connect Firebase here - Real-time pending order count */}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Confirmed Orders</span>
                  </div>
                  <Badge variant="default">{dashboardStats.confirmedOrders}</Badge>
                  {/* TODO: Connect Firebase here - Real-time confirmed order count */}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <Package className="h-4 w-4 mr-2" />
                  Add New Product
                  {/* TODO: Connect Firebase here - Add product to Firestore */}
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  View All Orders
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                  {/* TODO: Connect Firebase here - Analytics from Firestore data */}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
