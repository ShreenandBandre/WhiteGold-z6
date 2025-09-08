"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Cloud,
  TrendingUp,
  Eye,
  Leaf,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  BarChart3,
  Droplets,
  Thermometer,
} from "lucide-react"

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground">Comprehensive agricultural insights and AI-powered recommendations</p>
        </div>
        <Button>
          <BarChart3 className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Plant Health Score</p>
                <p className="text-2xl font-bold text-foreground">87%</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Excellent
                </p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Eye className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

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
      </div>

      {/* Quick Actions and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

              <Button variant="outline" className="w-full bg-transparent">
                View Detailed Forecast
              </Button>
            </div>
          </CardContent>
        </Card>

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

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            AI-Powered Recommendations
          </CardTitle>
          <CardDescription>Personalized insights based on your farm data and market conditions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Optimize Irrigation</h4>
              <p className="text-sm text-blue-700 mb-3">
                Reduce water usage by 15% using precision irrigation in Field C-3
              </p>
              <Button
                size="sm"
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-200 bg-transparent"
              >
                Learn More
              </Button>
            </div>

            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">Increase Yield</h4>
              <p className="text-sm text-green-700 mb-3">
                Apply nitrogen fertilizer to boost corn yield by estimated 8%
              </p>
              <Button
                size="sm"
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-200 bg-transparent"
              >
                View Details
              </Button>
            </div>

            <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">Market Timing</h4>
              <p className="text-sm text-purple-700 mb-3">
                Sell 40% of wheat inventory within 2 weeks for optimal profit
              </p>
              <Button
                size="sm"
                variant="outline"
                className="border-purple-300 text-purple-700 hover:bg-purple-200 bg-transparent"
              >
                Price Analysis
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
