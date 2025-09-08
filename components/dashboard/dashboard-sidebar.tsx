"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Cloud, TrendingUp, Eye, Leaf, DollarSign, Home, X } from "lucide-react"

const navigationItems = [
  { id: "overview", label: "Dashboard Overview", icon: Home, href: "/dashboard" },
  { id: "climate", label: "Climate Prediction", icon: Cloud, href: "/dashboard/climate" },
  { id: "yield", label: "Yield Prediction", icon: TrendingUp, href: "/dashboard/yield" },
  { id: "plant", label: "Plant Detection", icon: Eye, href: "/dashboard/plant" },
  { id: "carbon", label: "Carbon Analytics", icon: Leaf, href: "/dashboard/carbon" },
  { id: "price", label: "Price Prediction", icon: DollarSign, href: "/dashboard/price" },
]

interface DashboardSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={onClose} />}

      <div
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 transform bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            <h2 className="text-lg font-semibold text-sidebar-foreground">AgriDashboard</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => onClose()}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </>
  )
}
