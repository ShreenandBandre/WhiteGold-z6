"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWeatherData } from "@/hooks/use-api"
import {
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Thermometer,
  Eye,
  AlertTriangle,
  TrendingUp,
  Calendar,
  MapPin,
  RefreshCw,
} from "lucide-react"

export default function ClimatePredictionPage() {
  const [selectedLocation, setSelectedLocation] = useState("Farm Location")
  const { data: weatherData, isLoading, error, mutate } = useWeatherData(selectedLocation)

  const mockSeasonalData = [
    {
      season: "Spring 2024",
      avgTemp: "18°C",
      rainfall: "45mm",
      recommendation: "Optimal planting conditions expected",
      confidence: 92,
    },
    {
      season: "Summer 2024",
      avgTemp: "28°C",
      rainfall: "25mm",
      recommendation: "Increase irrigation planning",
      confidence: 87,
    },
    {
      season: "Fall 2024",
      avgTemp: "15°C",
      rainfall: "65mm",
      recommendation: "Perfect harvest conditions",
      confidence: 94,
    },
  ]

  const mockClimatePatterns = [
    {
      pattern: "La Niña Effect",
      impact: "Moderate",
      probability: 75,
      description: "Cooler temperatures and increased rainfall expected",
      recommendation: "Adjust planting schedule by 1-2 weeks",
    },
    {
      pattern: "Drought Risk",
      impact: "Low",
      probability: 25,
      description: "Below-average precipitation in next 3 months",
      recommendation: "Implement water conservation measures",
    },
  ]

  const getWeatherIcon = (condition: string) => {
    switch (condition?.toLowerCase()) {
      case "sunny":
        return <Sun className="h-8 w-8 text-yellow-500" />
      case "cloudy":
      case "partly cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />
      case "rainy":
        return <CloudRain className="h-8 w-8 text-blue-500" />
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Climate Prediction</h1>
          <p className="text-muted-foreground">AI-powered weather forecasting and climate analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => mutate()} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh Data
          </Button>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Report
          </Button>
        </div>
      </div>

      {/* Current Weather Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Temperature</p>
                <p className="text-2xl font-bold text-foreground">22°C</p>
                <p className="text-sm text-muted-foreground">Feels like 24°C</p>
              </div>
              <Thermometer className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Humidity</p>
                <p className="text-2xl font-bold text-foreground">65%</p>
                <p className="text-sm text-green-600">Optimal range</p>
              </div>
              <Droplets className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Wind Speed</p>
                <p className="text-2xl font-bold text-foreground">12 km/h</p>
                <p className="text-sm text-muted-foreground">Light breeze</p>
              </div>
              <Wind className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Visibility</p>
                <p className="text-2xl font-bold text-foreground">10 km</p>
                <p className="text-sm text-green-600">Excellent</p>
              </div>
              <Eye className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="forecast" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="forecast">7-Day Forecast</TabsTrigger>
          <TabsTrigger value="patterns">Climate Patterns</TabsTrigger>
          <TabsTrigger value="seasonal">Seasonal Analysis</TabsTrigger>
          <TabsTrigger value="alerts">Weather Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="forecast" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5 text-primary" />
                7-Day Weather Forecast
              </CardTitle>
              <CardDescription>Detailed weather predictions for optimal farm planning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                  <Card key={day} className="text-center">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium text-foreground mb-2">{day}</p>
                      {getWeatherIcon(index % 2 === 0 ? "sunny" : "partly cloudy")}
                      <div className="mt-2">
                        <p className="text-lg font-bold text-foreground">24°</p>
                        <p className="text-sm text-muted-foreground">18°</p>
                      </div>
                      <div className="flex items-center justify-center mt-2">
                        <Droplets className="h-3 w-3 text-blue-500 mr-1" />
                        <span className="text-xs text-muted-foreground">{index * 5}%</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Temperature Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Daily High</span>
                        <span className="font-medium text-foreground">24°C avg</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Daily Low</span>
                        <span className="font-medium text-foreground">18°C avg</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Growing Degree Days</span>
                        <span className="font-medium text-green-600">+15 this week</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Precipitation Forecast</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total Expected</span>
                        <span className="font-medium text-foreground">15mm</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Rainy Days</span>
                        <span className="font-medium text-foreground">2 days</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Irrigation Need</span>
                        <span className="font-medium text-yellow-600">Moderate</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Climate Pattern Analysis
              </CardTitle>
              <CardDescription>AI-detected climate patterns affecting your region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockClimatePatterns.map((pattern, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground">{pattern.pattern}</h4>
                          <p className="text-sm text-muted-foreground">{pattern.description}</p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant="secondary"
                            className={
                              pattern.impact === "High"
                                ? "bg-red-100 text-red-800"
                                : pattern.impact === "Moderate"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                            }
                          >
                            {pattern.impact} Impact
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">{pattern.probability}% probability</p>
                        </div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-900">
                          <strong>Recommendation:</strong> {pattern.recommendation}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seasonal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Seasonal Climate Analysis
              </CardTitle>
              <CardDescription>Long-term seasonal predictions and farming recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockSeasonalData.map((season, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="text-center mb-4">
                        <h4 className="font-semibold text-foreground">{season.season}</h4>
                        <div className="flex justify-center items-center gap-4 mt-2">
                          <div className="text-center">
                            <p className="text-lg font-bold text-foreground">{season.avgTemp}</p>
                            <p className="text-xs text-muted-foreground">Avg Temp</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-bold text-foreground">{season.rainfall}</p>
                            <p className="text-xs text-muted-foreground">Rainfall</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Confidence</span>
                          <span className="font-medium text-green-600">{season.confidence}%</span>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                          <p className="text-sm text-green-900">{season.recommendation}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                Weather Alerts & Warnings
              </CardTitle>
              <CardDescription>Critical weather conditions requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-yellow-900">High Wind Advisory</h4>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Active
                      </Badge>
                    </div>
                    <p className="text-sm text-yellow-700 mb-2">
                      Wind speeds up to 45 km/h expected tomorrow afternoon. Secure loose equipment and delay spraying
                      operations.
                    </p>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm text-yellow-700">Fields A-1, B-2, C-3</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <CloudRain className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-blue-900">Heavy Rain Forecast</h4>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        Upcoming
                      </Badge>
                    </div>
                    <p className="text-sm text-blue-700 mb-2">
                      25mm of rain expected over 48 hours starting Thursday. Adjust irrigation schedules and prepare
                      drainage systems.
                    </p>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-700">Thursday - Friday</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                  <Sun className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-green-900">Optimal Growing Conditions</h4>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Opportunity
                      </Badge>
                    </div>
                    <p className="text-sm text-green-700 mb-2">
                      Perfect temperature and humidity conditions for the next 5 days. Ideal time for planting and field
                      operations.
                    </p>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-700">Growth rate +15% expected</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
