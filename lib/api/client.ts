// API client utilities for making backend requests

import type { ApiResponse } from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: data.message || "An error occurred",
        }
      }

      return {
        success: true,
        data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Network error",
      }
    }
  }

  // Climate API methods
  async getWeatherData(location?: string) {
    return this.request("/climate/weather", {
      method: "GET",
      ...(location && {
        headers: { "X-Location": location },
      }),
    })
  }

  async getClimatePatterns() {
    return this.request("/climate/patterns")
  }

  // Yield prediction API methods
  async getYieldPredictions(fieldId?: string) {
    const endpoint = fieldId ? `/yield/predictions/${fieldId}` : "/yield/predictions"
    return this.request(endpoint)
  }

  async updateYieldFactors(fieldId: string, factors: any) {
    return this.request(`/yield/factors/${fieldId}`, {
      method: "PUT",
      body: JSON.stringify(factors),
    })
  }

  // Plant detection API methods
  async analyzePlantHealth(imageFile: File) {
    const formData = new FormData()
    formData.append("image", imageFile)

    return this.request("/plant/analyze", {
      method: "POST",
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    })
  }

  async getPlantHealthHistory(plantId: string) {
    return this.request(`/plant/history/${plantId}`)
  }

  // Carbon analytics API methods
  async getCarbonData(period = "month") {
    return this.request(`/carbon/analytics?period=${period}`)
  }

  async updateSustainabilityPractices(practices: any) {
    return this.request("/carbon/practices", {
      method: "POST",
      body: JSON.stringify(practices),
    })
  }

  // Price prediction API methods
  async getPricePredictions(crop?: string) {
    const endpoint = crop ? `/price/predictions/${crop}` : "/price/predictions"
    return this.request(endpoint)
  }

  async getMarketTrends() {
    return this.request("/price/trends")
  }
}

export const apiClient = new ApiClient()
