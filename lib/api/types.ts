// API response types and interfaces for agricultural dashboard

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface WeatherData {
  temperature: number
  humidity: number
  precipitation: number
  windSpeed: number
  condition: string
  date: string
}

export interface ClimatePattern {
  id: string
  pattern: string
  confidence: number
  impact: "low" | "medium" | "high"
  recommendation: string
}

export interface YieldPrediction {
  cropType: string
  fieldId: string
  predictedYield: number
  confidence: number
  factors: {
    weather: number
    soil: number
    irrigation: number
  }
  harvestDate: string
}

export interface PlantHealth {
  plantId: string
  healthScore: number
  diseases: string[]
  recommendations: string[]
  imageUrl?: string
  lastChecked: string
}

export interface CarbonData {
  totalEmissions: number
  carbonOffset: number
  sustainabilityScore: number
  recommendations: string[]
  period: string
}

export interface PriceData {
  crop: string
  currentPrice: number
  predictedPrice: number
  trend: "up" | "down" | "stable"
  confidence: number
  marketFactors: string[]
}
