"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

export function SpendHoursChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Week")

  const weekData = [
    { day: "S", hours: 3 },
    { day: "M", hours: 5 },
    { day: "T", hours: 7 },
    { day: "W", hours: 4 },
    { day: "T", hours: 6 },
    { day: "F", hours: 8 },
    { day: "S", hours: 9 },
  ]

  useEffect(() => {
    setSelectedPeriod("This Week")
  }, [])

  // const maxHours = Math.max(...weekData.map((d) => d.hours))

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Spend Hours</h3>
        <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800">
          <span>{selectedPeriod}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Chart */}
      <div className="relative h-48">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
          <span>9</span>
          <span>7</span>
          <span>5</span>
          <span>3</span>
          <span>1</span>
        </div>

        {/* Chart area */}
        <div className="ml-6 h-full relative">
          <svg className="w-full h-full" viewBox="0 0 280 180">
            {/* Grid lines */}
            {[1, 3, 5, 7, 9].map((hour) => (
              <line
                key={hour}
                x1="0"
                y1={180 - (hour / 9) * 180}
                x2="280"
                y2={180 - (hour / 9) * 180}
                stroke="#f3f4f6"
                strokeWidth="1"
              />
            ))}

            {/* Line chart */}
            <polyline
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              points={weekData.map((point, index) => `${(index * 280) / 6},${180 - (point.hours / 9) * 180}`).join(" ")}
            />

            {/* Data points */}
            {weekData.map((point, index) => (
              <circle key={index} cx={(index * 280) / 6} cy={180 - (point.hours / 9) * 180} r="4" fill="#3b82f6" />
            ))}
          </svg>
        </div>

        {/* X-axis labels */}
        <div className="absolute bottom-0 left-6 right-0 flex justify-between text-xs text-gray-500">
          {weekData.map((point, index) => (
            <span key={index}>{point.day}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
