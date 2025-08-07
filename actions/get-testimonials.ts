// actions/get-testimonials.ts

"use server";

import { fetchTestimonials } from "@/app/api/testimonials/route";

export async function getTestimonials() {
  return fetchTestimonials();
}
