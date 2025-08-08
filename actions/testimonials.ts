"use server";

import axios from 'axios';

export async function getTestimonials() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SITE_URL}/api/testimonials`);

    return response.data;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    throw error;
  }
}
