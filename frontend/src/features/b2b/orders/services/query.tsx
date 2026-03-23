import { gql } from "@apollo/client";

/**
 * GraphQL Queries for Orders
 */
export const GET_CLIENT_ORDERS = gql`
  query GetClientOrders($userId: Int!) {
    clientOrders(userId: $userId) {
      orderId
      orderNumber
      productId
      userId
      orderType
      quantity
      unitPrice
      totalPrice
      deliveryFee
      grandTotal
      status
      deliveryStatus
      createdAt
      updatedAt
      paymentProofImage
    }
  }
`;

export const GET_ORDER_DETAILS = gql`
  query GetOrderDetails($orderId: Int!) {
    orderDetails(orderId: $orderId) {
      orderId
      orderNumber
      productId
      userId
      orderType
      quantity
      unitPrice
      totalPrice
      deliveryFee
      grandTotal
      status
      deliveryStatus
      createdAt
      updatedAt
      paymentProofImage
    }
  }
`;

export const GET_ALL_ORDERS = gql`
  query GetAllOrders {
    allOrders {
      orderId
      orderNumber
      productId
      userId
      orderType
      quantity
      unitPrice
      totalPrice
      deliveryFee
      grandTotal
      status
      deliveryStatus
      createdAt
      updatedAt
      paymentProofImage
    }
  }
`;