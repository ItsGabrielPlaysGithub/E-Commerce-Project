export const RED = "#bf262f";
export const RED_LIGHT = "#f9e9ea";

export type OrderType = "retail" | "wholesale" | "bulk" | "general";

export interface InquiryFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  orderType: OrderType;
  products: string;
  quantity: string;
  message: string;
  agreed: boolean;
}

export const ORDER_TYPES: { value: OrderType; label: string; sub: string }[] = [
  { value: "retail", label: "Retail", sub: "No MOQ" },
  { value: "wholesale", label: "Wholesale", sub: "12+ units" },
  { value: "bulk", label: "Bulk", sub: "100+ units" },
  { value: "general", label: "General", sub: "Other" },
];

export const CONTACT_INFO = [
  { Icon: "Phone", label: "Phone", value: "+63 2 8XXX-XXXX" },
  { Icon: "Mail", label: "Email", value: "inquiry@omegahouseware.com.ph" },
  { Icon: "MapPin", label: "Address", value: "123 Industrial Ave., Quezon City, Metro Manila" },
];

export const BUSINESS_HOURS = [
  { day: "Mon – Fri", time: "8AM – 6PM" },
  { day: "Saturday", time: "9AM – 3PM" },
  { day: "Sunday", time: "Closed", closed: true },
];
