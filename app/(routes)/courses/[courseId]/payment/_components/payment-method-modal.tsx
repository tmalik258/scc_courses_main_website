"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaPaypal } from "react-icons/fa";
import { SiRazorpay } from "react-icons/si";

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: (selectedMethod: string) => void;
}

export function PaymentMethodModal({
  isOpen,
  onClose,
  onNext,
}: PaymentMethodModalProps) {
  const [selectedMethod, setSelectedMethod] = useState("");

  const paymentMethods = [
    {
      category: "Payment Gateways",
      options: [
        {
          id: "PAYPAL",
          name: "PayPal",
          icon: <FaPaypal className="w-6 h-6 text-blue-600" />, // PayPal icon
        },
        {
          id: "RAZORPAY",
          name: "Razorpay",
          icon: <SiRazorpay className="w-6 h-6 text-blue-500" />, // Razorpay icon
        },
      ],
    },
  ];

  const handleNext = () => {
    if (selectedMethod && ["PAYPAL", "RAZORPAY"].includes(selectedMethod)) {
      onNext(selectedMethod);
      onClose();
    } else {
      alert("Please select a valid payment method");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Choose Payment Method
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {paymentMethods.map((category) => (
            <div key={category.category} className="space-y-4">
              <h3 className="text-sm font-medium text-gray-600">
                {category.category}
              </h3>
              <div className="space-y-3">
                {category.options.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 ${
                      selectedMethod === option.id
                        ? "bg-aqua-mist/10 border border-aqua-mist"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={option.id}
                      checked={selectedMethod === option.id}
                      onChange={(e) => setSelectedMethod(e.target.value)}
                      className="w-4 h-4 text-aqua-mist border-gray-300 focus:ring-aqua-mist"
                      aria-label={`Select ${option.name} payment method`}
                    />
                    <div className="flex items-center space-x-3">
                      {option.icon}
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
  );
}
