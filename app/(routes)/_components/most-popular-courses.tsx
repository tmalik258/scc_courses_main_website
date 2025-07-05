"use client"

import { useState } from "react"
import { CourseCard } from "../../../components/course/course-card"
import { CourseFilterTabs } from "./course-filter-tabs"

const coursesData = [
  {
    id: 1,
    category: "AI Calling",
    categoryBgColor: "bg-purple-500/15",
    categoryTextColor: "text-purple-500",
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
    categoryBgColor: "bg-green-500/15",
    categoryTextColor: "text-green-500",
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
    categoryBgColor: "bg-orange-500/15",
    categoryTextColor: "text-orange-500",
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
    categoryBgColor: "bg-pink-500/15",
    categoryTextColor: "text-pink-500",
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
    categoryBgColor: "bg-orange-500/15",
    categoryTextColor: "text-orange-500",
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
    categoryBgColor: "bg-pink-500/15",
    categoryTextColor: "text-pink-500",
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
    categoryBgColor: "bg-cyan-400/15", // closest to aqua-mist
    categoryTextColor: "text-cyan-400",
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
    categoryBgColor: "bg-blue-600/15",
    categoryTextColor: "text-blue-600",
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
    <section className="bg-aqua-mist px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Most Popular Courses</h2>
            <p className="text-white/90">Master top tech skills with our most popular courses!</p>
          </div>
          <button className="flex items-center gap-2 text-white hover:text-white/80 transition-colors font-manrope">
            <span>View More</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.4697 8.53015C13.396 8.46149 13.3369 8.37869 13.2959 8.28669C13.2549 8.19469 13.2329 8.09538 13.2311 7.99468C13.2293 7.89397 13.2478 7.79394 13.2856 7.70056C13.3233 7.60717 13.3794 7.52233 13.4506 7.45112C13.5219 7.3799 13.6067 7.32375 13.7001 7.28603C13.7935 7.24831 13.8935 7.22979 13.9942 7.23156C14.0949 7.23334 14.1942 7.25538 14.2862 7.29637C14.3782 7.33736 14.461 7.39647 14.5297 7.47015L18.5297 11.4702C18.6701 11.6108 18.749 11.8014 18.749 12.0002C18.749 12.1989 18.6701 12.3895 18.5297 12.5302L14.5297 16.5302C14.461 16.6038 14.3782 16.6629 14.2862 16.7039C14.1942 16.7449 14.0949 16.767 13.9942 16.7687C13.8935 16.7705 13.7935 16.752 13.7001 16.7143C13.6067 16.6766 13.5219 16.6204 13.4506 16.5492C13.3794 16.478 13.3233 16.3931 13.2856 16.2998C13.2478 16.2064 13.2293 16.1063 13.2311 16.0056C13.2329 15.9049 13.2549 15.8056 13.2959 15.7136C13.3369 15.6216 13.396 15.5388 13.4697 15.4702L16.1897 12.7502H6.49968C6.30077 12.7502 6.11 12.6711 5.96935 12.5305C5.8287 12.3898 5.74968 12.1991 5.74968 12.0002C5.74968 11.8012 5.8287 11.6105 5.96935 11.4698C6.11 11.3292 6.30077 11.2502 6.49968 11.2502H16.1897L13.4697 8.53015Z"
                fill="#fff"
              />
            </svg>
          </button>
        </div>

        {/* Filter Tabs */}
        <CourseFilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              category={course.category}
              categoryTextColor={course.categoryTextColor}
              categoryBgColor={course.categoryBgColor}
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
