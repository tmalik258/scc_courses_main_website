"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface PaymentMethodModalProps {
  isOpen: boolean
  onClose: () => void
  onNext: (selectedMethod: string) => void
}

export function PaymentMethodModal({ isOpen, onClose, onNext }: PaymentMethodModalProps) {
  const [selectedMethod, setSelectedMethod] = useState("")

  const paymentMethods = [
    {
      category: "Kode QR",
      options: [
        {
          id: "qris",
          name: "QRIS",
          icon: "🏦", // You can replace with actual QRIS logo
        },
      ],
    },
    {
      category: "Dompet Digital / E-wallet",
      options: [
        {
          id: "dana",
          name: "Dana",
          icon: "💙", // You can replace with actual Dana logo
        },
        {
          id: "gopay",
          name: "Gopay",
          icon: "🟢", // You can replace with actual Gopay logo
        },
        {
          id: "linkaja",
          name: "LinkAja",
          icon: "🔴", // You can replace with actual LinkAja logo
        },
        {
          id: "shopeepay",
          name: "Shopeepay",
          icon: "🟠", // You can replace with actual Shopeepay logo
        },
        {
          id: "ovo",
          name: "OVO",
          icon: "🟣", // You can replace with actual OVO logo
        },
      ],
    },
  ]

  const handleNext = () => {
    if (selectedMethod) {
      onNext(selectedMethod)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">Choose Payment Method</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {paymentMethods.map((category) => (
            <div key={category.category} className="space-y-4">
              <h3 className="text-sm font-medium text-gray-600">{category.category}</h3>
              <div className="space-y-3">
                {category.options.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50"
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={option.id}
                      checked={selectedMethod === option.id}
                      onChange={(e) => setSelectedMethod(e.target.value)}
                      className="w-4 h-4 text-aqua-mist border-gray-300 focus:ring-aqua-mist"
                    />
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{option.icon}</span>
                      <span className="text-gray-800">{option.name}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={handleNext}
            disabled={!selectedMethod}
            className="bg-aqua-mist hover:bg-aqua-depth text-white px-8 py-2"
          >
            Next
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
