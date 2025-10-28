"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Mail, Phone, Calendar, Eye, Edit, Trash2, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

// Sample customer data
const sampleCustomers = [
  {
    id: "CUST-001",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    totalOrders: 5,
    totalSpent: 450,
    lastOrder: "2025-01-15",
    status: "active",
    joinDate: "2024-12-01",
  },
  {
    id: "CUST-002",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Ave, Los Angeles, CA 90210",
    totalOrders: 3,
    totalSpent: 280,
    lastOrder: "2025-01-14",
    status: "active",
    joinDate: "2024-11-15",
  },
  {
    id: "CUST-003",
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    phone: "+1 (555) 456-7890",
    address: "789 Pine St, Chicago, IL 60601",
    totalOrders: 8,
    totalSpent: 720,
    lastOrder: "2025-01-13",
    status: "vip",
    joinDate: "2024-10-20",
  },
  {
    id: "CUST-004",
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    phone: "+1 (555) 321-0987",
    address: "321 Elm St, Miami, FL 33101",
    totalOrders: 1,
    totalSpent: 89,
    lastOrder: "2025-01-10",
    status: "new",
    joinDate: "2025-01-05",
  },
]

export default function AdminCustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [customers, setCustomers] = useState(sampleCustomers)
  const [isLoading, setIsLoading] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // TODO: Connect Firebase here - Fetch customers from Firestore with real-time listener
  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true)
      try {
        /*
        import { db } from '@/lib/firebase'
        import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
        
        const customersQuery = query(collection(db, 'customers'), orderBy('joinDate', 'desc'))
        const unsubscribe = onSnapshot(customersQuery, (querySnapshot) => {
          const customersData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          setCustomers(customersData)
        })
        
        return () => unsubscribe()
        */

        console.log("🔥 TODO: Connect Firebase here - Fetch customers from Firestore with real-time listener")
        setCustomers(sampleCustomers)
      } catch (error) {
        console.error("Error fetching customers:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCustomers()
  }, [])

  const handleViewCustomer = (customerId: string) => {
    const customer = customers.find((c) => c.id === customerId)
    if (customer) {
      console.log("🔥 TODO: Connect Firebase here - View customer details")
      alert(
        `Customer Details:\n\nName: ${customer.name}\nEmail: ${customer.email}\nPhone: ${customer.phone}\nTotal Orders: ${customer.totalOrders}\nTotal Spent: $${customer.totalSpent}`,
      )
    }
  }

  const handleEditCustomer = (customerId: string) => {
    const customer = customers.find((c) => c.id === customerId)
    if (customer) {
      console.log("🔥 TODO: Connect Firebase here - Edit customer in Firestore")
      const newEmail = prompt("Edit customer email:", customer.email)
      if (newEmail && newEmail !== customer.email) {
        setCustomers(customers.map((c) => (c.id === customerId ? { ...c, email: newEmail } : c)))
        alert("Customer updated successfully!")
      }
    }
  }

  const handleDeleteCustomer = async (customerId: string) => {
    if (!confirm("Are you sure you want to delete this customer?")) return

    setDeletingId(customerId)
    try {
      // TODO: Connect Firebase here - Delete customer from Firestore
      /*
      import { db } from '@/lib/firebase'
      import { doc, deleteDoc } from 'firebase/firestore'
      
      await deleteDoc(doc(db, 'customers', customerId))
      // Customer will be removed from state via real-time listener
      */

      console.log("🔥 TODO: Connect Firebase here - Delete customer from Firestore")
      setCustomers(customers.filter((c) => c.id !== customerId))
      alert("Customer deleted successfully!")
    } catch (error) {
      console.error("Error deleting customer:", error)
      alert("Failed to delete customer. Please try again.")
    } finally {
      setDeletingId(null)
    }
  }

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Customers</h1>
            <p className="text-muted-foreground">Manage your customer base</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.length}</div>
              <p className="text-xs text-muted-foreground">Active customers</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">VIP Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.filter((c) => c.status === "vip").length}</div>
              <p className="text-xs text-muted-foreground">High-value customers</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.filter((c) => c.status === "new").length}</div>
              <p className="text-xs text-muted-foreground">Recent signups</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                $
                {Math.round(
                  customers.reduce((sum, c) => sum + c.totalSpent, 0) /
                    customers.reduce((sum, c) => sum + c.totalOrders, 0),
                )}
              </div>
              <p className="text-xs text-muted-foreground">Per order</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search customers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="bg-transparent">
                  Filter
                </Button>
                <Button variant="outline" className="bg-transparent">
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customers Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Customers ({filteredCustomers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading customers...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-sm text-muted-foreground">{customer.id}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-3 w-3" />
                              {customer.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              {customer.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{customer.totalOrders}</p>
                            <p className="text-sm text-muted-foreground">Last: {customer.lastOrder}</p>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">${customer.totalSpent}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              customer.status === "vip"
                                ? "default"
                                : customer.status === "new"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {customer.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-3 w-3" />
                            {customer.joinDate}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewCustomer(customer.id)}
                              title="View customer details"
                              disabled={deletingId !== null}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditCustomer(customer.id)}
                              title="Edit customer"
                              disabled={deletingId !== null}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDeleteCustomer(customer.id)}
                              title="Delete customer"
                              disabled={deletingId !== null}
                            >
                              {deletingId === customer.id ? (
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

        <div className="text-center text-sm text-orange-600 p-4 bg-orange-50 rounded-lg">
          🔥 TODO: Connect Firebase here - Real-time customer data with automatic sync to web
        </div>
      </div>
    </AdminLayout>
  )
}
