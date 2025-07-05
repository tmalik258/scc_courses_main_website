"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function PromoCode() {
  const [promoCode, setPromoCode] = useState("")

  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-600">Have a promo code?</label>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="flex-1"
        />
        <Button variant="outline" className="px-6 bg-transparent border-aqua-mist text-aqua-mist hover:bg-sky-50">
          Apply
        </Button>
      </div>
    </div>
  )
}
