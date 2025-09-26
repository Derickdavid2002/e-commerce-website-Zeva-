"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, CheckCircle, Clock, Truck, FileImage } from "lucide-react"
import { useState } from "react"

// Sample orders data
const sampleOrders = [
  {
    id: "ORD-001",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, New York, NY 10001",
    },
    items: [
      { name: "Premium Cotton T-Shirt", size: "M", quantity: 2, price: 49 },
      { name: "Classic Denim Jacket", size: "L", quantity: 1, price: 129 },
    ],
    total: 227,
    status: "pending",
    paymentProof: "payment-proof-001.jpg",
    createdAt: "2025-01-15T10:30:00Z",
    deliveryType: "2-day",
  },
  {
    id: "ORD-002",
    customer: {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 (555) 987-6543",
      address: "456 Oak Ave, Los Angeles, CA 90210",
    },
    items: [{ name: "Elegant Silk Blouse", size: "S", quantity: 1, price: 89 }],
    total: 89,
    status: "confirmed",
    paymentProof: "payment-proof-002.jpg",
    createdAt: "2025-01-15T09:15:00Z",
    deliveryType: "same-day",
  },
  {
    id: "ORD-003",
    customer: {
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1 (555) 456-7890",
      address: "789 Pine St, Chicago, IL 60601",
    },
    items: [
      { name: "Comfortable Joggers", size: "L", quantity: 2, price: 69 },
      { name: "Wool Blend Sweater", size: "M", quantity: 1, price: 99 },
    ],
    total: 237,
    status: "processing",
    paymentProof: "payment-proof-003.jpg",
    createdAt: "2025-01-14T16:45:00Z",
    deliveryType: "2-day",
  },
]

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<(typeof sampleOrders)[0] | null>(null)

  const filteredOrders = sampleOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleConfirmPayment = async (orderId: string) => {
    try {
      // TODO: Connect Firebase here - Update order status in Firestore
      /*
      import { db } from '@/lib/firebase'
      import { doc, updateDoc } from 'firebase/firestore'
      
      await updateDoc(doc(db, 'orders', orderId), {
        status: 'confirmed',
        confirmedAt: new Date()
      })
      */

      console.log("🔥 TODO: Connect Firebase here - Update order status in Firestore")
      console.log("Confirming payment for order:", orderId)

      // TODO: Connect EmailJS here - Send confirmation email to customer
      /*
      import { sendOrderConfirmationEmail } from '@/lib/emailjs'
      
      const order = sampleOrders.find(o => o.id === orderId)
      if (order) {
        await sendOrderConfirmationEmail({
          customerEmail: order.customer.email,
          customerName: order.customer.name,
          orderId: order.id,
          total: order.total
        })
      }
      */

      console.log("📧 TODO: Connect EmailJS here - Send confirmation email to customer")
      alert("Payment confirmed! Customer will be notified via email.")
    } catch (error) {
      console.error("Error confirming payment:", error)
      alert("Failed to confirm payment. Please try again.")
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />
      case "processing":
        return <Truck className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary"
      case "confirmed":
        return "default"
      case "processing":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground">Manage customer orders and payments</p>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Orders ({filteredOrders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.customer.name}</p>
                          <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{order.items.length} items</TableCell>
                      <TableCell className="font-medium">${order.total}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(order.status) as any} className="capitalize">
                          {getStatusIcon(order.status)}
                          <span className="ml-1">{order.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(order)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          {order.status === "pending" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleConfirmPayment(order.id)}
                              className="bg-transparent"
                            >
                              Confirm Payment
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Order Details - {selectedOrder.id}</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(null)}>
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Customer Info */}
                <div>
                  <h3 className="font-semibold mb-2">Customer Information</h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Name:</strong> {selectedOrder.customer.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedOrder.customer.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {selectedOrder.customer.phone}
                    </p>
                    <p>
                      <strong>Address:</strong> {selectedOrder.customer.address}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="font-semibold mb-2">Order Items</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Size: {item.size} • Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-lg">${selectedOrder.total}</span>
                  </div>
                </div>

                {/* Payment Proof */}
                <div>
                  <h3 className="font-semibold mb-2">Payment Proof</h3>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileImage className="h-4 w-4" />
                      <span className="text-sm">{selectedOrder.paymentProof}</span>
                    </div>
                    <p className="text-xs text-orange-600 mt-1">
                      🔥 TODO: Connect Firebase Storage - Display uploaded payment screenshot here
                    </p>
                  </div>
                </div>

                {/* Actions */}
                {selectedOrder.status === "pending" && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        handleConfirmPayment(selectedOrder.id)
                        setSelectedOrder(null)
                      }}
                      className="flex-1"
                    >
                      Confirm Payment
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Reject Payment
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
