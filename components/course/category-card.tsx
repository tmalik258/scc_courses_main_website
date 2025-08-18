import Link from "next/link";
 import CategoryIcon from "./category-icon";
import { randomColorGenerator } from "@/utils/category";

import { CategoryWithMeta } from '@/types/category';

interface CategoryCardProps {
  category: CategoryWithMeta;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const bgColor = randomColorGenerator();

  return (
    <Link href={`/courses?category=${category.slug}`}>
      <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out">
        <div
          className={`w-20 md:w-24 h-20 md:h-24 ${bgColor} rounded-lg flex items-center justify-center`}
        >
          <CategoryIcon
            icon={category.icon || ""}
            alt={`${category.name} icon`}
            width={60}
            height={60}
            className="w-[60px] h-[60px] object-contain"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">
            {category.name}
          </h3>
          <p className="text-xs md:text-sm text-gray-500 mb-5 font-manrope">
            {category.courseCount}{" "}
            {category.courseCount === 1 ? "course" : "courses"}{" "}available
          </p>
          <p className="text-sm md:text-base text-aqua-mist font-semibold">
            From ₹{category.minPrice}
          </p>
        </div>
      </div>
    </Link>
  );
}