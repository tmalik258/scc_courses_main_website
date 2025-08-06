import { getCategoriesWithMeta } from "@/actions/get-categories";
import Hero from "./_components/hero";
import Categories from "./_components/categories";
import MostPopularCourses from "./_components/most-popular-courses";
import TestimonialsSection from "./_components/testimonials-section";
import { InstructorSection } from "./_components/instructor-sections";
import ConsultancyContact from "./_components/consultancy-contact";
import { DashedSpinner } from "@/components/dashed-spinner";

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
        <Suspense
          fallback={
            <div className="bg-aqua-mist px-2 md:px-6 py-12">
              <div className="max-w-7xl mx-auto">
                <div className="flex justify-center items-center min-h-[400px]">
                  <DashedSpinner />
                </div>
              </div>
            </div>
          }
        >
          <MostPopularCourses />
        </Suspense>
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
