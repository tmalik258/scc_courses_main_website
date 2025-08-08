import axios from "axios";

export async function fetchInvoice(invoiceId: string) {
  try {
    const res = await axios.get(`/api/invoice/${invoiceId}`);
    if (res.status !== 200) {
      throw new Error("Failed to fetch invoice");
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching invoice:", error);
    throw error;
  }
}
