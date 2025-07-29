"use server";

import prisma from "@/lib/prisma";

export async function getUserPayments(userId: string) {
  const purchases = await prisma.purchase.findMany({
    where: { studentId: userId },
    include: {
      course: true,
      invoice: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return purchases.map((purchase) => ({
    id: purchase.id,
    title: purchase.course.title,
    paymentDate:
      purchase.invoice?.paymentDate.toDateString() ??
      purchase.createdAt.toDateString(),
    method: purchase.invoice?.paymentMethod ?? "Unknown",
    amount: purchase.invoice?.totalAmount
      ? `₹${purchase.invoice.totalAmount.toFixed(0)}`
      : "₹0",
    status: purchase.invoice?.status.toLowerCase() ?? "pending",
    image: purchase.course.thumbnailUrl ?? "/images/course_placeholder_2.jpg",
    reason:
      purchase.invoice?.status === "FAILED" ? "Payment failed" : undefined,
    timeLeft: purchase.invoice?.status === "PENDING" ? "23:57:55" : undefined,
  }));
}
