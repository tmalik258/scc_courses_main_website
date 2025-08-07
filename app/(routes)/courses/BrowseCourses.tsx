"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import CourseFilters from "./_components/course-filters";
import { CoursePagination } from "./_components/course-pagination";
import { ContactForm } from "../_components/contact-form";
import { CourseFilterTabs } from "../_components/course-filter-tabs";
import { CourseData } from "@/types/course";
import { getPopularCourses } from "@/actions/get-courses";
import { DashedSpinner } from "@/components/dashed-spinner";

export default function BrowseCourses() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [coursesData, setCoursesData] = useState<CourseData[]>([]);
  const [activeFilter, setActiveFilter] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Most Popular");
  const [filterOpen, setFilterOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    categories: initialCategory !== "All" ? [initialCategory] : [],
    priceRange: "All",
    rating: "All",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const coursesPerPage = 9;

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        const courses = await getPopularCourses();
        setCoursesData(courses);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  useEffect(() => {
    // Update activeFilter and advancedFilters when the category query changes
    const category = searchParams.get("category") || "All";
    setActiveFilter(category);
    setAdvancedFilters((prev) => ({
      ...prev,
      categories: category !== "All" ? [category] : [],
    }));
    setCurrentPage(1);
  }, [searchParams]);

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
        const price = parseFloat(course.discountedPrice);
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
            parseFloat(a.discountedPrice) - parseFloat(b.discountedPrice)
        );
        break;
      case "Price: High to Low":
        filtered.sort(
          (a, b) =>
            parseFloat(b.discountedPrice) - parseFloat(a.discountedPrice)
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
        filtered.sort((a, b) => b.purchaseCount - a.purchaseCount);
        break;
    }

    return filtered;
  }, [searchQuery, advancedFilters, sortBy, coursesData]);

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
    setActiveFilter(newAdvancedFilters.categories[0] || "All");
    setCurrentPage(1);
    // Update URL with the selected category
    const query = new URLSearchParams();
    if (newAdvancedFilters.categories.length > 0) {
      query.set("category", newAdvancedFilters.categories[0]);
    }
    router.push(`/courses?${query.toString()}`, { scroll: false });
  };

  const handleFilterToggle = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      <section id="browse-courses">
        <div className="max-w-7xl mx-auto px-6 py-6 md:py-16">
          <div className="md:text-center mb-2 md:mb-8">
            <h1 className="text-xl md:text-3xl font-bold text-gray-800 mb-2 font-manrope">
              Browse All Courses
            </h1>
            <p className="text-lg text-gray-600 font-manrope">
              Find the perfect course for your learning journey and start
              building real-world skills today
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:gap-6">
            <div
              className={`${
                filterOpen
                  ? "max-md:translate-x-0 visible opacity-100"
                  : "max-md:translate-x-full max-md:invisible max-md:opacity-0"
              } transition-all duration-300 ease-in-out max-md:fixed max-md:top-0 max-md:right-0 max-md:inset-y-0 max-md:z-50 max-md:overflow-auto max-md:bg-white max-md:w-3/4 max-md:shadow-lg md:w-64 md:flex-shrink-0`}
            >
              <div className="absolute top-7 right-6 md:hidden">
                <X
                  onClick={handleFilterToggle}
                  className="w-5 h-5 cursor-pointer text-gray-600"
                />
              </div>
              <CourseFilters onFilterChange={handleFilterChange} />
            </div>

            <div className="flex-1 flex flex-col">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-2 md:px-0 py-4">
                <div className="relative flex-1 flex items-center gap-2 w-full md:w-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search for courses"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-6 py-5 text-base md:text-lg placeholder:text-sm border-2 border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-manrope"
                  />
                  <div
                    className="md:hidden flex items-center gap-2 border border-gray-200 rounded-md px-2 py-2 text-sm text-gray-600 cursor-pointer font-manrope"
                    onClick={handleFilterToggle}
                  >
                    <SlidersHorizontal className="w-4 h-4" /> Filter By
                  </div>
                </div>

                <div className="max-w-[calc(100dvw-3em)] md:hidden w-full">
                  <CourseFilterTabs
                    activeFilter={activeFilter}
                    onFilterChange={(filter) => {
                      setActiveFilter(filter);
                      setAdvancedFilters((prev) => ({
                        ...prev,
                        categories: filter !== "All" ? [filter] : [],
                      }));
                      setCurrentPage(1);
                      const query = new URLSearchParams();
                      if (filter !== "All") {
                        query.set("category", filter);
                      }
                      router.push(`/courses?${query.toString()}`, {
                        scroll: false,
                      });
                    }}
                    browseCourses={true}
                  />
                </div>

                <div className="max-md:hidden flex items-center gap-2">
                  <span className="text-sm text-gray-600 font-manrope">
                    Sort by:
                  </span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40 border-gray-200 rounded-md font-manrope">
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

              <div className="px-2 md:px-0">
                {loading ? (
                  <div className="max-w-7xl mx-auto">
                    <div className="flex justify-center items-center min-h-[400px]">
                      <DashedSpinner />
                    </div>
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-red-500 text-lg font-manrope">{error}</p>
                  </div>
                ) : currentCourses.length > 0 ? (
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
                          price={""}
                        />
                      ))}
                    </div>
                    <div className="mt-8">
                      <CoursePagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                      />
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg font-manrope">
                      No courses found matching your criteria.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
        <ContactForm />
      </section>
    </div>
  );
}
