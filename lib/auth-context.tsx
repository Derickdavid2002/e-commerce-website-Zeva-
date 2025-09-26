// TODO: Connect Firebase here - Create authentication context with Firebase Auth
/*
"use client"

import React from "react"

import React from "react"

import React from "react"

import React from "react"

import React from "react"

import React from "react"

import React from "react"

import React from "react"

import React from "react"

import React from "react"

import React from "react"

import React from "react"

import React from "react"

import React from "react"

import React from "react"

import React from "react"

import React from "react"

import React from "react"

import React from "react"

import React from "react"

import React from "react"

import React from "react"

import React from "react"

import React from "react"

import React from "react"

import React from "react"

import React from "react"

import React from "react"

import React from "react"

import React from "react"

import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAdmin: false
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      
      if (user) {
        // Check if user is admin by checking Firestore
        // You can create an 'admins' collection with user UIDs
        try {
          import { db } from '@/lib/firebase'
          import { doc, getDoc } from 'firebase/firestore'
          
          const adminDoc = await getDoc(doc(db, 'admins', user.uid))
          setIsAdmin(adminDoc.exists())
        } catch (error) {
          console.error('Error checking admin status:', error)
          setIsAdmin(false)
        }
      } else {
        setIsAdmin(false)
      }
      
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
*/

// Placeholder for Firebase Auth context
console.log("🔥 TODO: Connect Firebase here - Create authentication context with Firebase Auth")

export const useAuth = () => ({
  user: null,
  isLoading: false,
  isAdmin: false,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
