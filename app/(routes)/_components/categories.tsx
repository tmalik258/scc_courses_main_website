"use client";

import CategoryCard from "@/components/course/category-card";
import Link from "next/link";

type Category = {
  id: string;
  name: string;
  slug: string;
  courseCount: number;
  minPrice: number;
};

interface Props {
  categories: Category[];
};

export default function Categories({ categories }: Props) {

  return (
    <section className="px-6 py-6 md:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center max-md:flex-col max-md:items-start max-md:gap-3 mb-12 max-md:mb-2">
          <div>
            <h2 className="text-3xl md:text-xl font-bold text-gray-900 mb-2">
              Find the Right Course Category for You
            </h2>
            <p className="text-gray-600">
              Explore our course categories and start mastering the tech skills
              today!
            </p>
          </div>
          <Link
            href="/courses"
            className="text-aqua-mist hover:text-aqua-depth font-semibold flex items-center space-x-1 font-manrope max-md:self-end"
          >
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
                fill="#5CB1D1"
              />
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            return (
              <CategoryCard
                key={category.id}
                category={category}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
