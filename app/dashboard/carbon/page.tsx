"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useCarbonData } from "@/hooks/use-api"
import {
  Leaf,
  Shield,
  Target,
  TrendingDown,
  TrendingUp,
  Zap,
  Droplets,
  Recycle,
  Sun,
  Wind,
  Award,
  RefreshCw,
  Download,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"

export default function CarbonAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const { data: carbonData, isLoading, error, mutate } = useCarbonData(selectedPeriod)

  const mockCarbonData = {
    totalEmissions: 2.4,
    carbonSequestered: 1.8,
    netCarbon: 0.6,
    sustainabilityScore: 8.2,
    monthlyTrend: -15,
    yearlyTrend: -22,
  }

  const mockPractices = [
    {
      id: 1,
      name: "Cover Crop Implementation",
      status: "active",
      impact: "High",
      carbonSaved: 0.8,
      description: "Winter cover crops in Fields A-1 and B-2",
      progress: 85,
    },
    {
      id: 2,
      name: "No-Till Farming",
      status: "active",
      impact: "Medium",
      carbonSaved: 0.5,
      description: "Reduced tillage across 40% of farmland",
      progress: 100,
    },
    {
      id: 3,
      name: "Precision Fertilization",
      status: "planned",
      impact: "Medium",
      carbonSaved: 0.3,
      description: "Variable-rate nitrogen application",
      progress: 25,
    },
    {
      id: 4,
      name: "Renewable Energy",
      status: "planned",
      impact: "High",
      carbonSaved: 1.2,
      description: "Solar panels for irrigation systems",
      progress: 10,
    },
  ]

  const mockCertifications = [
    {
      name: "Carbon Neutral Certified",
      status: "achieved",
      validUntil: "2025-12-31",
      progress: 100,
    },
    {
      name: "Sustainable Agriculture Standard",
      status: "in-progress",
      validUntil: "2024-06-30",
      progress: 75,
    },
    {
      name: "Organic Certification",
      status: "planned",
      validUntil: "2025-03-15",
      progress: 30,
    },
  ]

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-blue-100 text-blue-800"
      case "Low":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "achieved":
        return "bg-green-100 text-green-800"
      case "planned":
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Carbon Analytics</h1>
          <p className="text-muted-foreground">Track and optimize your farm's environmental impact</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="quarter">Quarter</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
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

      {/* Carbon Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Carbon Emissions</p>
                <p className="text-2xl font-bold text-foreground">{mockCarbonData.totalEmissions} tCO₂</p>
                <div className="flex items-center mt-1">
                  <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">{Math.abs(mockCarbonData.monthlyTrend)}% this month</span>
                </div>
              </div>
              <Leaf className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Carbon Sequestered</p>
                <p className="text-2xl font-bold text-foreground">{mockCarbonData.carbonSequestered} tCO₂</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+8% this month</span>
                </div>
              </div>
              <Shield className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Net Carbon Impact</p>
                <p className="text-2xl font-bold text-foreground">{mockCarbonData.netCarbon} tCO₂</p>
                <div className="flex items-center mt-1">
                  <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">Improving</span>
                </div>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sustainability Score</p>
                <p className="text-2xl font-bold text-foreground">{mockCarbonData.sustainabilityScore}/10</p>
                <div className="flex items-center mt-1">
                  <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">Excellent</span>
                </div>
              </div>
              <Award className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="practices">Green Practices</TabsTrigger>
          <TabsTrigger value="offsets">Carbon Offsets</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  Carbon Footprint Breakdown
                </CardTitle>
                <CardDescription>Sources of carbon emissions on your farm</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { source: "Fuel & Energy", amount: 1.2, percentage: 50, color: "bg-red-500" },
                    { source: "Fertilizers", amount: 0.8, percentage: 33, color: "bg-orange-500" },
                    { source: "Equipment", amount: 0.3, percentage: 12, color: "bg-yellow-500" },
                    { source: "Transportation", amount: 0.1, percentage: 5, color: "bg-blue-500" },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">{item.source}</span>
                        <span className="text-sm text-muted-foreground">{item.amount} tCO₂</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`${item.color} h-2 rounded-full`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Carbon Sequestration Sources
                </CardTitle>
                <CardDescription>How your farm captures and stores carbon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { source: "Cover Crops", amount: 0.9, percentage: 50, color: "bg-green-500" },
                    { source: "No-Till Practices", amount: 0.5, percentage: 28, color: "bg-emerald-500" },
                    { source: "Agroforestry", amount: 0.3, percentage: 17, color: "bg-teal-500" },
                    { source: "Composting", amount: 0.1, percentage: 5, color: "bg-lime-500" },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">{item.source}</span>
                        <span className="text-sm text-muted-foreground">{item.amount} tCO₂</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`${item.color} h-2 rounded-full`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-primary" />
                Carbon Reduction Timeline
              </CardTitle>
              <CardDescription>Your progress toward carbon neutrality</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Progress to Carbon Neutral</span>
                  <span className="text-sm text-muted-foreground">75% Complete</span>
                </div>
                <Progress value={75} className="w-full" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-lg font-bold text-green-600">2022</p>
                    <p className="text-sm text-green-700">Baseline Year</p>
                    <p className="text-xs text-green-600">3.2 tCO₂</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-lg font-bold text-blue-600">2024</p>
                    <p className="text-sm text-blue-700">Current Year</p>
                    <p className="text-xs text-blue-600">0.6 tCO₂</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-lg font-bold text-purple-600">2025</p>
                    <p className="text-sm text-purple-700">Target Year</p>
                    <p className="text-xs text-purple-600">0.0 tCO₂</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Recycle className="h-5 w-5 text-primary" />
                Sustainable Farming Practices
              </CardTitle>
              <CardDescription>Track and manage your green farming initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockPractices.map((practice) => (
                  <Card key={practice.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground">{practice.name}</h4>
                          <p className="text-sm text-muted-foreground">{practice.description}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className={getStatusColor(practice.status)}>
                            {practice.status}
                          </Badge>
                          <Badge variant="secondary" className={`${getImpactColor(practice.impact)} mt-1`}>
                            {practice.impact} Impact
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Progress</span>
                          <span className="text-sm font-medium text-foreground">{practice.progress}%</span>
                        </div>
                        <Progress value={practice.progress} className="w-full" />

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Carbon Saved</span>
                          <span className="text-sm font-medium text-green-600">{practice.carbonSaved} tCO₂/year</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offsets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Carbon Offset Opportunities
              </CardTitle>
              <CardDescription>Explore ways to offset your remaining carbon footprint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    type: "Reforestation",
                    icon: <Leaf className="h-8 w-8 text-green-500" />,
                    cost: "$25/tCO₂",
                    description: "Plant trees on unused farmland",
                    potential: "2.5 tCO₂/year",
                  },
                  {
                    type: "Renewable Energy",
                    icon: <Sun className="h-8 w-8 text-yellow-500" />,
                    cost: "$30/tCO₂",
                    description: "Solar panel installation",
                    potential: "1.8 tCO₂/year",
                  },
                  {
                    type: "Methane Capture",
                    icon: <Wind className="h-8 w-8 text-blue-500" />,
                    cost: "$20/tCO₂",
                    description: "Biogas from organic waste",
                    potential: "1.2 tCO₂/year",
                  },
                ].map((offset, index) => (
                  <Card key={index}>
                    <CardContent className="p-4 text-center">
                      <div className="mb-4">{offset.icon}</div>
                      <h4 className="font-semibold text-foreground mb-2">{offset.type}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{offset.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Cost</span>
                          <span className="text-sm font-medium text-foreground">{offset.cost}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Potential</span>
                          <span className="text-sm font-medium text-green-600">{offset.potential}</span>
                        </div>
                      </div>
                      <Button className="w-full mt-3 bg-transparent" variant="outline">
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Sustainability Certifications
              </CardTitle>
              <CardDescription>Track your progress toward environmental certifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCertifications.map((cert, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground">{cert.name}</h4>
                          <p className="text-sm text-muted-foreground">Valid until: {cert.validUntil}</p>
                        </div>
                        <Badge variant="secondary" className={getStatusColor(cert.status)}>
                          {cert.status}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Progress</span>
                          <span className="text-sm font-medium text-foreground">{cert.progress}%</span>
                        </div>
                        <Progress value={cert.progress} className="w-full" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                AI-Powered Sustainability Recommendations
              </CardTitle>
              <CardDescription>Personalized suggestions to reduce your carbon footprint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-900">Implement Precision Agriculture</h4>
                      <p className="text-sm text-green-700 mb-2">
                        Use GPS-guided equipment to reduce fuel consumption by 15% and fertilizer usage by 10%.
                      </p>
                      <div className="flex items-center gap-4 text-xs text-green-600">
                        <span>Carbon reduction: 0.4 tCO₂/year</span>
                        <span>Cost savings: $2,800/year</span>
                        <span>ROI: 280%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Droplets className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900">Optimize Irrigation Systems</h4>
                      <p className="text-sm text-blue-700 mb-2">
                        Install smart irrigation controllers to reduce water usage by 25% and energy consumption by 20%.
                      </p>
                      <div className="flex items-center gap-4 text-xs text-blue-600">
                        <span>Carbon reduction: 0.3 tCO₂/year</span>
                        <span>Water savings: 30%</span>
                        <span>Implementation cost: $3,500</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-start gap-3">
                    <Sun className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-purple-900">Solar Energy Integration</h4>
                      <p className="text-sm text-purple-700 mb-2">
                        Install solar panels to power irrigation systems and reduce grid electricity dependency by 60%.
                      </p>
                      <div className="flex items-center gap-4 text-xs text-purple-600">
                        <span>Carbon reduction: 1.2 tCO₂/year</span>
                        <span>Energy savings: 60%</span>
                        <span>Payback period: 4.5 years</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-900">Soil Health Improvement</h4>
                      <p className="text-sm text-yellow-700 mb-2">
                        Implement crop rotation and organic matter addition to increase soil carbon storage by 20%.
                      </p>
                      <div className="flex items-center gap-4 text-xs text-yellow-600">
                        <span>Carbon sequestration: +0.6 tCO₂/year</span>
                        <span>Soil health improvement: 25%</span>
                        <span>Long-term yield increase: 8%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-semibold text-foreground mb-2">Implementation Roadmap</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Phase 1: Precision Agriculture (0-6 months)</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      High Priority
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Phase 2: Irrigation Optimization (6-12 months)</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Medium Priority
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Phase 3: Solar Integration (12-18 months)</span>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      Long-term
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
