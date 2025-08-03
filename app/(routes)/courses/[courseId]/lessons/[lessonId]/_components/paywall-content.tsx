"use client";

import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface PaywallContentProps {
  courseId: string;
  lessonTitle: string;
  onPrevious: () => void;
  onNext: () => void;
}

export function PaywallContent({
  courseId,
  lessonTitle,
  onPrevious,
  onNext,
}: PaywallContentProps) {
  const router = useRouter();

  const handleBuyNow = () => {
    console.log("Navigating to payment page:", { courseId });
    router.push(`/courses/${courseId}/payment`);
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 md:py-16 md:px-8 text-center">
      <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-8">
        <Lock className="w-8 h-8 md:w-12 md:h-12 text-gray-400" />
      </div>

      <h2 className="md:text-2xl font-bold text-gray-800 mb-4">
        Ready to Learn More? Get Full Access Today
      </h2>

      <p className="max-md:text-sm text-gray-600 max-w-md mb-8 leading-relaxed">
        Subscribe now and start learning right away. Choose any skill, learn
        anytime. Get structured video lessons, hands-on modules, and exclusive
        webinars curated by experts from top companies.
      </p>

      <Button
        className="max-md:text-sm bg-aqua-mist hover:bg-aqua-depth text-white px-8 py-3 text-lg md:mb-8 cursor-pointer"
        onClick={handleBuyNow}
      >
        Buy Now
      </Button>

      <div className="flex items-center justify-between w-full max-w-2xl mt-16 max-md:hidden">
        <h3 className="text-lg font-medium text-gray-800">{lessonTitle}</h3>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="px-6 bg-transparent border-gray-300"
            onClick={onPrevious}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            className="px-6 bg-transparent border-gray-300"
            onClick={onNext}
          >
            Next Chapter
          </Button>
        </div>
      </div>
    </div>
  );
}
