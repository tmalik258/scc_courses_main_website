import { SavedCourseCard } from "./_components/saved-course-card"

export default function SavedCoursePage() {
  const savedCourses = [
    {
      category: "Data Science",
      categoryColor: "bg-blue-600",
      title: "Machine Learning with Python: From Basics to Deployment",
      mentor: "Mentor's Name",
      students: "320+ students",
      rating: "4.8/5",
      originalPrice: "₹1,350",
      discountedPrice: "₹1,350",
      image: "/images/course_placeholder_2.jpg?height=120&width=200",
    },
    {
      category: "WhatsApp Chatbots",
      categoryColor: "bg-purple-500",
      title: "Build a WhatsApp Chatbot with Node.js & Twilio API",
      mentor: "Mentor's Name",
      students: "230+ students",
      rating: "4.5/5",
      originalPrice: "₹1,350",
      discountedPrice: "₹1,550",
      image: "/images/course_placeholder_2.jpg?height=120&width=200",
    },
    {
      category: "AI Calling",
      categoryColor: "bg-green-500",
      title: "Create Smart Call Assistants using Voice AI",
      mentor: "Mentor's Name",
      students: "190+ students",
      rating: "4.6/5",
      originalPrice: "₹1,350",
      discountedPrice: "₹1,850",
      image: "/images/course_placeholder_2.jpg?height=120&width=200",
    },
  ]

  return (
    <div className="space-y-6">
      {savedCourses.map((course, index) => (
        <SavedCourseCard key={index} {...course} />
      ))}

      {/* Empty State */}
      {savedCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No saved courses</h3>
          <p className="text-gray-600">Courses you bookmark will appear here for easy access.</p>
        </div>
      )}
    </div>
  )
}
