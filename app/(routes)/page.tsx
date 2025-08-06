import { getCategoriesWithMeta } from "@/actions/get-categories";
import Hero from "./_components/hero";
import Categories from "./_components/categories";
import MostPopularCourses from "./_components/most-popular-courses";
import TestimonialsSection from "./_components/testimonials-section";
import { InstructorSection } from "./_components/instructor-sections";
import ConsultancyContact from "./_components/consultancy-contact";

export default async function HomePage() {
  const categories = await getCategoriesWithMeta();

  return (
    <div className="min-h-screen bg-white">
      <section id="hero">
        <Hero />
      </section>

      <section id="categories">
        <Categories categories={categories} />
      </section>

      <section id="most-popular-courses">
        <MostPopularCourses />
      </section>

      <section id="testimonials">
        <TestimonialsSection />
      </section>

      <section id="instructors">
        <InstructorSection />
      </section>

      <section id="consultancy">
        <ConsultancyContact />
      </section>
    </div>
  );
}
