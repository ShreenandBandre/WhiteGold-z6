"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cloud, TrendingUp, Eye, Leaf, DollarSign, Home, CheckCircle, Menu } from "lucide-react"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const navigationItems = [
  { id: "overview", label: "Dashboard Overview", icon: Home },
  { id: "climate", label: "Climate Prediction", icon: Cloud },
  { id: "yield", label: "Yield Prediction", icon: TrendingUp },
  { id: "plant", label: "Plant Detection", icon: Eye },
  { id: "carbon", label: "Carbon Analytics", icon: Leaf },
  { id: "price", label: "Price Prediction", icon: DollarSign },
]

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`
          h-full fixed top-0 left-0 z-50
          transition-all duration-300 ease-in-out
          bg-sidebar border-r border-sidebar-border
          ${isOpen ? "w-64" : "w-16"}
        `}
      >
        {/* Toggle button */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <Leaf className="h-6 w-6 text-primary" />
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="ml-auto">
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {isOpen && <span className="whitespace-nowrap">{item.label}</span>}
              </button>
            )
          })}
        </nav>

        {/* Bottom Card */}
        {isOpen && (
          <div className="absolute bottom-4 left-4 right-4">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <p className="text-xs font-medium text-foreground">Farm Status</p>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                  All Systems Operational
                </Badge>
              </CardContent>
            </Card>
          </div>
        )}
      </aside>

      {/* Content wrapper (pushes content aside) */}
      <main className={`transition-all duration-300 flex-1 ${isOpen ? "ml-64" : "ml-16"}`}>
        {/* Place your dashboard sections here */}
      </main>
    </div>
  )
}
