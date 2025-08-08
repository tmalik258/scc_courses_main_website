import { useEffect, useState } from "react";
import { getCategoriesWithMeta } from "@/actions/categories";

// Define the shape of the data
type CategoryMeta = {
  id: string;
  name: string;
  slug: string;
  courseCount: number;
  minPrice: number;
};

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await getCategoriesWithMeta();
      setCategories(data);
      setLoading(false);
    };
    load();
  }, []);

  return { categories, loading };
};
