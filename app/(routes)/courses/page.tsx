"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
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
import { CourseFilterTabs } from "../_components/course-filter-tabs";

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
];

export default function BrowseCourses() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Most Popular");
  const [filterOpen, setFilterOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    categories: [] as string[],
    priceRange: "All",
    rating: "All",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 9;

  const filteredAndSortedCourses = useMemo(() => {
    let filtered = coursesData;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (advancedFilters.categories.length > 0) {
      filtered = filtered.filter((course) =>
        advancedFilters.categories.includes(course.category)
      );
    }

    // Apply price filter
    if (advancedFilters.priceRange !== "All") {
      filtered = filtered.filter((course) => {
        const price = parseFloat(
          course.discountedPrice?.replace(",", "") ||
            course.originalPrice.replace(",", "")
        );
        switch (advancedFilters.priceRange) {
          case "Under ₹500":
            return price < 500;
          case "₹500 - ₹1000":
            return price >= 500 && price <= 1000;
          case "₹1000 - ₹2000":
            return price >= 1000 && price <= 2000;
          case "Above ₹2000":
            return price > 2000;
          default:
            return true;
        }
      });
    }

    // Apply rating filter
    if (advancedFilters.rating !== "All") {
      filtered = filtered.filter((course) => {
        const minRating = Number.parseFloat(
          advancedFilters.rating.replace("+", "")
        );
        return parseFloat(course.rating.split("/5")[0]) >= minRating;
      });
    }

    // Apply sorting
    switch (sortBy) {
      case "Price: Low to High":
        filtered.sort(
          (a, b) =>
            parseFloat(
              a.discountedPrice?.replace(",", "") ||
                a.originalPrice.replace(",", "")
            ) -
            parseFloat(
              b.discountedPrice?.replace(",", "") ||
                b.originalPrice.replace(",", "")
            )
        );
        break;
      case "Price: High to Low":
        filtered.sort(
          (a, b) =>
            parseFloat(
              b.discountedPrice?.replace(",", "") ||
                b.originalPrice.replace(",", "")
            ) -
            parseFloat(
              a.discountedPrice?.replace(",", "") ||
                a.originalPrice.replace(",", "")
            )
        );
        break;
      case "Rating":
        filtered.sort(
          (a, b) =>
            parseFloat(b.rating.split("/5")[0]) -
            parseFloat(a.rating.split("/5")[0])
        );
        break;
      case "Most Popular":
      default:
        // Keep original order for "Most Popular"
        break;
    }

    return filtered;
  }, [searchQuery, advancedFilters, sortBy]);

  const totalPages = Math.ceil(
    filteredAndSortedCourses.length / coursesPerPage
  );
  const currentCourses = filteredAndSortedCourses
    .filter(
      (course) => activeFilter === "All" || course.category === activeFilter
    )
    .slice((currentPage - 1) * coursesPerPage, currentPage * coursesPerPage);

  const handleFilterChange = (newAdvancedFilters: {
    categories: string[];
    priceRange: string;
    rating: string;
  }) => {
    setAdvancedFilters(newAdvancedFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleFilterToggle = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 md:py-8">
          <div className="md:text-center mb-2 md:mb-8">
            <h1 className="text-xl md:text-3xl font-bold text-gray-800 mb-2">
              Browse All Courses
            </h1>
            <p className="text-lg text-gray-600">
              Find the perfect course for your learning journey and start
              building real-world skills today
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar Filters */}
        <div
          className={`${
            filterOpen
              ? "max-md:translate-x-0 visible opacity-100"
              : "max-md:translate-x-full max-md:invisible max-md:opacity-0"
          } transition-all duration-300 ease-in-out max-md:fixed max-md:top-0 max-md:right-0 max-md:inset-y-0 max-md:z-50 max-md:overflow-auto`}
        >
          <div className="absolute top-7 right-6">
            <X
              onClick={handleFilterToggle}
              className="w-5 h-5 cursor-pointer"
            />
          </div>
          <CourseFilters onFilterChange={handleFilterChange} />
        </div>

        <div className="flex-1 flex flex-col px-2">
          {/* Search and Sort */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-2 md:px-6">
            <div className="relative flex-1 flex items-center gap-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

              <Input
                type="text"
                placeholder="Search for courses"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-5 text-base md:text-lg placeholder:text-sm border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />

              <div
                className="md:hidden flex items-center gap-2 border border-gray-200 rounded-md px-2 h-full text-sm text-gray-600 cursor-pointer"
                onClick={handleFilterToggle}
              >
                <SlidersHorizontal className="w-4 h-4" /> Filter By
              </div>
            </div>

            <div className="max-w-[calc(100dvw-3em)] md:hidden">
              <CourseFilterTabs
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                browseCourses={true}
              />
            </div>

            <div className="max-md:hidden flex items-center gap-2">
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
          <div className="p-2 md:p-6">
            {currentCourses.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentCourses.map((course) => (
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
