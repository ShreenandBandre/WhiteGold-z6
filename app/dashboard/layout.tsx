"use client"

import type React from "react"

import { useState } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Header } from "@/components/dashboard/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className={`transition-all duration-300 ease-in-out ${sidebarOpen ? "lg:ml-64" : "lg:ml-64"}`}>
          <Header onMenuClick={() => setSidebarOpen(true)} />

          <main className="p-4 md:p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
