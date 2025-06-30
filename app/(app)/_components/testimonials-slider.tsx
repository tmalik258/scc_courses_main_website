"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import Image from "next/image"

const testimonialsData = [
  {
    id: 1,
    name: "Rahul M.",
    title: "AI Developer at Tech Solutions",
    rating: 5,
    review:
      "The AI Call Bot course was a game-changer! The lessons were easy to follow, and now I've built my own AI-powered customer service system. Highly recommended!",
    avatar: "/images/landing_page/testimonial_placeholder.jpg?height=60&width=60",
  },
  {
    id: 2,
    name: "Rahul M.",
    title: "AI Developer at Tech Solutions",
    rating: 5,
    review:
      "The AI Call Bot course was a game-changer! The lessons were easy to follow, and now I've built my own AI-powered customer service system. Highly recommended!",
    avatar: "/images/landing_page/testimonial_placeholder.jpg?height=60&width=60",
  },
  {
    id: 3,
    name: "Rahul M.",
    title: "AI Developer at Tech Solutions",
    rating: 5,
    review:
      "The AI Call Bot course was a game-changer! The lessons were easy to follow, and now I've built my own AI-powered customer service system. Highly recommended!",
    avatar: "/images/landing_page/testimonial_placeholder.jpg?height=60&width=60",
  },
  {
    id: 4,
    name: "Sarah K.",
    title: "Full Stack Developer",
    rating: 5,
    review:
      "Amazing course content! The instructor explains complex concepts in a very simple way. I was able to build my first chatbot within a week!",
    avatar: "/images/landing_page/testimonial_placeholder.jpg?height=60&width=60",
  },
  {
    id: 5,
    name: "Mike Chen",
    title: "Software Engineer",
    rating: 5,
    review:
      "Best investment I made for my career. The hands-on projects really helped me understand the practical applications of AI in business.",
    avatar: "/images/landing_page/testimonial_placeholder.jpg?height=60&width=60",
  },
]

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const maxIndex = Math.max(0, testimonialsData.length - itemsPerView)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [currentIndex, maxIndex, nextSlide])

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-4 z-10">
        <button
          onClick={prevSlide}
          className="bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-all duration-200"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 -right-4 z-10">
        <button
          onClick={nextSlide}
          className="bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-all duration-200"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Slider Container */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {testimonialsData.map((testimonial) => (
            <div key={testimonial.id} className="flex-shrink-0 px-3" style={{ width: `${100 / itemsPerView}%` }}>
              <div className="bg-white rounded-xl shadow-lg p-6 h-full border border-gray-100">
                {/* Stars */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                  <Quote className="w-6 h-6 text-blue-400 ml-auto" />
                </div>

                {/* Review Text */}
                <p className="text-gray-700 mb-6 leading-relaxed">{testimonial.review}</p>

                {/* User Info */}
                <div className="flex items-center">
                  <Image
                    width={60}
                    height={60}
                    src={testimonial.avatar || "/images/landing_page/testimonial_placeholder.jpg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              currentIndex === index ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
