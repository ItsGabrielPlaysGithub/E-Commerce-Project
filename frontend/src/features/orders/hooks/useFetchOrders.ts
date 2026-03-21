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
    // Use grandTotal if available (from first item in group with delivery fee), otherwise use totalPrice
    total: backendOrder.grandTotal || backendOrder.totalPrice || 0,
    status: mapOrderStatus(backendOrder.status),
    paymentStatus: "Pending",
    deliveryMethod: backendOrder.deliveryStatus || "Standard",
  };
}

/**
 * Group orders by orderNumber and calculate totals
 */
function groupAndMapOrders(backendOrders: any[]): Order[] {
  const groupedByOrderNumber = new Map<string, any[]>();

  // Group all orders by orderNumber
  for (const order of backendOrders) {
    const orderNumber = order.orderNumber || order.orderId.toString();
    if (!groupedByOrderNumber.has(orderNumber)) {
      groupedByOrderNumber.set(orderNumber, []);
    }
    groupedByOrderNumber.get(orderNumber)!.push(order);
  }

  // Transform each group into a single Order object
  const mappedOrders: Order[] = [];
  for (const [orderNumber, orders] of groupedByOrderNumber) {
    const firstOrder = orders[0];
    
    // Calculate subtotal (sum of all items)
    const subtotal = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
    
    // Determine delivery fee (1500 threshold)
    const deliveryFee = firstOrder.deliveryFee !== undefined && firstOrder.deliveryFee !== null 
      ? firstOrder.deliveryFee 
      : (subtotal >= 1500 ? 0 : 350);
    
    // Use grandTotal from first item if available, otherwise calculate from subtotal + delivery fee
    const total = firstOrder.grandTotal || (subtotal + deliveryFee);
    
    const mappedOrder = {
      id: firstOrder.orderId?.toString() || orderNumber,
      sapSo: orderNumber,
      date: firstOrder.createdAt || new Date().toLocaleDateString(),
      customer: "",
      items: orders.map(o => ({
        sku: o.productId?.toString() || "",
        name: "", // Backend doesn't return product name
        qty: o.quantity || 1,
        unitPrice: o.unitPrice || 0,
        total: o.totalPrice || 0,
      })),
      subtotal: subtotal,
      vat: 0,
      total: total,
      status: mapOrderStatus(firstOrder.status),
      paymentStatus: "Pending",
      deliveryMethod: firstOrder.deliveryStatus || "Standard",
      deliveryFee: deliveryFee, // Store delivery fee for display
      paymentProofImage: firstOrder.paymentProofImage 
        ? `http://localhost:4000/uploads/payment-proofs/${firstOrder.paymentProofImage}`
        : undefined,
    } as any;
    
    mappedOrders.push(mappedOrder);
  }

  return mappedOrders;
}

/**
 * Map backend status to frontend OrderStatus
 */
function mapOrderStatus(status: string): "PENDING_APPROVAL" | "APPROVED" | "REJECTED" | "ORDERED_FROM_SUPPLIER" | "READY_FOR_BILLING" | "AWAITING_PAYMENT_VERIFICATION" | "PAID" | "DELIVERED" {
  const statusMap: Record<string, any> = {
    "PENDING_APPROVAL": "PENDING_APPROVAL",
    "APPROVED": "APPROVED",
    "REJECTED": "REJECTED",
    "ORDERED_FROM_SUPPLIER": "ORDERED_FROM_SUPPLIER",
    "READY_FOR_BILLING": "READY_FOR_BILLING",
    "AWAITING_PAYMENT_VERIFICATION": "AWAITING_PAYMENT_VERIFICATION",
    "PAID": "PAID",
    "DELIVERED": "DELIVERED",
    // Legacy mappings for backward compatibility
    "IN_TRANSIT": "DELIVERED",
    "CANCELLED": "REJECTED",
  };
  return statusMap[status] || status;
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

        // Map and group backend orders by orderNumber
        const mappedOrders = groupAndMapOrders(fetchedOrders);
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

      // Map and group backend orders by orderNumber
      const mappedOrders = groupAndMapOrders(fetchedOrders);
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
