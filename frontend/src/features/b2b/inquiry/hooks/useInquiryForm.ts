import { useState } from "react";
import type { OrderType } from "../components/constants";

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

const initialState: InquiryFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  orderType: "general",
  products: "",
  quantity: "",
  message: "",
  agreed: false,
};

export function useInquiryForm() {
  const [form, setForm] = useState<InquiryFormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const setField = (field: keyof InquiryFormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  const reset = () => {
    setForm(initialState);
    setSubmitted(false);
  };

  return { form, setField, submitted, loading, handleSubmit, reset };
}
