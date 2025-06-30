import Hero from './_components/hero'
import Categories from './_components/categories'
import MostPopularCourses from './_components/most-popular-courses'
import TestimonialsSection from './_components/testimonials-section'
import { InstructorSection } from './_components/instructor-sections'
import ConsultancyContact from './_components/consultancy-contact'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Course Categories Section */}
      <Categories />

      {/* Most Popular Courses Section */}
      <MostPopularCourses />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Instructor */}
      <InstructorSection />

      {/* Consultancy */}
      <ConsultancyContact />
    </div>
  )
}