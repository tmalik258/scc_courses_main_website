import prisma from "@/lib/prisma";

export async function getUserPayments(userId: string) {
  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (!profile) throw new Error("Profile not found");

  const purchases = await prisma.purchase.findMany({
    where: { studentId: profile.id },
    include: {
      invoice: true,
      course: {
        select: { title: true, thumbnailUrl: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return purchases.map((purchase) => ({
    id: purchase.id,
    title: purchase.course.title,
    paymentDate: purchase.invoice?.paymentDate.toISOString() ?? "",
    method: purchase.invoice?.paymentMethod.toLowerCase() ?? "",
    amount: purchase.invoice?.totalAmount.toString() ?? "0.00",
    status: purchase.invoice?.status.toLowerCase() ?? "pending",
    image: purchase.course.thumbnailUrl ?? "",
    reason: purchase.invoice?.category ?? "",
    timeLeft: undefined,
  }));
}
