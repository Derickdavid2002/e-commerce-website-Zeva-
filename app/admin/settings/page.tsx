"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Store, Bell, Shield, Database, Save, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { useState } from "react"

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")

  // Store Settings
  const [storeName, setStoreName] = useState("Zeva Clothing")
  const [storeDescription, setStoreDescription] = useState("Premium fashion for the modern lifestyle")
  const [storeEmail, setStoreEmail] = useState("contact@zeva.com")
  const [storePhone, setStorePhone] = useState("+1 (555) 123-4567")
  const [storeAddress, setStoreAddress] = useState("123 Fashion Ave, New York, NY 10001")

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [orderNotifications, setOrderNotifications] = useState(true)
  const [inventoryAlerts, setInventoryAlerts] = useState(true)
  const [customerNotifications, setCustomerNotifications] = useState(false)

  // Security Settings
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState("30")

  // System Settings
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [debugMode, setDebugMode] = useState(false)

  const handleSaveSettings = async () => {
    setIsLoading(true)
    setSaveStatus("saving")

    try {
      // TODO: Connect Firebase here - Save settings to Firestore
      /*
      import { db } from '@/lib/firebase'
      import { doc, setDoc } from 'firebase/firestore'
      
      const settingsData = {
        store: {
          name: storeName,
          description: storeDescription,
          email: storeEmail,
          phone: storePhone,
          address: storeAddress
        },
        notifications: {
          email: emailNotifications,
          orders: orderNotifications,
          inventory: inventoryAlerts,
          customers: customerNotifications
        },
        security: {
          twoFactor: twoFactorAuth,
          sessionTimeout: parseInt(sessionTimeout)
        },
        system: {
          maintenance: maintenanceMode,
          debug: debugMode
        },
        updatedAt: new Date()
      }
      
      await setDoc(doc(db, 'settings', 'admin'), settingsData)
      // Settings will update in real-time across the app
      */

      console.log("🔥 TODO: Connect Firebase here - Save admin settings to Firestore")
      console.log("Saving settings:", {
        store: { name: storeName, description: storeDescription },
        notifications: { email: emailNotifications, orders: orderNotifications },
        security: { twoFactor: twoFactorAuth },
        system: { maintenance: maintenanceMode },
      })

      // Simulate save delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSaveStatus("saved")

      // Reset status after 3 seconds
      setTimeout(() => setSaveStatus("idle"), 3000)
    } catch (error) {
      console.error("Error saving settings:", error)
      setSaveStatus("error")
      setTimeout(() => setSaveStatus("idle"), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your store configuration and preferences</p>
          </div>
          <Button onClick={handleSaveSettings} disabled={isLoading}>
            {isLoading ? (
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

        {/* Save Status Alert */}
        {saveStatus !== "idle" && (
          <Alert variant={saveStatus === "error" ? "destructive" : "default"}>
            {saveStatus === "saved" ? (
              <CheckCircle className="h-4 w-4" />
            ) : saveStatus === "error" ? (
              <AlertCircle className="h-4 w-4" />
            ) : null}
            <AlertDescription>
              {saveStatus === "saving" && "Saving settings..."}
              {saveStatus === "saved" && "Settings saved successfully!"}
              {saveStatus === "error" && "Failed to save settings. Please try again."}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Store Information */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Store Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder="Enter store name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Contact Email</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    value={storeEmail}
                    onChange={(e) => setStoreEmail(e.target.value)}
                    placeholder="contact@store.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="storeDescription">Store Description</Label>
                <Textarea
                  id="storeDescription"
                  value={storeDescription}
                  onChange={(e) => setStoreDescription(e.target.value)}
                  placeholder="Describe your store"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storePhone">Phone Number</Label>
                  <Input
                    id="storePhone"
                    value={storePhone}
                    onChange={(e) => setStorePhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeAddress">Address</Label>
                  <Input
                    id="storeAddress"
                    value={storeAddress}
                    onChange={(e) => setStoreAddress(e.target.value)}
                    placeholder="Store address"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <Badge variant="default">Connected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Storage</span>
                <Badge variant="default">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Email Service</span>
                <Badge variant="secondary">Configured</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Backup</span>
                <Badge variant="outline">Pending</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive email alerts for important events</p>
                </div>
                <Switch id="emailNotifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="orderNotifications">Order Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get notified about new orders</p>
                </div>
                <Switch id="orderNotifications" checked={orderNotifications} onCheckedChange={setOrderNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="inventoryAlerts">Inventory Alerts</Label>
                  <p className="text-sm text-muted-foreground">Low stock notifications</p>
                </div>
                <Switch id="inventoryAlerts" checked={inventoryAlerts} onCheckedChange={setInventoryAlerts} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="customerNotifications">Customer Updates</Label>
                  <p className="text-sm text-muted-foreground">New customer registrations</p>
                </div>
                <Switch
                  id="customerNotifications"
                  checked={customerNotifications}
                  onCheckedChange={setCustomerNotifications}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add extra security to your account</p>
                </div>
                <Switch id="twoFactorAuth" checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(e.target.value)}
                  placeholder="30"
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Temporarily disable the store</p>
                </div>
                <Switch id="maintenanceMode" checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="debugMode">Debug Mode</Label>
                  <p className="text-sm text-muted-foreground">Enable detailed logging</p>
                </div>
                <Switch id="debugMode" checked={debugMode} onCheckedChange={setDebugMode} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Firebase Integration Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Integration Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Firebase Auth</span>
                  <Badge variant="secondary">Configured</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Authentication service ready</p>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Firestore Database</span>
                  <Badge variant="secondary">Configured</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Database connection active</p>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Firebase Storage</span>
                  <Badge variant="secondary">Configured</Badge>
                </div>
                <p className="text-sm text-muted-foreground">File storage ready</p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-600">
                🔥 TODO: Connect Firebase here - All integrations are configured but need to be connected to live
                Firebase services for real-time sync
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
