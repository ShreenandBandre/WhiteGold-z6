// Custom hooks for API data fetching with SWR

import useSWR from "swr"
import { apiClient } from "@/lib/api/client"

export function useWeatherData(location?: string) {
  return useSWR(["weather", location], () => apiClient.getWeatherData(location), {
    refreshInterval: 300000, // Refresh every 5 minutes
    revalidateOnFocus: false,
  })
}

export function useYieldPredictions(fieldId?: string) {
  return useSWR(["yield-predictions", fieldId], () => apiClient.getYieldPredictions(fieldId), {
    refreshInterval: 600000, // Refresh every 10 minutes
  })
}

export function useCarbonData(period = "month") {
  return useSWR(["carbon-data", period], () => apiClient.getCarbonData(period), {
    refreshInterval: 3600000, // Refresh every hour
  })
}

export function usePricePredictions(crop?: string) {
  return useSWR(["price-predictions", crop], () => apiClient.getPricePredictions(crop), {
    refreshInterval: 900000, // Refresh every 15 minutes
  })
}
