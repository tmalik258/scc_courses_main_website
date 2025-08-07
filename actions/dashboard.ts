"use server";

import { fetchDashboardDataByUserId } from "@/app/api/dashboard/route";

export async function getDashboardData(userId: string) {
  return fetchDashboardDataByUserId(userId);
}
