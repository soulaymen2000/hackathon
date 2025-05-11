"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useRef } from "react"

export function DashboardCharts() {
  const salesChartRef = useRef<HTMLCanvasElement>(null)
  const inventoryChartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // This would normally use a charting library like Chart.js
    // For this example, we'll simulate the charts with a simple canvas drawing
    if (salesChartRef.current) {
      const ctx = salesChartRef.current.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, salesChartRef.current.width, salesChartRef.current.height)

        // Draw a simple line chart
        ctx.beginPath()
        ctx.moveTo(0, 100)
        ctx.lineTo(50, 80)
        ctx.lineTo(100, 90)
        ctx.lineTo(150, 60)
        ctx.lineTo(200, 40)
        ctx.lineTo(250, 30)
        ctx.lineTo(300, 20)
        ctx.strokeStyle = "#0ea5e9"
        ctx.lineWidth = 2
        ctx.stroke()
      }
    }

    if (inventoryChartRef.current) {
      const ctx = inventoryChartRef.current.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, inventoryChartRef.current.width, inventoryChartRef.current.height)

        // Draw a simple bar chart
        const barWidth = 30
        const spacing = 20
        const bars = [80, 60, 90, 50, 70]

        bars.forEach((height, index) => {
          const x = index * (barWidth + spacing) + spacing
          ctx.fillStyle = "#8b5cf6"
          ctx.fillRect(x, 100 - height, barWidth, height)
        })
      }
    }
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>Monthly sales performance</CardDescription>
        </CardHeader>
        <CardContent>
          <canvas ref={salesChartRef} width={400} height={120} className="w-full"></canvas>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Inventory Levels</CardTitle>
          <CardDescription>Stock levels by category</CardDescription>
        </CardHeader>
        <CardContent>
          <canvas ref={inventoryChartRef} width={400} height={120} className="w-full"></canvas>
        </CardContent>
      </Card>
    </div>
  )
}
