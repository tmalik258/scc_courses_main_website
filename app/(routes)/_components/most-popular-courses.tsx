"use client";

import { useState } from "react";
import { CourseCard } from "@/components/course/course-card";
import { CourseFilterTabs } from "./course-filter-tabs";
import { usePopularCourses, useFilteredCourses } from "@/app/hooks/use-courses";

export default function MostPopularCourses() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { courses, loading, error, refetch } = usePopularCourses();
  const filteredCourses = useFilteredCourses(courses, activeFilter);

  if (loading) {
    return (
      <section className="bg-aqua-mist px-2 md:px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p>Loading popular courses...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-aqua-mist px-2 md:px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-white text-center">
              <p className="text-lg mb-4">{error}</p>
              <button
                onClick={() => refetch()}
                className="bg-white text-aqua-mist px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (courses.length === 0) {
    return (
      <section className="bg-aqua-mist px-2 md:px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-white text-center">
              <p className="text-lg">No courses available at the moment.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-aqua-mist px-2 md:px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex max-md:flex-col max-md:gap-4 items-center justify-between mb-4 md:mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Most Popular Courses
            </h2>
            <p className="text-white/90">
              Master top tech skills with our most popular courses!
            </p>
          </div>
          <button className="flex max-md:self-end md:items-center gap-2 text-white hover:text-white/80 transition-colors font-manrope">
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

        <CourseFilterTabs
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Grid layout for 8 courses - 2 rows of 4 on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
              price={course.price}
              image={course.thumbnail_url}
              thumbnail_url={course.thumbnail_url}
              originalPrice={course.originalPrice}
              discountedPrice={course.discountedPrice}
              discount={course.discount}
            />
          ))}
        </div>

        {filteredCourses.length === 0 && activeFilter !== "All" && (
          <div className="text-center mt-8">
            <p className="text-white/80 text-lg">
              No courses found in the &quot;{activeFilter}&quot; category.
            </p>
          </div>
        )}

        {activeFilter !== "All" && filteredCourses.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-white/80">
              Showing {filteredCourses.length} course
              {filteredCourses.length !== 1 ? "s" : ""} in {activeFilter}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
