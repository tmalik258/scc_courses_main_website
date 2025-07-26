"use server";

import prisma from "@/lib/prisma";

export async function getUserPayments(userId: string) {
  const purchases = await prisma.purchases.findMany({
    where: { student_id: userId },
    include: {
      courses: true,
      invoices: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return purchases.map((purchase) => ({
    id: purchase.id,
    title: purchase.courses.title,
    paymentDate:
      purchase.invoices?.payment_date.toDateString() ??
      purchase.createdAt.toDateString(),
    method: purchase.invoices?.payment_method ?? "Unknown",
    amount: purchase.invoices?.total_amount
      ? `₹${purchase.invoices.total_amount.toFixed(0)}`
      : "₹0",
    status: purchase.invoices?.status.toLowerCase() ?? "pending",
    image: purchase.courses.thumbnail_url ?? "/images/course_placeholder_2.jpg",
    reason:
      purchase.invoices?.status === "FAILED" ? "Payment failed" : undefined,
    timeLeft: purchase.invoices?.status === "PENDING" ? "23:57:55" : undefined,
  }));
}
