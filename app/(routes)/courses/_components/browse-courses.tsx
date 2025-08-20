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
import CourseFilters from "./course-filters";
import { CoursePagination } from "./course-pagination";
import { ContactForm } from "../../_components/contact-form";
import { CourseFilterTabs } from "../../_components/course-filter-tabs";
import { CourseData } from "@/types/course";
import { getPopularCourses } from "@/actions/courses";
import { getCategoriesWithMeta } from "@/actions/categories";
import { DashedSpinner } from "@/components/dashed-spinner";

interface FiltersState {
  categories: string[];
  priceRange: string;
  rating: string;
}

export default function BrowseCourses() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [coursesData, setCoursesData] = useState<CourseData[]>([]);
  const [categories, setCategories] = useState<
    { name: string; slug: string }[]
  >([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Most Popular");
  const [filterOpen, setFilterOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<FiltersState>({
    categories: [],
    priceRange: "All",
    rating: "All",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const coursesPerPage = 9;

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [courses, fetchedCategories] = await Promise.all([
          getPopularCourses(),
          getCategoriesWithMeta(),
        ]);
        setCoursesData(courses);
        setCategories(fetchedCategories);
      } catch {
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const categoryMapping = useMemo(() => {
    const map: Record<string, string> = {};
    categories.forEach((c) => {
      map[c.slug] = c.name;
    });
    return map;
  }, [categories]);

  const categorySlugMapping = useMemo(() => {
    const map: Record<string, string> = {};
    categories.forEach((c) => {
      map[c.name] = c.slug;
    });
    return map;
  }, [categories]);

  useEffect(() => {
    const categorySlug = searchParams.get("category") || "All";
    const categoryName = categoryMapping[categorySlug] || "All";
    setActiveFilter(categoryName);
    setAdvancedFilters((prev) => ({
      ...prev,
      categories: categoryName !== "All" ? [categoryName] : [],
    }));
    setCurrentPage(1);
  }, [searchParams, categoryMapping]);

  const filteredAndSortedCourses = useMemo(() => {
    let filtered = coursesData;

    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.category.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (advancedFilters.categories.length > 0) {
      filtered = filtered.filter((course) =>
        advancedFilters.categories.includes(course.category.name)
      );
    }

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

    if (advancedFilters.rating !== "All") {
      filtered = filtered.filter((course) => {
        const courseRating = parseFloat(course.rating.split("/5")[0]);
        const minRating =
          advancedFilters.rating === "5.0"
            ? 5.0
            : parseFloat(advancedFilters.rating.replace("+", ""));
        return courseRating >= minRating;
      });
    }

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
      (course) =>
        activeFilter === "All" || course.category.name === activeFilter
    )
    .slice((currentPage - 1) * coursesPerPage, currentPage * coursesPerPage);

  const handleFilterChange = (newAdvancedFilters: FiltersState) => {
    setAdvancedFilters(newAdvancedFilters);
    setActiveFilter(newAdvancedFilters.categories[0] || "All");
    setCurrentPage(1);
    const query = new URLSearchParams(searchParams.toString());

    if (newAdvancedFilters.categories.length > 0) {
      const categorySlug =
        categorySlugMapping[newAdvancedFilters.categories[0]] ||
        newAdvancedFilters.categories[0];
      query.set("category", categorySlug);
    } else {
      query.delete("category");
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
              <CourseFilters
                onFilterChange={handleFilterChange}
                filters={advancedFilters}
                categories={categories.map((c) => c.name)}
              />
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
                        query.set(
                          "category",
                          categorySlugMapping[filter] || filter
                        );
                      }
                      router.push(`/courses?${query.toString()}`, {
                        scroll: false,
                      });
                    }}
                    browseCourses={true}
                    filters={["All", ...categories.map((c) => c.name)]}
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
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-4 text-aqua-mist hover:text-aqua-depth font-semibold"
                    >
                      Retry
                    </button>
                  </div>
                ) : currentCourses.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {currentCourses.map((course) => (
                        <CourseCard
                          key={course.id}
                          id={course.id}
                          category={course.category.name}
                          title={course.title}
                          mentor={course.mentor}
                          students={course.students}
                          rating={course.rating}
                          originalPrice={course.originalPrice}
                          discountedPrice={course.discountedPrice}
                          discount={course.discount}
                          thumbnailUrl={course.thumbnailUrl}
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
