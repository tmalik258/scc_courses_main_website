"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PaymentMethodModal } from "./payment-method-modal"

export function PaymentSummary() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method)
    // You can add logic here to handle the selected payment method
    console.log("Selected payment method:", method)
  }

  return (
    <>
      <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Payment Summary</h2>

        {/* Pricing Details */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Course Price (Normal)</span>
            <span className="text-gray-800">₹ 1350</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Course Price (Discount)</span>
            <span className="text-gray-800">₹ 1336</span>
          </div>
        </div>

        {/* Choose Payment Method Button */}
        <Button
          onClick={() => setIsPaymentModalOpen(true)}
          className="w-full bg-aqua-mist hover:bg-aqua-depth text-white py-3"
        >
          {selectedPaymentMethod ? `Selected: ${selectedPaymentMethod}` : "Choose Payment Method"}
        </Button>

        {/* Summary Calculations */}
        <div className="space-y-3 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-800">₹ 1336</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">VAT (11%)</span>
            <span className="text-gray-800">₹ 5.34</span>
          </div>
          <div className="flex justify-between items-center font-semibold text-lg border-t border-gray-200 pt-3">
            <span className="text-gray-800">Total</span>
            <span className="text-gray-800">₹ 1,341</span>
          </div>
        </div>

        {/* Pay Now Button */}
        <Button
          className="w-full bg-aqua-mist hover:bg-aqua-depth text-white py-3 text-lg"
          disabled={!selectedPaymentMethod}
        >
          Pay Now
        </Button>
      </div>

      {/* Payment Method Modal */}
      <PaymentMethodModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onNext={handlePaymentMethodSelect}
      />
    </>
  )
}
