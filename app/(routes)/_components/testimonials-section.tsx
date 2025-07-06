import { TestimonialSlider } from "./testimonials-slider";

const testimonialsData = [
  {
    id: 1,
    name: "Rahul M.",
    title: "AI Developer at Tech Solutions",
    rating: 5,
    review:
      "The AI Call Bot course was a game-changer! The lessons were easy to follow, and now I've built my own AI-powered customer service system. Highly recommended!",
    avatar:
      "/images/landing_page/testimonial_placeholder.jpg?height=60&width=60",
  },
  {
    id: 2,
    name: "Rahul M.",
    title: "AI Developer at Tech Solutions",
    rating: 5,
    review:
      "The AI Call Bot course was a game-changer! The lessons were easy to follow, and now I've built my own AI-powered customer service system. Highly recommended!",
    avatar:
      "/images/landing_page/testimonial_placeholder.jpg?height=60&width=60",
  },
  {
    id: 3,
    name: "Rahul M.",
    title: "AI Developer at Tech Solutions",
    rating: 5,
    review:
      "The AI Call Bot course was a game-changer! The lessons were easy to follow, and now I've built my own AI-powered customer service system. Highly recommended!",
    avatar:
      "/images/landing_page/testimonial_placeholder.jpg?height=60&width=60",
  },
  {
    id: 4,
    name: "Sarah K.",
    title: "Full Stack Developer",
    rating: 5,
    review:
      "Amazing course content! The instructor explains complex concepts in a very simple way. I was able to build my first chatbot within a week!",
    avatar:
      "/images/landing_page/testimonial_placeholder.jpg?height=60&width=60",
  },
  {
    id: 5,
    name: "Mike Chen",
    title: "Software Engineer",
    rating: 5,
    review:
      "Best investment I made for my career. The hands-on projects really helped me understand the practical applications of AI in business.",
    avatar:
      "/images/landing_page/testimonial_placeholder.jpg?height=60&width=60",
  },
];

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
        <TestimonialSlider testimonialsData={testimonialsData} />
      </div>
    </section>
  )
}
