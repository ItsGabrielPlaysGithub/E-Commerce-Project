import { apolloClient } from "../../../../lib/apolloClient";
import { GET_ALL_INVOICES, GET_INVOICE_BY_ID } from "./query";
import { PAY_INVOICE_BY_ORDER_ID } from "./mutation";

export interface Invoice {
  invoiceId: number;
  orderId: number;
  userId: number;
  invoiceNumber: string;
  totalAmount: number;
  dueDate: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Fetch all invoices from the backend
 */
export const fetchAllInvoices = async (): Promise<Invoice[]> => {
  try {
    const { data } = await apolloClient.query<{ allInvoices: Invoice[] }>({
      query: GET_ALL_INVOICES,
    });
    return data?.allInvoices || [];
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw error;
  }
};

/**
 * Fetch a single invoice by order ID
 */
export const fetchInvoiceById = async (orderId: number): Promise<Invoice | null> => {
  try {
    const { data } = await apolloClient.query<{ invoiceByOrderId: Invoice | null }>({
      query: GET_INVOICE_BY_ID,
      variables: { invoiceId: orderId },
    });
    return data?.invoiceByOrderId || null;
  } catch (error) {
    console.error(`Error fetching invoice for order ${orderId}:`, error);
    throw error;
  }
};

/**
 * Mark an invoice as paid by order ID
 */
export const payInvoiceByOrderId = async (orderId: number): Promise<Invoice | null> => {
  try {
    const { data } = await apolloClient.mutate<{ payInvoiceByOrderId: Invoice | null }>({
      mutation: PAY_INVOICE_BY_ORDER_ID,
      variables: { orderId },
    });
    return data?.payInvoiceByOrderId || null;
  } catch (error) {
    console.error(`Error paying invoice for order ${orderId}:`, error);
    throw error;
  }
};
