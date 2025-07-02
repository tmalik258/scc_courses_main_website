"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { CourseCard } from "../../../components/course/course-card"
import { CourseFilterTabs } from "./course-filter-tabs"

const coursesData = [
  {
    id: 1,
    category: "AI Calling",
    categoryColor: "bg-purple-500",
    title: "Create Smart Call Assistants using Voice AI",
    mentor: "Mentor's Name",
    students: "320+ students",
    rating: "4.8/5",
    originalPrice: "1,350",
    discountedPrice: "1,350",
    discount: "10% OFF",
    image: "/images/course_placeholder.jpg?height=200&width=350",
  },
  {
    id: 2,
    category: "WhatsApp Chatbots",
    categoryColor: "bg-green-500",
    title: "AI Voice Bots with Google Dialogflow & Twilio",
    mentor: "Mentor's Name",
    students: "320+ students",
    rating: "4.8/5",
    originalPrice: "1,350",
    discountedPrice: "1,350",
    discount: "10% OFF",
    image: "/images/course_placeholder.jpg?height=200&width=350",
  },
  {
    id: 3,
    category: "Make Automations",
    categoryColor: "bg-orange-500",
    title: "Zapier 101: Automate Tasks Without Code",
    mentor: "Mentor's Name",
    students: "320+ students",
    rating: "4.8/5",
    originalPrice: "1,350",
    discountedPrice: "1,350",
    discount: "10% OFF",
    image: "/images/course_placeholder.jpg?height=200&width=350",
  },
  {
    id: 4,
    category: "App Development",
    categoryColor: "bg-pink-500",
    title: "Flutter for Beginners: Build iOS & Android Apps",
    mentor: "Mentor's Name",
    students: "320+ students",
    rating: "4.8/5",
    originalPrice: "1,350",
    discountedPrice: "1,350",
    discount: "10% OFF",
    image: "/images/course_placeholder.jpg?height=200&width=350",
  },
  {
    id: 5,
    category: "Make Automations",
    categoryColor: "bg-orange-500",
    title: "Zapier 101: Automate Tasks Without Code",
    mentor: "Mentor's Name",
    students: "320+ students",
    rating: "4.8/5",
    originalPrice: "1,350",
    discountedPrice: "1,350",
    discount: "10% OFF",
    image: "/images/course_placeholder.jpg?height=200&width=350",
  },
  {
    id: 6,
    category: "App Development",
    categoryColor: "bg-pink-500",
    title: "Flutter for Beginners: Build iOS & Android Apps",
    mentor: "Mentor's Name",
    students: "320+ students",
    rating: "4.8/5",
    originalPrice: "1,350",
    discountedPrice: "1,350",
    discount: "10% OFF",
    image: "/images/course_placeholder.jpg?height=200&width=350",
  },
  {
    id: 7,
    category: "Web Development",
    categoryColor: "bg-cyan-500",
    title: "Responsive Web Design with HTML, CSS & Flexbox",
    mentor: "Mentor's Name",
    students: "320+ students",
    rating: "4.8/5",
    originalPrice: "1,350",
    discountedPrice: "1,350",
    discount: "10% OFF",
    image: "/images/course_placeholder.jpg?height=200&width=350",
  },
  {
    id: 8,
    category: "Data Science",
    categoryColor: "bg-blue-600",
    title: "Machine Learning with Python: From Basics to Deployment",
    mentor: "Mentor's Name",
    students: "320+ students",
    rating: "4.8/5",
    originalPrice: "1,350",
    discountedPrice: "1,350",
    discount: "10% OFF",
    image: "/images/course_placeholder.jpg?height=200&width=350",
  },
]

export default function MostPopularCourses() {
  const [activeFilter, setActiveFilter] = useState("All")

  const filteredCourses =
    activeFilter === "All" ? coursesData : coursesData.filter((course) => course.category === activeFilter)

  return (
    <section className="bg-gradient-to-br from-sky-400 to-sky-500 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Most Popular Courses</h2>
            <p className="text-white/90">Master top tech skills with our most popular courses!</p>
          </div>
          <button className="flex items-center gap-2 text-white hover:text-white/80 transition-colors">
            <span>View More</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Tabs */}
        <CourseFilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              category={course.category}
              categoryColor={course.categoryColor}
              title={course.title}
              mentor={course.mentor}
              students={course.students}
              rating={course.rating}
              originalPrice={course.originalPrice}
              discountedPrice={course.discountedPrice}
              discount={course.discount}
              image={course.image}
            />
          ))}
        </div>

        {/* Show filtered results count */}
        {activeFilter !== "All" && (
          <div className="text-center mt-8">
            <p className="text-white/80">
              Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""} in {activeFilter}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
