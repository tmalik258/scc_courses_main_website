"use client"

import { useState } from "react"
import { Users, Star, Heart, Check, Play, Download, Clock, FileText, FolderOpen, TestTube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CourseHeader } from "./components/course-header"
import { CourseBreadcrumb } from "./components/course-breadcrumb"
import { CourseTabs } from "./components/course-tabs"

export default function CourseDetail() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isFavorite, setIsFavorite] = useState(false)

  const learningPoints = [
    "Understand the fundamentals of automation and APIs",
    "Work with HTTP requests, JSON data, and third-party APIs",
  ]

  const courseFeatures = [
    { icon: Play, label: "32 Videos" },
    { icon: Download, label: "40 Downloadable Materials" },
    { icon: Clock, label: "20 Hours Duration" },
    { icon: FileText, label: "8 Articles" },
    { icon: FolderOpen, label: "20 Projects" },
    { icon: TestTube, label: "10 Practice Test" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <CourseHeader />
      <CourseBreadcrumb />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded font-medium">Data Science</span>
            </div>

            {/* Course Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Machine Learning with Python: From Basics to Deployment
            </h1>

            {/* Course Stats */}
            <div className="flex items-center gap-6 mb-6 text-sm">
              <div className="flex items-center gap-1 text-gray-600">
                <Users className="w-4 h-4 text-orange-500" />
                <span>320+ students</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span>4.8/5</span>
              </div>
            </div>

            {/* Course Description */}
            <p className="text-gray-600 leading-relaxed mb-8">
              Learn to streamline workflows by integrating Python and APIs for automation, reducing manual tasks,
              improving efficiency, and enhancing productivity with real-world projects.
            </p>

            {/* Course Tabs */}
            <CourseTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Tab Content */}
            <div>
              {activeTab === "overview" && (
                <div className="space-y-8">
                  {/* Overview Section */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Overview</h3>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-3">Description</h4>
                        <p className="text-gray-600 leading-relaxed">
                          In today's fast-paced digital world, automation is key to boosting productivity and
                          efficiency. This course will teach you how to leverage Python and APIs to automate repetitive
                          tasks, streamline workflows, and optimize business processes. Whether you're a beginner or an
                          experienced developer, this course provides a hands-on approach to learning real-world
                          automation techniques used in industries like finance, marketing, and IT.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-800 mb-3">What You'll Learn</h4>
                        <ul className="space-y-2">
                          {learningPoints.map((point, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "lessons" && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Course Lessons</h3>
                  <p className="text-gray-600">Course lessons content will be displayed here.</p>
                </div>
              )}

              {activeTab === "instructors" && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Instructors</h3>
                  <p className="text-gray-600">Instructor information will be displayed here.</p>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Student Reviews</h3>
                  <p className="text-gray-600">Student reviews will be displayed here.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Course Image */}
              <div>
                <img
                  src="/placeholder.svg?height=200&width=350"
                  alt="Machine Learning with Python"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              {/* Pricing */}
              <div className="text-right">
                <div className="flex items-center justify-end gap-3 mb-4">
                  <span className="text-gray-400 line-through text-lg">₹1,350</span>
                  <span className="text-blue-500 font-bold text-2xl">₹1,336</span>
                  <span className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded font-medium">10% OFF</span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button className="w-full bg-sky-400 hover:bg-sky-500 text-white py-3 text-lg">Get Started →</Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3 bg-transparent"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-current text-red-500" : ""}`} />
                    Add to Favorite
                  </Button>
                </div>
              </div>

              {/* What You'll Get */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">What You&apos;ll Get</h3>
                <div className="space-y-3">
                  {courseFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <feature.icon className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-600">{feature.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
