"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { OverviewSection } from "@/components/dashboard/overview-section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Cloud,
  TrendingUp,
  Eye,
  Leaf,
  DollarSign,
  Home,
  Droplets,
  Wind,
  Sun,
  BarChart3,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Camera,
  Upload,
  AlertTriangle,
  Shield,
  Zap,
  Target,
} from "lucide-react"

const navigationItems = [
  { id: "overview", label: "Dashboard Overview", icon: Home },
  { id: "climate", label: "Climate Prediction", icon: Cloud },
  { id: "yield", label: "Yield Prediction", icon: TrendingUp },
  { id: "plant", label: "Plant Detection", icon: Eye },
  { id: "carbon", label: "Carbon Analytics", icon: Leaf },
  { id: "price", label: "Price Prediction", icon: DollarSign },
]

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("overview")

  const currentSection = navigationItems.find((item) => item.id === activeSection)

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection />

      case "climate":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-primary" />
                  Climate Pattern Prediction
                </CardTitle>
                <CardDescription>
                  AI-powered weather forecasting and climate analysis for optimal farming decisions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Today</p>
                          <p className="text-2xl font-bold">22°C</p>
                          <p className="text-sm text-muted-foreground">Partly Cloudy</p>
                        </div>
                        <Sun className="h-8 w-8 text-yellow-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Humidity</p>
                          <p className="text-2xl font-bold">65%</p>
                          <p className="text-sm text-green-600">Optimal</p>
                        </div>
                        <Droplets className="h-8 w-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Wind Speed</p>
                          <p className="text-2xl font-bold">12 km/h</p>
                          <p className="text-sm text-muted-foreground">Light Breeze</p>
                        </div>
                        <Wind className="h-8 w-8 text-gray-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">7-Day Forecast</h3>
                  <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                      <Card key={day} className="text-center">
                        <CardContent className="p-3">
                          <p className="text-sm font-medium">{day}</p>
                          <Sun className="h-6 w-6 mx-auto my-2 text-yellow-500" />
                          <p className="text-sm">24°/18°</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "yield":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Yield Prediction Models
                </CardTitle>
                <CardDescription>
                  Advanced ML models predicting crop yields based on weather, soil, and planting patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Field A-1 (Corn)</h4>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Excellent
                        </Badge>
                      </div>
                      <p className="text-2xl font-bold text-green-600">8.5 T/ha</p>
                      <p className="text-sm text-muted-foreground">Expected yield</p>
                      <div className="flex items-center mt-2">
                        <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-600">+15% vs last year</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Field B-2 (Wheat)</h4>
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          Good
                        </Badge>
                      </div>
                      <p className="text-2xl font-bold text-yellow-600">6.2 T/ha</p>
                      <p className="text-sm text-muted-foreground">Expected yield</p>
                      <div className="flex items-center mt-2">
                        <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-600">+8% vs last year</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Field C-3 (Soybeans)</h4>
                        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                          Fair
                        </Badge>
                      </div>
                      <p className="text-2xl font-bold text-orange-600">3.8 T/ha</p>
                      <p className="text-sm text-muted-foreground">Expected yield</p>
                      <div className="flex items-center mt-2">
                        <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                        <span className="text-sm text-red-600">-5% vs last year</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Yield Factors Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Weather Conditions</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                          </div>
                          <span className="text-sm font-medium">85%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Soil Quality</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                          </div>
                          <span className="text-sm font-medium">78%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Irrigation Efficiency</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                          </div>
                          <span className="text-sm font-medium">65%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Pest Management</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                          </div>
                          <span className="text-sm font-medium">92%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        )

      case "plant":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  Plant Detection & Health Analysis
                </CardTitle>
                <CardDescription>AI-powered plant health monitoring and disease detection system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Upload Plant Image</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Camera className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-sm text-muted-foreground mb-4">
                          Upload an image of your plant for AI analysis
                        </p>
                        <Button>
                          <Upload className="h-4 w-4 mr-2" />
                          Choose Image
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium text-green-900">Healthy Corn Plant</p>
                            <p className="text-sm text-green-700">Field A-1 • 2 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                          <AlertTriangle className="h-5 w-5 text-yellow-600" />
                          <div>
                            <p className="font-medium text-yellow-900">Nutrient Deficiency</p>
                            <p className="text-sm text-yellow-700">Field B-2 • 4 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                          <div>
                            <p className="font-medium text-red-900">Pest Damage Detected</p>
                            <p className="text-sm text-red-700">Field C-3 • 6 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Plant Health Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">87%</div>
                        <p className="text-sm text-muted-foreground">Healthy Plants</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-600">10%</div>
                        <p className="text-sm text-muted-foreground">Need Attention</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-red-600">3%</div>
                        <p className="text-sm text-muted-foreground">Critical Issues</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        )

      case "carbon":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  Carbon Footprint Analytics
                </CardTitle>
                <CardDescription>
                  Track and optimize your farm's environmental impact with sustainable practices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Carbon Emissions</p>
                          <p className="text-2xl font-bold">2.4 tCO₂</p>
                          <p className="text-sm text-green-600">-15% this month</p>
                        </div>
                        <Leaf className="h-8 w-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Carbon Sequestered</p>
                          <p className="text-2xl font-bold">1.8 tCO₂</p>
                          <p className="text-sm text-green-600">+8% this month</p>
                        </div>
                        <Shield className="h-8 w-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Sustainability Score</p>
                          <p className="text-2xl font-bold">8.2/10</p>
                          <p className="text-sm text-green-600">Excellent</p>
                        </div>
                        <Target className="h-8 w-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Sustainability Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-green-900">Cover Crop Implementation</p>
                          <p className="text-sm text-green-700">
                            Plant cover crops in Field B-2 to improve soil health and carbon sequestration.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-blue-900">Renewable Energy Opportunity</p>
                          <p className="text-sm text-blue-700">
                            Consider solar panels for irrigation systems to reduce carbon footprint by 30%.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-yellow-900">Fertilizer Optimization</p>
                          <p className="text-sm text-yellow-700">
                            Reduce nitrogen fertilizer usage by 10% using precision application techniques.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        )

      case "price":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Price Prediction & Market Analysis
                </CardTitle>
                <CardDescription>AI-powered commodity price forecasting and market trend analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Corn Price</p>
                          <p className="text-2xl font-bold">$6.45</p>
                          <p className="text-sm text-green-600">+2.3% today</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Wheat Price</p>
                          <p className="text-2xl font-bold">$8.12</p>
                          <p className="text-sm text-red-600">-1.2% today</p>
                        </div>
                        <ArrowDown className="h-8 w-8 text-red-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Soybean Price</p>
                          <p className="text-2xl font-bold">$14.67</p>
                          <p className="text-sm text-green-600">+0.8% today</p>
                        </div>
                        <ArrowUp className="h-8 w-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Market Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-green-900">Corn Market Outlook</p>
                          <p className="text-sm text-green-700">
                            Strong demand and favorable weather conditions suggest 5-8% price increase over next 30
                            days.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-yellow-900">Wheat Price Volatility</p>
                          <p className="text-sm text-yellow-700">
                            Global supply concerns may cause price fluctuations. Consider hedging strategies.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <BarChart3 className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-blue-900">Optimal Selling Window</p>
                          <p className="text-sm text-blue-700">
                            AI models suggest selling 40% of corn inventory within next 2 weeks for maximum profit.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return <OverviewSection />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <div className={`transition-all duration-300 ease-in-out ${sidebarOpen ? "lg:ml-64" : "lg:ml-64"}`}>
        <Header onMenuClick={() => setSidebarOpen(true)} title={currentSection?.label || "Dashboard"} />

        <main className="p-4 md:p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
