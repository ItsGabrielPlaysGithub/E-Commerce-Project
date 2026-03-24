"use client";

import { useQuery } from "@apollo/client/react";
import { useAuth } from "@/features/auth";
import { GET_ALL_INVOICES } from "../services/query";
import type { Invoice } from "../services/invoiceService";

export interface UseFetchInvoicesReturn {
  invoices: Invoice[] | null;
  loading: boolean;
  error: any;
  refetch: () => void;
}

/**
 * Custom hook to fetch all invoices using Apollo Client
 */
export const useFetchInvoices = (): UseFetchInvoicesReturn => {
  const { isLoggedIn } = useAuth();

  const { data, loading, error, refetch } = useQuery<{ allInvoices: Invoice[] }>(GET_ALL_INVOICES, {
    // Only run query if user is logged in
    // httpOnly cookie is sent automatically by browser with credentials: "include"
    skip: !isLoggedIn,
  });

  return {
    invoices: data?.allInvoices || null,
    loading,
    error,
    refetch,
  };
};
