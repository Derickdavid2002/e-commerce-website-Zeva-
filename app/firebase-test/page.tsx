import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FirebaseTest } from "@/components/firebase-test"

export default function FirebaseTestPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Firebase Connection Test</h1>
            <p className="text-muted-foreground">
              This page tests the Firestore connection and displays products from your database
            </p>
          </div>
          <FirebaseTest />
        </div>
      </main>
      <Footer />
    </div>
  )
}
