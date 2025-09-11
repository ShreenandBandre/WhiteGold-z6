"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import AgricultureNews from "@/components/dashboard/agri-news"
import {
  Cloud,
  TrendingUp,
  Leaf,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  BarChart3,
  Droplets,
  Thermometer,
  TreePine,
  ArrowRight,
  User,
} from "lucide-react"

const featureCards = [
  {
    title: "Climate Prediction",
    description: "AI-powered weather forecasting and climate analysis",
    icon: Cloud,
    href: "/dashboard/climate",
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
  },
  {
    title: "Yield Prediction",
    description: "ML-based crop yield forecasting and optimization",
    icon: TrendingUp,
    href: "/dashboard/yield",
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
  },
  {
    title: "Plant Health",
    description: "Disease detection and plant health monitoring",
    icon: TreePine,
    href: "/dashboard/plant",
    color: "bg-emerald-50 border-emerald-200",
    iconColor: "text-emerald-600",
  },
  {
    title: "Carbon Analytics",
    description: "Sustainability tracking and carbon footprint analysis",
    icon: Leaf,
    href: "/dashboard/carbon",
    color: "bg-teal-50 border-teal-200",
    iconColor: "text-teal-600",
  },
  {
    title: "Price Prediction",
    description: "Market analysis and commodity price forecasting",
    icon: DollarSign,
    href: "/dashboard/price",
    color: "bg-yellow-50 border-yellow-200",
    iconColor: "text-yellow-600",
  },
]

type NewsArticle = {
  title: string
  description: string
  source: { name: string }
  url: string
  publishedAt: string
}

export default function DashboardOverviewPage() {
  const userName = "Farmer John"
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          `https://newsapi.org/v2/everything?q=agriculture OR farming OR crops&language=en&sortBy=publishedAt&pageSize=5&apiKey=YOUR_NEWSAPI_KEY`,
        )
        const data = await res.json()
        if (data.articles) {
          setNews(data.articles)
        }
      } catch (error) {
        console.error("Error fetching news:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-2xl border">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Welcome back, {userName} 👋</h2>
          <p className="text-muted-foreground">Here's what's happening on your farm today</p>
        </div>
        <div className="hidden md:flex items-center justify-center h-12 w-12 rounded-full bg-green-200">
          <User className="h-6 w-6 text-green-800" />
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Fields */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Fields</p>
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +2 this season
                </p>
              </div>
              <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Avg Yield Prediction */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Yield Prediction</p>
                <p className="text-2xl font-bold text-foreground">7.2 T/ha</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +12% vs last year
                </p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Carbon Footprint */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Carbon Footprint</p>
                <p className="text-2xl font-bold text-foreground">2.4 tCO₂</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowDown className="h-3 w-3 mr-1" />
                  -15% reduction
                </p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <Leaf className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Price */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Market Price</p>
                <p className="text-2xl font-bold text-foreground">$245/T</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +5.2% this week
                </p>
              </div>
              <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Agricultural Intelligence Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featureCards.map((feature) => {
            const Icon = feature.icon
            return (
              <Link key={feature.href} href={feature.href}>
                <Card className={`${feature.color} hover:shadow-md transition-shadow cursor-pointer`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Icon className={`h-5 w-5 ${feature.iconColor}`} />
                          <h4 className="font-semibold text-foreground">{feature.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                        <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-primary/80">
                          Explore <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Quick Actions and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weather & Climate */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5 text-primary" />
              Weather & Climate Insights
            </CardTitle>
            <CardDescription>Current conditions and 7-day forecast</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Thermometer className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">Current Temperature</p>
                    <p className="text-sm text-blue-700">22°C - Optimal for growth</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Good
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Droplets className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Soil Moisture</p>
                    <p className="text-sm text-green-700">65% - Perfect levels</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Excellent
                </Badge>
              </div>

              <Link href="/dashboard/climate">
                <Button variant="outline" className="w-full bg-transparent">
                  View Detailed Forecast
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Recent Alerts & Actions
            </CardTitle>
            <CardDescription>Important notifications and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Alerts List */}
              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-900">Irrigation Needed</p>
                  <p className="text-sm text-yellow-700">Field B-2 requires watering within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900">Harvest Ready</p>
                  <p className="text-sm text-green-700">Field A-1 corn is ready for harvest</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <DollarSign className="h-4 w-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">Price Alert</p>
                  <p className="text-sm text-blue-700">Corn prices up 2.3% - consider selling</p>
                </div>
              </div>

              <Button variant="outline" className="w-full bg-transparent">
                View All Alerts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Insights / Agriculture News */}
      <Card>
        <AgricultureNews />
      </Card>
    </div>
  )
}
