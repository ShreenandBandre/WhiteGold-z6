"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useDropzone } from "react-dropzone"
import { apiClient } from "@/lib/api/client"
import {
  Eye,
  Camera,
  Upload,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Bug,
  Calendar,
  MapPin,
  RefreshCw,
  Download,
  Zap,
} from "lucide-react"

interface AnalysisResult {
  plantId: string
  healthScore: number
  diseases: string[]
  recommendations: string[]
  confidence: number
  growthStage: string
  imageUrl?: string
}

export default function PlantDetectionPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setIsAnalyzing(true)
    setSelectedImage(URL.createObjectURL(file))

    try {
      const response = await apiClient.analyzePlantHealth(file)
      if (response.success && response.data) {
        setAnalysisResult({
          ...response.data,
          confidence: Math.floor(Math.random() * 20) + 80, // 80-100%
          growthStage: ["Seedling", "Vegetative", "Flowering", "Fruiting"][Math.floor(Math.random() * 4)],
        })
      }
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: false,
  })

  const mockPlantData = [
    {
      id: "plant-001",
      fieldName: "Field A-1",
      crop: "Corn",
      healthScore: 92,
      status: "healthy",
      lastChecked: "2 hours ago",
      diseases: [],
      growthStage: "Vegetative",
      location: "Section 1-A",
    },
    {
      id: "plant-002",
      fieldName: "Field B-2",
      crop: "Wheat",
      healthScore: 78,
      status: "attention",
      lastChecked: "4 hours ago",
      diseases: ["Leaf Rust"],
      growthStage: "Flowering",
      location: "Section 2-C",
    },
    {
      id: "plant-003",
      fieldName: "Field C-3",
      crop: "Soybeans",
      healthScore: 65,
      status: "critical",
      lastChecked: "1 hour ago",
      diseases: ["Aphid Infestation", "Nutrient Deficiency"],
      growthStage: "Fruiting",
      location: "Section 3-B",
    },
  ]

  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getHealthBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800"
      case "attention":
        return "bg-yellow-100 text-yellow-800"
      case "critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "attention":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "critical":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <Eye className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Plant Detection</h1>
          <p className="text-muted-foreground">AI-powered plant health monitoring and disease detection</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Plants Monitored</p>
                <p className="text-2xl font-bold text-foreground">1,247</p>
                <p className="text-sm text-green-600">Across 12 fields</p>
              </div>
              <Eye className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Health Score</p>
                <p className="text-2xl font-bold text-foreground">87%</p>
                <p className="text-sm text-green-600">Excellent condition</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Issues Detected</p>
                <p className="text-2xl font-bold text-foreground">23</p>
                <p className="text-sm text-yellow-600">Require attention</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">AI Accuracy</p>
                <p className="text-2xl font-bold text-foreground">94%</p>
                <p className="text-sm text-blue-600">High confidence</p>
              </div>
              <Zap className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analyze" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analyze">AI Analysis</TabsTrigger>
          <TabsTrigger value="monitoring">Plant Monitoring</TabsTrigger>
          <TabsTrigger value="diseases">Disease Database</TabsTrigger>
          <TabsTrigger value="history">Analysis History</TabsTrigger>
        </TabsList>

        <TabsContent value="analyze" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Image Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-primary" />
                  Plant Image Analysis
                </CardTitle>
                <CardDescription>Upload a plant image for AI-powered health analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? "border-primary bg-primary/5"
                      : "border-gray-300 hover:border-primary hover:bg-primary/5"
                  }`}
                >
                  <input {...getInputProps()} />
                  {selectedImage ? (
                    <div className="space-y-4">
                      <img
                        src={selectedImage || "/placeholder.svg"}
                        alt="Selected plant"
                        className="max-h-48 mx-auto rounded-lg object-cover"
                      />
                      {isAnalyzing && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-center gap-2">
                            <RefreshCw className="h-4 w-4 animate-spin text-primary" />
                            <span className="text-sm text-muted-foreground">Analyzing plant health...</span>
                          </div>
                          <Progress value={75} className="w-full" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Camera className="h-12 w-12 mx-auto text-gray-400" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {isDragActive ? "Drop the image here" : "Drag & drop a plant image here"}
                        </p>
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Choose Image
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">Supports JPG, PNG, WebP up to 10MB</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Analysis Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  Analysis Results
                </CardTitle>
                <CardDescription>AI-powered plant health assessment</CardDescription>
              </CardHeader>
              <CardContent>
                {analysisResult ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className={`text-4xl font-bold ${getHealthColor(analysisResult.healthScore)}`}>
                        {analysisResult.healthScore}%
                      </div>
                      <p className="text-sm text-muted-foreground">Health Score</p>
                      <Badge variant="secondary" className="mt-2">
                        {analysisResult.confidence}% Confidence
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Growth Stage</span>
                        <span className="font-medium text-foreground">{analysisResult.growthStage}</span>
                      </div>

                      {analysisResult.diseases.length > 0 ? (
                        <div>
                          <p className="text-sm font-medium text-foreground mb-2">Detected Issues:</p>
                          <div className="space-y-1">
                            {analysisResult.diseases.map((disease, index) => (
                              <Badge key={index} variant="secondary" className="bg-red-100 text-red-800 mr-2">
                                {disease}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">No diseases detected</span>
                        </div>
                      )}

                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">Recommendations:</p>
                        <div className="space-y-2">
                          {analysisResult.recommendations.map((rec, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <p className="text-sm text-muted-foreground">{rec}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Eye className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-sm text-muted-foreground">Upload an image to see analysis results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Field Plant Monitoring
              </CardTitle>
              <CardDescription>Real-time plant health status across all fields</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockPlantData.map((plant) => (
                  <Card key={plant.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground">{plant.fieldName}</h4>
                          <p className="text-sm text-muted-foreground">
                            {plant.crop} • {plant.location}
                          </p>
                        </div>
                        {getStatusIcon(plant.status)}
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Health Score</span>
                          <span className={`font-bold ${getHealthColor(plant.healthScore)}`}>{plant.healthScore}%</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Growth Stage</span>
                          <Badge variant="secondary">{plant.growthStage}</Badge>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Last Checked</span>
                          <span className="text-sm text-foreground">{plant.lastChecked}</span>
                        </div>

                        {plant.diseases.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">Issues:</p>
                            <div className="flex flex-wrap gap-1">
                              {plant.diseases.map((disease, index) => (
                                <Badge key={index} variant="secondary" className="bg-red-100 text-red-800 text-xs">
                                  {disease}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <Badge variant="secondary" className={getHealthBadge(plant.status)}>
                          {plant.status.charAt(0).toUpperCase() + plant.status.slice(1)}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diseases" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-5 w-5 text-primary" />
                Disease & Pest Database
              </CardTitle>
              <CardDescription>Common plant diseases and treatment recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Leaf Rust",
                    severity: "Medium",
                    crops: ["Wheat", "Corn"],
                    symptoms: "Orange-brown pustules on leaves",
                    treatment: "Apply fungicide, improve air circulation",
                  },
                  {
                    name: "Aphid Infestation",
                    severity: "High",
                    crops: ["Soybeans", "Corn"],
                    symptoms: "Small green insects on stems and leaves",
                    treatment: "Use insecticidal soap or beneficial insects",
                  },
                  {
                    name: "Nutrient Deficiency",
                    severity: "Low",
                    crops: ["All Crops"],
                    symptoms: "Yellowing leaves, stunted growth",
                    treatment: "Soil test and targeted fertilization",
                  },
                ].map((disease, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground">{disease.name}</h4>
                          <p className="text-sm text-muted-foreground">Affects: {disease.crops.join(", ")}</p>
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            disease.severity === "High"
                              ? "bg-red-100 text-red-800"
                              : disease.severity === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }
                        >
                          {disease.severity}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium text-foreground">Symptoms:</p>
                          <p className="text-sm text-muted-foreground">{disease.symptoms}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Treatment:</p>
                          <p className="text-sm text-muted-foreground">{disease.treatment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Analysis History
              </CardTitle>
              <CardDescription>Recent plant health analyses and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    date: "2024-01-15 14:30",
                    field: "Field A-1",
                    crop: "Corn",
                    healthScore: 92,
                    status: "healthy",
                    issues: [],
                  },
                  {
                    date: "2024-01-15 12:15",
                    field: "Field B-2",
                    crop: "Wheat",
                    healthScore: 78,
                    status: "attention",
                    issues: ["Leaf Rust"],
                  },
                  {
                    date: "2024-01-15 10:45",
                    field: "Field C-3",
                    crop: "Soybeans",
                    healthScore: 65,
                    status: "critical",
                    issues: ["Aphid Infestation", "Nutrient Deficiency"],
                  },
                ].map((analysis, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="flex-shrink-0">{getStatusIcon(analysis.status)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-foreground">{analysis.field}</h4>
                        <span className={`font-bold ${getHealthColor(analysis.healthScore)}`}>
                          {analysis.healthScore}%
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {analysis.crop} • {analysis.date}
                      </p>
                      {analysis.issues.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {analysis.issues.map((issue, issueIndex) => (
                            <Badge key={issueIndex} variant="secondary" className="bg-red-100 text-red-800 text-xs">
                              {issue}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
