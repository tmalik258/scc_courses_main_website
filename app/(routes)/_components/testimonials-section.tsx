"use client";

import { useEffect, useState } from "react";
import { TestimonialSlider } from "./testimonials-slider";
import { getTestimonials } from "@/actions/get-testimonials";
import { TestimonialType } from "@/types/testimonial";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);

  useEffect(() => {
    async function fetchTestimonials() {
      const data = await getTestimonials();

      // Add courseId default manually here
      const dataWithCourseId: TestimonialType[] = data.map((t) => ({
        ...t,
        courseId: "", // or get courseId from context/props if possible
      }));

      setTestimonials(dataWithCourseId);
    }

    fetchTestimonials();
  }, []);

  return (
    <section className="px-6 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            What Our Students Say
          </h2>
          <p className="text-gray-600 max-w-2xl">
            See how our courses have changed careers and yours could be next
          </p>
        </div>

        {testimonials.length > 0 ? (
          <TestimonialSlider testimonialsData={testimonials} />
        ) : (
          <p className="text-gray-500">No testimonials available yet.</p>
        )}
      </div>
    </section>
  );
}
