"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePricePredictions } from "@/hooks/use-api"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  AlertTriangle,
  Target,
  Calendar,
  Globe,
  RefreshCw,
  Download,
  Bell,
  ArrowUp,
  Minus,
} from "lucide-react"

export default function PricePredictionPage() {
  const [selectedCrop, setSelectedCrop] = useState("all")
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d")
  const {
    data: priceData,
    isLoading,
    error,
    mutate,
  } = usePricePredictions(selectedCrop !== "all" ? selectedCrop : undefined)

  const mockPriceData = [
    {
      crop: "Corn",
      currentPrice: 6.45,
      predictedPrice: 6.78,
      trend: "up" as const,
      confidence: 87,
      change24h: 2.3,
      change7d: 5.8,
      change30d: -1.2,
      volume: "2.4M bushels",
      marketCap: "15.6B",
      nextUpdate: "2024-01-16 09:00",
    },
    {
      crop: "Wheat",
      currentPrice: 8.12,
      predictedPrice: 7.95,
      trend: "down" as const,
      confidence: 82,
      change24h: -1.2,
      change7d: -3.4,
      change30d: 4.7,
      volume: "1.8M bushels",
      marketCap: "12.3B",
      nextUpdate: "2024-01-16 09:00",
    },
    {
      crop: "Soybeans",
      currentPrice: 14.67,
      predictedPrice: 14.85,
      trend: "stable" as const,
      confidence: 91,
      change24h: 0.8,
      change7d: 1.2,
      change30d: 8.3,
      volume: "3.1M bushels",
      marketCap: "18.9B",
      nextUpdate: "2024-01-16 09:00",
    },
  ]

  const mockMarketInsights = [
    {
      type: "bullish",
      title: "Corn Demand Surge Expected",
      description: "Export agreements with Asia driving 5-8% price increase over next 30 days",
      impact: "High",
      timeframe: "30 days",
      confidence: 85,
    },
    {
      type: "bearish",
      title: "Wheat Supply Increase",
      description: "Favorable weather conditions in major producing regions may pressure prices",
      impact: "Medium",
      timeframe: "45 days",
      confidence: 78,
    },
    {
      type: "neutral",
      title: "Soybean Market Stability",
      description: "Balanced supply-demand dynamics suggest steady prices with minor fluctuations",
      impact: "Low",
      timeframe: "60 days",
      confidence: 92,
    },
  ]

  const mockAlerts = [
    {
      id: 1,
      type: "price_target",
      crop: "Corn",
      message: "Corn price reached your target of $6.40/bushel",
      timestamp: "2 hours ago",
      action: "Consider selling 40% of inventory",
      priority: "high",
    },
    {
      id: 2,
      type: "market_news",
      crop: "Wheat",
      message: "USDA report shows 15% increase in wheat exports",
      timestamp: "4 hours ago",
      action: "Monitor price movements closely",
      priority: "medium",
    },
    {
      id: 3,
      type: "volatility",
      crop: "Soybeans",
      message: "High volatility detected in soybean futures",
      timestamp: "6 hours ago",
      action: "Consider hedging strategies",
      priority: "medium",
    },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      case "stable":
        return <Minus className="h-4 w-4 text-gray-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-600" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      case "stable":
        return "text-gray-600"
      default:
        return "text-gray-600"
    }
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-600"
    if (change < 0) return "text-red-600"
    return "text-gray-600"
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case "bullish":
        return "bg-green-50 border-green-200"
      case "bearish":
        return "bg-red-50 border-red-200"
      case "neutral":
        return "bg-blue-50 border-blue-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "bullish":
        return <TrendingUp className="h-5 w-5 text-green-600" />
      case "bearish":
        return <TrendingDown className="h-5 w-5 text-red-600" />
      case "neutral":
        return <BarChart3 className="h-5 w-5 text-blue-600" />
      default:
        return <BarChart3 className="h-5 w-5 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Price Prediction</h1>
          <p className="text-muted-foreground">AI-powered commodity price forecasting and market analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedCrop} onValueChange={setSelectedCrop}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Crops</SelectItem>
              <SelectItem value="corn">Corn</SelectItem>
              <SelectItem value="wheat">Wheat</SelectItem>
              <SelectItem value="soybeans">Soybeans</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">1D</SelectItem>
              <SelectItem value="7d">7D</SelectItem>
              <SelectItem value="30d">30D</SelectItem>
              <SelectItem value="90d">90D</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => mutate()} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Portfolio Value</p>
                <p className="text-2xl font-bold text-foreground">$127.4K</p>
                <div className="flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+3.2% today</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Best Performer</p>
                <p className="text-2xl font-bold text-foreground">Corn</p>
                <div className="flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+5.8% this week</span>
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold text-foreground">3</p>
                <div className="flex items-center mt-1">
                  <Bell className="h-3 w-3 text-yellow-500 mr-1" />
                  <span className="text-sm text-yellow-600">2 high priority</span>
                </div>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Market Sentiment</p>
                <p className="text-2xl font-bold text-foreground">Bullish</p>
                <div className="flex items-center mt-1">
                  <Target className="h-3 w-3 text-blue-500 mr-1" />
                  <span className="text-sm text-blue-600">85% confidence</span>
                </div>
              </div>
              <Globe className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="prices" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="prices">Live Prices</TabsTrigger>
          <TabsTrigger value="insights">Market Insights</TabsTrigger>
          <TabsTrigger value="alerts">Price Alerts</TabsTrigger>
          <TabsTrigger value="analysis">Technical Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="prices" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {mockPriceData.map((crop) => (
              <Card key={crop.crop}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{crop.crop}</CardTitle>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(crop.trend)}
                      <Badge variant="secondary" className={`${getTrendColor(crop.trend)} bg-transparent`}>
                        {crop.confidence}% confidence
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-foreground">${crop.currentPrice}</p>
                      <p className="text-sm text-muted-foreground">Current Price (per bushel)</p>
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <span className="text-sm text-muted-foreground">Predicted:</span>
                        <span className={`font-medium ${getTrendColor(crop.trend)}`}>${crop.predictedPrice}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className={`text-sm font-medium ${getChangeColor(crop.change24h)}`}>
                          {crop.change24h > 0 ? "+" : ""}
                          {crop.change24h}%
                        </p>
                        <p className="text-xs text-muted-foreground">24h</p>
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${getChangeColor(crop.change7d)}`}>
                          {crop.change7d > 0 ? "+" : ""}
                          {crop.change7d}%
                        </p>
                        <p className="text-xs text-muted-foreground">7d</p>
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${getChangeColor(crop.change30d)}`}>
                          {crop.change30d > 0 ? "+" : ""}
                          {crop.change30d}%
                        </p>
                        <p className="text-xs text-muted-foreground">30d</p>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Volume</span>
                        <span className="text-sm font-medium text-foreground">{crop.volume}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Market Cap</span>
                        <span className="text-sm font-medium text-foreground">${crop.marketCap}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Next Update</span>
                        <span className="text-sm font-medium text-foreground">{crop.nextUpdate}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-transparent" variant="outline">
                        Set Alert
                      </Button>
                      <Button size="sm" className="flex-1">
                        View Chart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Market Intelligence & Insights
              </CardTitle>
              <CardDescription>AI-powered market analysis and trading recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMarketInsights.map((insight, index) => (
                  <Card key={index} className={getInsightColor(insight.type)}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {getInsightIcon(insight.type)}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-foreground">{insight.title}</h4>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="secondary"
                                className={
                                  insight.impact === "High"
                                    ? "bg-red-100 text-red-800"
                                    : insight.impact === "Medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                                }
                              >
                                {insight.impact} Impact
                              </Badge>
                              <Badge variant="secondary">{insight.confidence}% confidence</Badge>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>Timeframe: {insight.timeframe}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Optimal Trading Strategy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-900">Recommended Action: SELL</span>
                      </div>
                      <p className="text-sm text-green-700">
                        Sell 40% of corn inventory within next 2 weeks to capitalize on expected price peak.
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-1">
                        <Target className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-900">Hold Strategy: WHEAT</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        Maintain wheat positions and monitor supply reports for potential buying opportunities.
                      </p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center gap-2 mb-1">
                        <BarChart3 className="h-4 w-4 text-purple-600" />
                        <span className="font-medium text-purple-900">Diversification: SOYBEANS</span>
                      </div>
                      <p className="text-sm text-purple-700">
                        Consider increasing soybean allocation by 15% due to stable market conditions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Price Alerts & Notifications
              </CardTitle>
              <CardDescription>Stay informed about important market movements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAlerts.map((alert) => (
                  <Card key={alert.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          <Bell className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-foreground">
                              {alert.crop} - {alert.type.replace("_", " ").toUpperCase()}
                            </h4>
                            <p className="text-sm text-muted-foreground">{alert.message}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className={getPriorityColor(alert.priority)}>
                            {alert.priority}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
                        </div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-900">
                          <strong>Recommended Action:</strong> {alert.action}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Set New Alert</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select crop" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="corn">Corn</SelectItem>
                        <SelectItem value="wheat">Wheat</SelectItem>
                        <SelectItem value="soybeans">Soybeans</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Alert type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="price_above">Price Above</SelectItem>
                        <SelectItem value="price_below">Price Below</SelectItem>
                        <SelectItem value="volatility">High Volatility</SelectItem>
                        <SelectItem value="volume">Volume Spike</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="bg-transparent" variant="outline">
                      Create Alert
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Technical Analysis & Forecasting
              </CardTitle>
              <CardDescription>Advanced price analysis and prediction models</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Price Forecast Models</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { model: "LSTM Neural Network", accuracy: 94, prediction: "$6.78", timeframe: "30 days" },
                        { model: "ARIMA Time Series", accuracy: 87, prediction: "$6.65", timeframe: "30 days" },
                        { model: "Random Forest", accuracy: 91, prediction: "$6.72", timeframe: "30 days" },
                        { model: "Ensemble Model", accuracy: 96, prediction: "$6.75", timeframe: "30 days" },
                      ].map((model, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-medium text-foreground">{model.model}</h4>
                            <p className="text-sm text-muted-foreground">Accuracy: {model.accuracy}%</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-foreground">{model.prediction}</p>
                            <p className="text-xs text-muted-foreground">{model.timeframe}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Market Indicators</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { indicator: "RSI (14)", value: "68.5", signal: "Neutral", color: "text-blue-600" },
                        { indicator: "MACD", value: "0.12", signal: "Bullish", color: "text-green-600" },
                        { indicator: "Bollinger Bands", value: "Upper", signal: "Overbought", color: "text-red-600" },
                        { indicator: "Moving Average (50)", value: "$6.32", signal: "Above", color: "text-green-600" },
                      ].map((indicator, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-medium text-foreground">{indicator.indicator}</h4>
                            <p className="text-sm text-muted-foreground">Value: {indicator.value}</p>
                          </div>
                          <Badge variant="secondary" className={`${indicator.color} bg-transparent`}>
                            {indicator.signal}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-2xl font-bold text-green-600">Low</p>
                      <p className="text-sm text-green-700">Market Risk</p>
                      <p className="text-xs text-green-600 mt-1">Stable conditions</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-2xl font-bold text-yellow-600">Medium</p>
                      <p className="text-sm text-yellow-700">Volatility Risk</p>
                      <p className="text-xs text-yellow-600 mt-1">Moderate swings</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-2xl font-bold text-blue-600">High</p>
                      <p className="text-sm text-blue-700">Opportunity Score</p>
                      <p className="text-xs text-blue-600 mt-1">Favorable conditions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
