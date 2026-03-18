"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/features/auth";
import { fetchCustomerOrders, fetchAllOrders } from "../services/orderService";

/**
 * Hook to fetch and manage orders from NestJS backend
 * Automatically retrieves orders for the current authenticated user
 */
export function useFetchOrders(customerId?: number, isAdmin = false) {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { company } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        let fetchedOrders: any[] = [];

        // Use provided customerId or current user's ID
        if (isAdmin) {
          // Admin view - fetch all orders
          fetchedOrders = await fetchAllOrders();
        } else if (customerId) {
          // Fetch orders for specific user
          fetchedOrders = await fetchCustomerOrders(customerId);
        } else if (company?.userId) {
          // Fetch orders for logged-in user
          fetchedOrders = await fetchCustomerOrders(company.userId);
        } else {
          setOrders([]);
          return;
        }

        setOrders(fetchedOrders);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch orders");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customerId, company?.userId, isAdmin]);

  const refetchOrders = async () => {
    try {
      setLoading(true);
      let fetchedOrders: any[] = [];

      if (isAdmin) {
        fetchedOrders = await fetchAllOrders();
      } else if (customerId) {
        fetchedOrders = await fetchCustomerOrders(customerId);
      } else if (company?.userId) {
        fetchedOrders = await fetchCustomerOrders(company.userId);
      }

      setOrders(fetchedOrders);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to refetch orders");
    } finally {
      setLoading(false);
    }
  };

  return {
    orders,
    loading,
    error,
    refetchOrders,
  };
}
