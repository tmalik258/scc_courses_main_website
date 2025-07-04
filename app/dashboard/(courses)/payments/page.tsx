"use client"

import { useState } from "react"
import { PaymentCard } from "./_components/payment-card"

export default function PaymentPage() {
  const [activeTab, setActiveTab] = useState("All")

  const allPayments = [
    {
      id: "213SHAUDJ382713HS",
      title: "Machine Learning with Python: From Basics to Deployment",
      paymentDate: "Mar 15, 2025",
      method: "Credit Card",
      amount: "₹1,350",
      status: "success" as const,
      image: "/images/course_placeholder_2.jpg?height=120&width=200",
    },
    {
      id: "213SHAUDJ382714HS",
      title: "Machine Learning with Python: From Basics to Deployment",
      paymentDate: "Mar 15, 2025",
      method: "Credit Card",
      amount: "₹1,350",
      status: "success" as const,
      image: "/images/course_placeholder_2.jpg?height=120&width=200",
    },
    {
      id: "213SHAUDJ382715HS",
      title: "Machine Learning with Python: From Basics to Deployment",
      paymentDate: "Mar 15, 2025",
      method: "Credit Card",
      amount: "₹1,350",
      status: "failed" as const,
      reason: "Bad Internet Connection",
      image: "/images/course_placeholder_2.jpg?height=120&width=200",
    },
    {
      id: "213SHAUDJ382716HS",
      title: "Machine Learning with Python: From Basics to Deployment",
      paymentDate: "Mar 15, 2025",
      method: "Credit Card",
      amount: "₹1,350",
      status: "pending" as const,
      timeLeft: "23:57:55",
      image: "/images/course_placeholder_2.jpg?height=120&width=200",
    },
  ]

  const getFilteredPayments = () => {
    switch (activeTab) {
      case "Pending":
        return allPayments.filter((payment) => payment.status === "pending")
      case "Success":
        return allPayments.filter((payment) => payment.status === "success")
      case "Failed":
        return allPayments.filter((payment) => payment.status === "failed")
      default:
        return allPayments
    }
  }

  const filteredPayments = getFilteredPayments()

  return (
    <div>
      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="flex space-x-8 border-b border-gray-200">
          {["All", "Pending", "Success", "Failed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab
                  ? "border-sky-400 text-sky-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Payment List */}
      <div className="space-y-6">
        {filteredPayments.map((payment, index) => (
          <PaymentCard key={index} {...payment} />
        ))}
      </div>

      {/* Empty State */}
      {filteredPayments.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No {activeTab.toLowerCase()} payments</h3>
          <p className="text-gray-600">
            {activeTab === "Pending"
              ? "You don't have any pending payments."
              : activeTab === "Success"
                ? "You don't have any successful payments yet."
                : activeTab === "Failed"
                  ? "You don't have any failed payments."
                  : "You don't have any payment history yet."}
          </p>
        </div>
      )}
    </div>
  )
}
