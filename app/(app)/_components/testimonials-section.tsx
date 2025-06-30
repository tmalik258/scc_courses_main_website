import { TestimonialSlider } from "./testimonials-slider";

export default function TestimonialsSection() {
  return (
    <section className="px-6 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Students Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how our courses have changed careers and yours could be next
          </p>
        </div>

        {/* Testimonial Slider */}
        <TestimonialSlider />
      </div>
    </section>
  )
}
