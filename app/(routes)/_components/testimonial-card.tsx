import { TestimonialType } from "@/types/testimonial";
import Image from "next/image";

interface TestimonialCardProps {
  testimonial: TestimonialType;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="rounded-lg shadow-md p-4 bg-white">
      <div className="flex items-center space-x-4">
        <div className="relative w-10 h-10">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            layout="fill"
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-md font-semibold">{testimonial.name}</h3>
          <p className="text-sm text-gray-500">{testimonial.title}</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-700">
        &quot;{testimonial.review}&quot;
      </p>
    </div>
  );
}
