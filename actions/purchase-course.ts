import axios from "axios";
import { PaymentMethod } from "@/lib/generated/prisma";

export async function purchaseCourse(courseId: string, paymentMethod: string) {
  if (!courseId || typeof courseId !== "string") {
    throw new Error("Invalid course ID");
  }

  if (!paymentMethod || !Object.values(PaymentMethod).includes(paymentMethod as PaymentMethod)) {
    throw new Error(`Invalid payment method: ${paymentMethod}`);
  }

  try {
    console.log("Sending purchase request:", {
      courseId,
      paymentMethod,
      timestamp: new Date().toISOString(),
    });

    const res = await axios.post(`/api/courses/${courseId}/payment`, {
      paymentMethod,
    });

    console.log("Purchase API response:", {
      status: res.status,
      data: res.data,
      timestamp: new Date().toISOString(),
    });

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("Purchase API error:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
        timestamp: new Date().toISOString(),
      });

      throw new Error(err.response?.data?.error || "Failed to purchase course");
    }

    if (err instanceof Error) {
      console.error("Unexpected purchase error:", {
        error: err,
        message: err.message,
        timestamp: new Date().toISOString(),
      });
    } else {
      console.error("Unexpected non-Error thrown:", {
        error: err,
        timestamp: new Date().toISOString(),
      });
    }

    throw new Error("An unexpected error occurred");
  }
}
