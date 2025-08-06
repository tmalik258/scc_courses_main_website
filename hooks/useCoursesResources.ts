// hooks/useCourseResources.ts
import { useEffect, useState } from "react";
import { getCourseResources } from "@/actions/get-course-resources";

type Resource = {
  id: string;
  name: string;
  url: string;
};

export const useCourseResources = (courseId: string) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) return;

    const load = async () => {
      const data = await getCourseResources(courseId);
      setResources(data);
      setLoading(false);
    };

    load();
  }, [courseId]);

  return { resources, loading };
};
