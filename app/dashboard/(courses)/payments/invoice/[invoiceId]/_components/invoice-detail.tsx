"use client";

import { Button } from "@/components/ui/button";
import { Download, CheckCircle } from "lucide-react";

interface InvoiceDetailProps {
  id: string;
  paymentDate: string;
  paymentMethod: string;
  totalPayment: string;
  category: string;
  product: string;
}

export function InvoiceDetail({
  id,
  paymentDate,
  paymentMethod,
  totalPayment,
  category,
  product,
}: InvoiceDetailProps) {
  const handleDownloadInvoice = () => {
    // Handle invoice download
    console.log("Downloading invoice for:", id);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Invoice</h1>
          <p className="text-gray-500">{id}</p>
        </div>
        <div className="flex items-center space-x-2 text-green-600">
          <CheckCircle className="w-4 h-4" />
          <span className="max-md:text-sm font-medium">Payment Success</span>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Payment Date
            </h3>
            <p className="text-gray-800">{paymentDate}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Payment Method
            </h3>
            <p className="text-gray-800">{paymentMethod}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Total Payment
            </h3>
            <p className="text-lg font-semibold text-gray-800">
              {totalPayment}
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Category</h3>
            <p className="text-gray-800">{category}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Product</h3>
            <p className="text-gray-800">{product}</p>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex md:justify-end">
        <Button
          onClick={handleDownloadInvoice}
          className="max-md:w-full bg-aqua-mist hover:bg-aqua-depth text-white flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Download Invoice</span>
        </Button>
      </div>
    </div>
  );
}
