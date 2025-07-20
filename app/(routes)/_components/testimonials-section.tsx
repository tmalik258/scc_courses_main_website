import { TestimonialSlider } from "./testimonials-slider";

export default function TestimonialsSection() {
  return (
    <section className="text-left px-6 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 ml-[12px]">
            What Our Students Say
          </h2>
          <p className="text-gray-600 max-w-2xl pl-[12px]">
            See how our courses have changed careers and yours could be next
          </p>
        </div>

        {/* Testimonial Slider */}
        <TestimonialSlider />
      </div>
    </section>
  );
}
