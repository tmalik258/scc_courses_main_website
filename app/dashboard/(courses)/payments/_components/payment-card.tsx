"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";
import { useState, useEffect } from "react";
import { DashedSpinner } from "@/components/dashed-spinner";
import { fetchImage } from "@/utils/supabase/fetchImage";

interface PaymentCardProps {
  id: string;
  title: string;
  paymentDate: string;
  method: string;
  amount: string;
  status: "success" | "failed" | "pending";
  reason?: string;
  timeLeft?: string;
  image: string;
}

export function PaymentCard({
  id,
  title,
  paymentDate,
  method,
  amount,
  status,
  reason,
  timeLeft,
  image,
}: PaymentCardProps) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadImage = async () => {
      console.log(`[PaymentCard ${id}] Loading image:`, image);
      setImageLoading(true);
      try {
        if (image && image.trim() !== "") {
          const url = await fetchImage(image);
          console.log(`[PaymentCard ${id}] Image fetched successfully:`, url);
          setImageUrl(url);
        } else {
          console.warn(
            `[PaymentCard ${id}] No valid image provided, using placeholder`
          );
          setImageUrl("/images/course_placeholder.jpg");
        }
      } catch (err) {
        console.error(`[PaymentCard ${id}] Error fetching image:`, err);
        setImageUrl("/images/course_placeholder.jpg");
      } finally {
        setImageLoading(false);
      }
    };

    loadImage();
  }, [image, id]);

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "success":
        return "Success";
      case "failed":
        return "Failed";
      case "pending":
        return "Pending";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "text-green-600";
      case "failed":
        return "text-red-600";
      case "pending":
        return "text-yellow-600";
    }
  };

  const handleTransactionDetail = () => {
    router.push(`/dashboard/payments/invoice/${id}`);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-6">
      <div className="flex max-md:flex-col md:items-start max-md:gap-3 md:space-x-6">
        {/* Course Image */}
        <div className="flex-shrink-0">
          {imageLoading ? (
            <div className="w-32 md:w-64 h-40 md:h-48 flex items-center justify-center">
              <DashedSpinner size={24} />
            </div>
          ) : (
            <Image
              src={imageUrl || "/images/course_placeholder.jpg"}
              alt={title}
              width={256}
              height={192}
              decoding="async"
              className="w-32 md:w-64 h-40 md:h-48 object-cover rounded-lg"
              onError={() => {
                console.error(
                  `[PaymentCard ${id}] Image failed to load:`,
                  imageUrl
                );
                setImageUrl("/images/course_placeholder.jpg");
              }}
            />
          )}
        </div>

        {/* Payment Content */}
        <div className="flex-1">
          {/* Transaction ID and Status */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-500 text-sm">{id}</span>
            <div className={`flex items-center space-x-2 ${getStatusColor()}`}>
              {getStatusIcon()}
              <span className="text-sm font-medium">{getStatusText()}</span>
            </div>
          </div>

          {/* Course Title */}
          <h3 className="md:text-lg font-semibold text-gray-800 mb-2">
            {title}
          </h3>

          {/* Payment Details */}
          <div className="space-y-1 mb-2 md:mb-4 text-sm text-gray-600">
            {status === "pending" && timeLeft && (
              <p>
                <span className="font-medium">To pay in</span>{" "}
                <span className="text-aqua-depth font-medium">{timeLeft}</span>
              </p>
            )}
            {status === "failed" && reason && (
              <p>
                <span className="font-medium">Reason:</span> {reason}
              </p>
            )}
            <p>
              <span className="font-medium">
                {status === "pending" ? "Transaction Date:" : "Payment Date:"}
              </span>{" "}
              {paymentDate}
            </p>
            <p>
              <span className="font-medium">Method:</span> {method}
            </p>
          </div>

          {/* Amount */}
          <p className="max-md:text-end text-lg font-semibold text-gray-800 md:mb-4">
            {amount}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex-shrink-0 max-md:flex-1 space-y-2">
          {status === "success" && (
            <Button
              onClick={handleTransactionDetail}
              className="max-md:w-full bg-aqua-mist hover:bg-aqua-depth text-white px-6"
            >
              Transaction Detail
            </Button>
          )}
          {status === "failed" && (
            <Button className="border border-aqua-mist bg-transparent hover:bg-aqua-mist text-aqua-mist hover:text-white cursor-pointer px-6">
              Buy Again
            </Button>
          )}
          {status === "pending" && (
            <div className="space-y-2">
              <Button className="w-full bg-aqua-mist hover:bg-aqua-depth text-white">
                Pay
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent border-aqua-mist text-aqua-mist hover:bg-sky-50"
              >
                Change Payment
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
