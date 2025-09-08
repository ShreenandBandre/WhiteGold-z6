"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useYieldPredictions } from "@/hooks/use-api"
import {
  TrendingUp,
  BarChart3,
  Calendar,
  MapPin,
  Droplets,
  Sun,
  Leaf,
  Target,
  DollarSign,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Download,
} from "lucide-react"

export default function YieldPredictionPage() {
  const [selectedField, setSelectedField] = useState("all")
  const [selectedCrop, setSelectedCrop] = useState("all")
  const {
    data: yieldData,
    isLoading,
    error,
    mutate,
  } = useYieldPredictions(selectedField !== "all" ? selectedField : undefined)

  const mockFieldData = [
    {
      id: "field-001",
      name: "Field A-1",
      crop: "Corn",
      area: "25 hectares",
      predictedYield: 8.5,
      confidence: 92,
      status: "excellent",
      harvestDate: "2024-09-15",
      factors: { weather: 95, soil: 88, irrigation: 93, pest: 90 },
      lastYearYield: 7.4,
      profitProjection: 42500,
    },
    {
      id: "field-002",
      name: "Field B-2",
      crop: "Wheat",
      area: "18 hectares",
      predictedYield: 6.2,
      confidence: 87,
      status: "good",
      harvestDate: "2024-08-20",
      factors: { weather: 85, soil: 82, irrigation: 78, pest: 95 },
      lastYearYield: 5.8,
      profitProjection: 28900,
    },
    {
      id: "field-003",
      name: "Field C-3",
      crop: "Soybeans",
      area: "22 hectares",
      predictedYield: 3.8,
      confidence: 78,
      status: "fair",
      harvestDate: "2024-10-05",
      factors: { weather: 75, soil: 70, irrigation: 65, pest: 85 },
      lastYearYield: 4.0,
      profitProjection: 18600,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "fair":
        return "bg-yellow-100 text-yellow-800"
      case "poor":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getYieldTrend = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100
    return {
      percentage: Math.abs(change).toFixed(1),
      isPositive: change > 0,
      icon: change > 0 ? ArrowUp : ArrowDown,
      color: change > 0 ? "text-green-600" : "text-red-600",
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Yield Prediction</h1>
          <p className="text-muted-foreground">ML-powered crop yield forecasting and optimization insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => mutate()} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <Select value={selectedField} onValueChange={setSelectedField}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select field" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Fields</SelectItem>
            <SelectItem value="field-001">Field A-1</SelectItem>
            <SelectItem value="field-002">Field B-2</SelectItem>
            <SelectItem value="field-003">Field C-3</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedCrop} onValueChange={setSelectedCrop}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select crop" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Crops</SelectItem>
            <SelectItem value="corn">Corn</SelectItem>
            <SelectItem value="wheat">Wheat</SelectItem>
            <SelectItem value="soybeans">Soybeans</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Fields</p>
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-sm text-green-600">65 hectares</p>
              </div>
              <MapPin className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Predicted Yield</p>
                <p className="text-2xl font-bold text-foreground">6.8 T/ha</p>
                <p className="text-sm text-green-600">+12% vs last year</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Confidence Score</p>
                <p className="text-2xl font-bold text-foreground">86%</p>
                <p className="text-sm text-blue-600">High accuracy</p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Projected Revenue</p>
                <p className="text-2xl font-bold text-foreground">$89.9K</p>
                <p className="text-sm text-green-600">+18% increase</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="predictions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="predictions">Field Predictions</TabsTrigger>
          <TabsTrigger value="factors">Yield Factors</TabsTrigger>
          <TabsTrigger value="historical">Historical Analysis</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {mockFieldData.map((field) => {
              const trend = getYieldTrend(field.predictedYield, field.lastYearYield)
              const TrendIcon = trend.icon

              return (
                <Card key={field.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{field.name}</CardTitle>
                      <Badge variant="secondary" className={getStatusColor(field.status)}>
                        {field.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      {field.crop} • {field.area}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-foreground">{field.predictedYield} T/ha</p>
                        <div className={`flex items-center justify-center gap-1 ${trend.color}`}>
                          <TrendIcon className="h-4 w-4" />
                          <span className="text-sm font-medium">{trend.percentage}% vs last year</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Confidence</span>
                          <span className="font-medium text-foreground">{field.confidence}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Harvest Date</span>
                          <span className="font-medium text-foreground">{field.harvestDate}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Projected Profit</span>
                          <span className="font-medium text-green-600">${field.profitProjection.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t">
                        <p className="text-sm font-medium text-foreground mb-2">Key Factors</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Weather</span>
                            <span className="font-medium">{field.factors.weather}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Soil</span>
                            <span className="font-medium">{field.factors.soil}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Irrigation</span>
                            <span className="font-medium">{field.factors.irrigation}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Pest Control</span>
                            <span className="font-medium">{field.factors.pest}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="factors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Yield Influencing Factors
              </CardTitle>
              <CardDescription>Analysis of factors affecting crop yield predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Environmental Factors</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-foreground">Weather Conditions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                        <span className="text-sm font-medium text-foreground">85%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Leaf className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-foreground">Soil Quality</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                        </div>
                        <span className="text-sm font-medium text-foreground">78%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-foreground">Water Availability</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                        <span className="text-sm font-medium text-foreground">65%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Management Factors</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-purple-500" />
                        <span className="text-sm text-foreground">Fertilization</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                        </div>
                        <span className="text-sm font-medium text-foreground">92%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-orange-500" />
                        <span className="text-sm text-foreground">Planting Schedule</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "88%" }}></div>
                        </div>
                        <span className="text-sm font-medium text-foreground">88%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-foreground">Pest Management</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "90%" }}></div>
                        </div>
                        <span className="text-sm font-medium text-foreground">90%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">AI Insights</h4>
                <p className="text-sm text-blue-700">
                  Weather conditions are the primary driver of yield variation this season. Optimizing irrigation
                  scheduling could improve overall yield by an estimated 8-12%. Consider implementing precision
                  irrigation systems in Fields B-2 and C-3.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Historical Yield Analysis
              </CardTitle>
              <CardDescription>5-year yield trends and performance comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">5-Year Average</p>
                    <p className="text-2xl font-bold text-foreground">6.1 T/ha</p>
                    <p className="text-sm text-muted-foreground">All crops combined</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">Best Year</p>
                    <p className="text-2xl font-bold text-green-600">7.8 T/ha</p>
                    <p className="text-sm text-muted-foreground">2022 season</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">Improvement</p>
                    <p className="text-2xl font-bold text-blue-600">+28%</p>
                    <p className="text-sm text-muted-foreground">Since 2019</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Yearly Performance by Crop</h4>
                <div className="space-y-3">
                  {["Corn", "Wheat", "Soybeans"].map((crop, index) => (
                    <div key={crop} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">{crop}</span>
                        <span className="text-sm text-muted-foreground">2019-2024</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${70 + index * 10}%` }}></div>
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {(6.5 + index * 0.8).toFixed(1)} T/ha avg
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Yield Optimization Recommendations
              </CardTitle>
              <CardDescription>AI-powered suggestions to maximize crop yields</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-900">Precision Fertilization</h4>
                      <p className="text-sm text-green-700 mb-2">
                        Implement variable-rate nitrogen application in Field B-2 based on soil test results.
                      </p>
                      <div className="flex items-center gap-4 text-xs text-green-600">
                        <span>Expected yield increase: +8%</span>
                        <span>ROI: 340%</span>
                        <span>Implementation cost: $1,200</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Droplets className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900">Irrigation Optimization</h4>
                      <p className="text-sm text-blue-700 mb-2">
                        Install soil moisture sensors in Field C-3 to optimize water usage and timing.
                      </p>
                      <div className="flex items-center gap-4 text-xs text-blue-600">
                        <span>Expected yield increase: +12%</span>
                        <span>Water savings: 25%</span>
                        <span>Implementation cost: $2,800</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-purple-900">Planting Schedule Adjustment</h4>
                      <p className="text-sm text-purple-700 mb-2">
                        Delay corn planting by 5-7 days to align with optimal soil temperature conditions.
                      </p>
                      <div className="flex items-center gap-4 text-xs text-purple-600">
                        <span>Expected yield increase: +5%</span>
                        <span>Risk reduction: 15%</span>
                        <span>Implementation cost: $0</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-start gap-3">
                    <Leaf className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-900">Cover Crop Integration</h4>
                      <p className="text-sm text-yellow-700 mb-2">
                        Plant winter cover crops to improve soil health and organic matter content.
                      </p>
                      <div className="flex items-center gap-4 text-xs text-yellow-600">
                        <span>Long-term yield increase: +15%</span>
                        <span>Soil health improvement: 30%</span>
                        <span>Implementation cost: $450/ha</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-semibold text-foreground mb-2">Implementation Priority</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">1. Irrigation Optimization (Field C-3)</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      High Impact
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">2. Precision Fertilization (Field B-2)</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Medium Impact
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">3. Planting Schedule Adjustment</span>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      Low Cost
                    </Badge>
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
