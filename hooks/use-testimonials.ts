"use client";

import { useEffect, useState } from "react";
import { getTestimonials } from "@/actions/get-testimonials";

interface Testimonial {
  id: string;
  courseId: string;
  courseTitle: string;
  name: string;
  title: string;
  rating: number;
  review: string;
  avatar: string;
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getTestimonials();
        setTestimonials(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { testimonials, loading };
}
