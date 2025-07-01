"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CourseCard } from "@/components/course/course-card";
import { CourseFilters } from "./_components/course-filters";
import { CoursePagination } from "./_components/course-pagination";
import { ContactForm } from "../_components/contact-form";

const allCoursesData = [
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
    image: "/images/courses_placeholder.jpg?height=200&width=350",
    price: 1350,
    ratingValue: 4.8,
  },
  {
    id: 2,
    category: "App Development",
    categoryColor: "bg-pink-500",
    title: "Flutter for Beginners: Build iOS & Android Apps",
    mentor: "Mentor's Name",
    students: "320+ students",
    rating: "4.8/5",
    originalPrice: "1,350",
    discountedPrice: "1,350",
    discount: "10% OFF",
    image: "/images/courses_placeholder.jpg?height=200&width=350",
    price: 1350,
    ratingValue: 4.8,
  },
  {
    id: 3,
    category: "AI Calling",
    categoryColor: "bg-purple-500",
    title: "Create Smart Call Assistants using Voice AI",
    mentor: "Mentor's Name",
    students: "320+ students",
    rating: "4.8/5",
    originalPrice: "1,350",
    discountedPrice: "1,350",
    discount: "10% OFF",
    image: "/images/courses_placeholder.jpg?height=200&width=350",
    price: 1350,
    ratingValue: 4.8,
  },
  {
    id: 4,
    category: "WhatsApp Chatbots",
    categoryColor: "bg-green-500",
    title: "AI Voice Bots with Google Dialogflow & Twilio",
    mentor: "Mentor's Name",
    students: "320+ students",
    rating: "4.8/5",
    originalPrice: "1,350",
    discountedPrice: "1,350",
    discount: "10% OFF",
    image: "/images/courses_placeholder.jpg?height=200&width=350",
    price: 1350,
    ratingValue: 4.8,
  },
  {
    id: 5,
    category: "Web Development",
    categoryColor: "bg-cyan-500",
    title: "Responsive Web Design with HTML, CSS & Flexbox",
    mentor: "Mentor's Name",
    students: "320+ students",
    rating: "4.8/5",
    originalPrice: "1,350",
    discountedPrice: "1,350",
    discount: "10% OFF",
    image: "/images/courses_placeholder.jpg?height=200&width=350",
    price: 1350,
    ratingValue: 4.8,
  },
  {
    id: 6,
    category: "WhatsApp Chatbots",
    categoryColor: "bg-green-500",
    title: "AI Voice Bots with Google Dialogflow & Twilio",
    mentor: "Mentor's Name",
    students: "320+ students",
    rating: "4.8/5",
    originalPrice: "1,350",
    discountedPrice: "1,350",
    discount: "10% OFF",
    image: "/images/courses_placeholder.jpg?height=200&width=350",
    price: 1350,
    ratingValue: 4.8,
  },
  {
    id: 7,
    category: "Make Automations",
    categoryColor: "bg-orange-500",
    title: "Zapier 101: Automate Tasks Without Code",
    mentor: "Mentor's Name",
    students: "320+ students",
    rating: "4.8/5",
    originalPrice: "1,350",
    discountedPrice: "1,350",
    discount: "10% OFF",
    image: "/images/courses_placeholder.jpg?height=200&width=350",
    price: 1350,
    ratingValue: 4.8,
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
    image: "/images/courses_placeholder.jpg?height=200&width=350",
    price: 1350,
    ratingValue: 4.8,
  },
  {
    id: 9,
    category: "Make Automations",
    categoryColor: "bg-orange-500",
    title: "Zapier 101: Automate Tasks Without Code",
    mentor: "Mentor's Name",
    students: "320+ students",
    rating: "4.8/5",
    originalPrice: "1,350",
    discountedPrice: "1,350",
    discount: "10% OFF",
    image: "/images/courses_placeholder.jpg?height=200&width=350",
    price: 1350,
    ratingValue: 4.8,
  },
  {
    id: 10,
    category: "WhatsApp Chatbots",
    categoryColor: "bg-green-500",
    title: "AI Voice Bots with Google Dialogflow & Twilio",
    mentor: "Mentor's Name",
    students: "320+ students",
    rating: "4.8/5",
    originalPrice: "1,350",
    discountedPrice: "1,350",
    discount: "10% OFF",
    image: "/images/courses_placeholder.jpg?height=200&width=350",
    price: 1350,
    ratingValue: 4.8,
  },
  {
    id: 11,
    category: "Web Development",
    categoryColor: "bg-cyan-500",
    title: "Responsive Web Design with HTML, CSS & Flexbox",
    mentor: "Mentor's Name",
    students: "320+ students",
    rating: "4.8/5",
    originalPrice: "1,350",
    discountedPrice: "1,350",
    discount: "10% OFF",
    image: "/images/courses_placeholder.jpg?height=200&width=350",
    price: 1350,
    ratingValue: 4.8,
  },
  {
    id: 12,
    category: "WhatsApp Chatbots",
    categoryColor: "bg-green-500",
    title: "AI Voice Bots with Google Dialogflow & Twilio",
    mentor: "Mentor's Name",
    students: "320+ students",
    rating: "4.8/5",
    originalPrice: "1,350",
    discountedPrice: "1,350",
    discount: "10% OFF",
    image: "/images/courses_placeholder.jpg?height=200&width=350",
    price: 1350,
    ratingValue: 4.8,
  },
];

export default function BrowseCourses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Most Popular");
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: "All",
    rating: "All",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 9;

  const filteredAndSortedCourses = useMemo(() => {
    let filtered = allCoursesData;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((course) =>
        filters.categories.includes(course.category)
      );
    }

    // Apply price filter
    if (filters.priceRange !== "All") {
      filtered = filtered.filter((course) => {
        switch (filters.priceRange) {
          case "Under ₹500":
            return course.price < 500;
          case "₹500 - ₹1000":
            return course.price >= 500 && course.price <= 1000;
          case "₹1000 - ₹2000":
            return course.price >= 1000 && course.price <= 2000;
          case "Above ₹2000":
            return course.price > 2000;
          default:
            return true;
        }
      });
    }

    // Apply rating filter
    if (filters.rating !== "All") {
      filtered = filtered.filter((course) => {
        const minRating = Number.parseFloat(filters.rating.replace("+", ""));
        return course.ratingValue >= minRating;
      });
    }

    // Apply sorting
    switch (sortBy) {
      case "Price: Low to High":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "Rating":
        filtered.sort((a, b) => b.ratingValue - a.ratingValue);
        break;
      case "Most Popular":
      default:
        // Keep original order for "Most Popular"
        break;
    }

    return filtered;
  }, [searchQuery, filters, sortBy]);

  const totalPages = Math.ceil(
    filteredAndSortedCourses.length / coursesPerPage
  );
  const currentCourses = filteredAndSortedCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  const handleFilterChange = (newFilters: {
    categories: string[];
    priceRange: string;
    rating: string;
  }) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Browse All Courses
            </h1>
            <p className="text-gray-600">
              Find the perfect course for your learning journey and start
              building real-world skills today
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar Filters */}
        <CourseFilters onFilterChange={handleFilterChange} />

        <div className="flex-1 flex flex-col px-2">
          {/* Search and Sort */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Most Popular">Most Popular</SelectItem>
                  <SelectItem value="Price: Low to High">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="Price: High to Low">
                    Price: High to Low
                  </SelectItem>
                  <SelectItem value="Rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Course Grid */}
          <div className="p-6">
            {currentCourses.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentCourses.map((course) => (
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
                {/* Pagination */}
                <CoursePagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No courses found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <ContactForm />
    </div>
  );
}
