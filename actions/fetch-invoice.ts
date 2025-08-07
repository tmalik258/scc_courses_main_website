import axios from "axios";

export async function fetchInvoice(invoiceId: string) {
  const res = await axios.get(`/api/invoice/${invoiceId}`);
  return res.data.invoice;
}
