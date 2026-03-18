import { apolloClient } from "@/lib/apolloClient";
import {
  GET_CLIENT_ORDERS,
  GET_ORDER_DETAILS,
  GET_ALL_ORDERS,
} from "./query";
import {
  CREATE_ORDER,
  UPDATE_ORDER,
  TRANSITION_ORDER_STATUS
} from "./mutation";
import type { Order, OrderItem, OrderStatus } from "../types/order";

/**
 * Type definitions for GraphQL responses
 */
interface OrdersResponse {
  clientOrders?: any[];
  allOrders?: any[];
  orderDetails?: any;
  createOrder?: any;
  transitionOrderStatus?: any;
}

/**
 * Create a new order from cart items
 * Calls the NestJS backend createOrder mutation
 */
export async function createOrderFromCart(
  items: { productId: number; quantity: number; unitPrice: number }[],
  userId: number,
  orderType?: string
): Promise<any[]> {
  try {
    // For now, create individual orders for each item
    // Adjust based on your backend's actual requirements
    const responses = await Promise.all(
      items.map((item) =>
        apolloClient.mutate<OrdersResponse>({
          mutation: CREATE_ORDER,
          variables: {
            input: {
              productId: item.productId,
              userId,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              totalPrice: item.quantity * item.unitPrice,
              orderType,
            },
          },
        })
      )
    );

    return responses
      .map((response) => response.data?.createOrder)
      .filter(Boolean);
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

/**
 * Fetch all orders for a customer
 * Calls the NestJS backend clientOrders query
 */
export async function fetchCustomerOrders(userId: number): Promise<any[]> {
  try {
    const response = await apolloClient.query<OrdersResponse>({
      query: GET_CLIENT_ORDERS,
      variables: { userId },
      fetchPolicy: "network-only", // Bypass cache to get fresh data
    });

    return response.data?.clientOrders || [];
  } catch (error) {
    console.error("Error fetching customer orders:", error);
    throw error;
  }
}

/**
 * Fetch all orders (admin only)
 * Calls the NestJS backend allOrders query
 */
export async function fetchAllOrders(): Promise<any[]> {
  try {
    const response = await apolloClient.query<OrdersResponse>({
      query: GET_ALL_ORDERS,
      fetchPolicy: "network-only",
    });

    return response.data?.allOrders || [];
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error;
  }
}

/**
 * Fetch a single order by ID
 * Calls the NestJS backend orderDetails query
 */
export async function fetchOrderById(orderId: number): Promise<any> {
  try {
    const response = await apolloClient.query<OrdersResponse>({
      query: GET_ORDER_DETAILS,
      variables: { orderId },
      fetchPolicy: "network-only",
    });

    return response.data?.orderDetails || null;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
}

/**
 * Update order status
 * Calls the NestJS backend transitionOrderStatus mutation
 */
export async function updateOrderStatus(
  orderId: number,
  newStatus: OrderStatus
): Promise<any> {
  try {
    const response = await apolloClient.mutate<OrdersResponse>({
      mutation: TRANSITION_ORDER_STATUS,
      variables: {
        input: {
          orderId,
          newStatus,
        },
      },
    });

    return response.data?.transitionOrderStatus || null;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
}

/**
 * Initialize with mock orders for development
 * No longer needed - data comes from NestJS backend
 */
export function initializeWithMockOrders(mockOrders: any[]) {
  console.warn(
    "initializeWithMockOrders is deprecated. Orders are now fetched from NestJS backend."
  );
}
