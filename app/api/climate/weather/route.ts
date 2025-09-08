import { type NextRequest, NextResponse } from "next/server"
import type { WeatherData } from "@/lib/api/types"

// Mock weather data - replace with actual API integration
const mockWeatherData: WeatherData[] = [
  {
    temperature: 24,
    humidity: 65,
    precipitation: 0,
    windSpeed: 12,
    condition: "Sunny",
    date: new Date().toISOString(),
  },
  {
    temperature: 22,
    humidity: 70,
    precipitation: 5,
    windSpeed: 15,
    condition: "Partly Cloudy",
    date: new Date(Date.now() + 86400000).toISOString(),
  },
]

export async function GET(request: NextRequest) {
  try {
    const location = request.headers.get("X-Location") || "default"

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      data: mockWeatherData,
      location,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch weather data" }, { status: 500 })
  }
}
