import { NextResponse } from "next/server"
import type { YieldPrediction } from "@/lib/api/types"

// Mock yield prediction data
const mockYieldData: YieldPrediction[] = [
  {
    cropType: "Wheat",
    fieldId: "field-001",
    predictedYield: 4.2,
    confidence: 0.85,
    factors: {
      weather: 0.8,
      soil: 0.9,
      irrigation: 0.85,
    },
    harvestDate: "2024-09-15",
  },
  {
    cropType: "Corn",
    fieldId: "field-002",
    predictedYield: 8.7,
    confidence: 0.92,
    factors: {
      weather: 0.95,
      soil: 0.88,
      irrigation: 0.93,
    },
    harvestDate: "2024-10-20",
  },
]

export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300))

    return NextResponse.json({
      success: true,
      data: mockYieldData,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch yield predictions" }, { status: 500 })
  }
}
