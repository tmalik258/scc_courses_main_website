"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PaymentMethodModal } from "./payment-method-modal";
import { usePaymentSummary } from "@/hooks/use-payment-summary";
import { purchaseCourse } from "@/actions/purchase-course";
import toast from "react-hot-toast";
import { DashedSpinner } from "@/components/dashed-spinner";

export function PaymentSummary() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const { data, loading, error, refetch } = usePaymentSummary(courseId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [method, setMethod] = useState("");
  const [isPaying, setIsPaying] = useState(false);

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);

  const handlePurchase = async () => {
    if (!data?.courseId || !method) {
      toast.error("Please select a payment method");
      return;
    }
    console.log(`[PaymentSummary ${courseId}] Initiating purchase:`, {
      courseId: data.courseId,
      paymentMethod: method,
    });
    try {
      setIsPaying(true);
      await purchaseCourse(data.courseId, method);
      toast.success("Course purchased successfully!");
      await refetch();
      console.log(
        `[PaymentSummary ${courseId}] Navigating to success page: /courses/${courseId}/payment/success`
      );
      router.push(`/courses/${courseId}/payment/success`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(
        `[PaymentSummary ${courseId}] Purchase failed:`,
        err.message,
        err.stack
      );
      toast.error(err.message || "Something went wrong!");
      console.log(
        `[PaymentSummary ${courseId}] Navigating to fail page: /courses/${courseId}/payment/fail`
      );
      router.push(`/courses/${courseId}/payment/fail`);
    } finally {
      setIsPaying(false);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-48 text-gray-500">
        <DashedSpinner size={24} /> Loading...
      </div>
    );
  if (error) return <div className="text-red-600">{error}</div>;
  if (!data) return <div>No data available</div>;

  return (
    <>
      <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
        <h2 className="md:text-xl font-semibold text-gray-800">
          Payment Summary
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Course</span>
            <span className="text-gray-800">{data.title}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Original Price</span>
            <span className="text-gray-800">{formatPrice(data.price)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Discounted</span>
            <span className="text-gray-800">
              {formatPrice(data.discounted)}
            </span>
          </div>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-aqua-mist hover:bg-aqua-depth text-white py-3 max-md:text-sm"
        >
          {method ? `Selected: ${method}` : "Choose Payment Method"}
        </Button>

        <div className="space-y-3 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-800">
              {formatPrice(data.discounted)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">VAT (11%)</span>
            <span className="text-gray-800">{formatPrice(data.vat)}</span>
          </div>
          <div className="flex justify-between items-center font-semibold text-lg border-t border-gray-200 pt-3">
            <span className="text-gray-800">Total</span>
            <span className="text-gray-800">{formatPrice(data.total)}</span>
          </div>
        </div>

        <Button
          className="w-full bg-aqua-mist hover:bg-aqua-depth text-white py-3 text-sm md:text-lg"
          disabled={!method || isPaying}
          onClick={handlePurchase}
          title={!method ? "Please select a payment method" : undefined}
        >
          {isPaying ? "Processing..." : "Pay Now"}
        </Button>
      </div>

      <PaymentMethodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNext={setMethod}
      />
    </>
  );
}
