"use client";

import Hero from "./_components/hero";
import Categories from "./_components/categories";
import MostPopularCourses from "./_components/most-popular-courses";
import TestimonialsSection from "./_components/testimonials-section";
import { InstructorSection } from "./_components/instructor-sections";
import ConsultancyContact from "./_components/consultancy-contact";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    const sections = [
      { id: "hero", element: document.getElementById("hero") },
      { id: "categories", element: document.getElementById("categories") },
      {
        id: "most-popular-courses",
        element: document.getElementById("most-popular-courses"),
      },
      { id: "testimonials", element: document.getElementById("testimonials") },
      { id: "instructors", element: document.getElementById("instructors") },
      { id: "consultancy", element: document.getElementById("consultancy") },
    ].filter((section) => section.element); // Filter out null elements

    const handleScroll = () => {
      let currentSection = "";
      const scrollPosition = window.scrollY + window.innerHeight / 2; // Use midpoint of viewport

      for (const section of sections) {
        if (!section.element) continue;
        const rect = section.element.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSection = section.id;
          break;
        }
      }

      if (currentSection && window.location.hash !== `#${currentSection}`) {
        window.history.replaceState(null, "", `#${currentSection}`);
      } else if (!currentSection && window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section id="hero">
        <Hero />
      </section>

      {/* Course Categories Section */}
      <section id="categories">
        <Categories />
      </section>

      {/* Most Popular Courses Section */}
      <section id="most-popular-courses">
        <MostPopularCourses />
      </section>

      {/* Testimonials */}
      <section id="testimonials">
        <TestimonialsSection />
      </section>

      {/* Instructor */}
      <section id="instructors">
        <InstructorSection />
      </section>

      {/* Consultancy */}
      <section id="consultancy">
        <ConsultancyContact />
      </section>
    </div>
  );
}
