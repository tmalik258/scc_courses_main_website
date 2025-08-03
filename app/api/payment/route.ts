// app/api/payment/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  // Step 1: Look up the profile by Supabase userId
  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  // Step 2: Get all purchases for this profile
  const purchases = await prisma.purchase.findMany({
    where: {
      studentId: profile.id,
    },
    include: {
      course: true, // so we can show course title/thumbnail/etc.
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Step 3: Return simplified list
  const payments = purchases.map((purchase) => ({
    id: purchase.id,
    title: purchase.course.title,
    image: purchase.course.thumbnailUrl ?? "",
    paymentDate: purchase.createdAt.toISOString(),
    method: "N/A", // You don't have this on Purchase
    amount: purchase.course.price?.toFixed(2) ?? "0.00",
    status: "success", // Static for now unless you store status elsewhere
  }));

  return NextResponse.json(payments);
}
