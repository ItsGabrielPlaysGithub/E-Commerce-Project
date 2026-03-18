"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/features/auth";
import { fetchCustomerOrders, fetchAllOrders } from "../services/orderService";
import type { Order } from "../types/order";

/**
 * Map backend order response to frontend Order interface
 */
function mapBackendOrderToOrder(backendOrder: any): Order {
  return {
    id: backendOrder.orderId?.toString() || backendOrder.orderNumber || "",
    sapSo: backendOrder.orderNumber || "",
    date: backendOrder.createdAt || new Date().toLocaleDateString(),
    customer: "", // Backend doesn't return customer name, may need to join with users table
    items: [],
    subtotal: 0,
    vat: 0,
    total: backendOrder.totalPrice || 0,
    status: mapOrderStatus(backendOrder.status),
    paymentStatus: "Pending",
    deliveryMethod: backendOrder.deliveryStatus || "Standard",
  };
}

/**
 * Map backend status to frontend OrderStatus
 */
function mapOrderStatus(status: string): "All" | "Open" | "Processing" | "Shipped" | "Delivered" | "Cancelled" {
  const statusMap: Record<string, any> = {
    "PENDING_APPROVAL": "Open",
    "APPROVED": "Processing",
    "IN_TRANSIT": "Shipped",
    "DELIVERED": "Delivered",
    "CANCELLED": "Cancelled",
  };
  return statusMap[status] || "Open";
}

/**
 * Hook to fetch and manage orders from NestJS backend
 * Automatically retrieves orders for the current authenticated user
 */
export function useFetchOrders(customerId?: number, isAdmin = false) {
  const [orders, setOrders] = useState<Order[]>([]);
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

        // Map backend orders to frontend Order interface
        const mappedOrders = fetchedOrders.map(mapBackendOrderToOrder);
        setOrders(mappedOrders);
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

      // Map backend orders to frontend Order interface
      const mappedOrders = fetchedOrders.map(mapBackendOrderToOrder);
      setOrders(mappedOrders);
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
