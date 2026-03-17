import { gql } from "@apollo/client";

export const GET_ALL_ORDERS = gql`
  query AllOrders {
    allOrders {
      orderId
      orderNumber
      userId
      productId
      orderType
      quantity
      unitPrice
      totalPrice
      status
      deliveryStatus
      paymentMethod
      paymentProofImage
      paymentProofUploadedAt
      paymongoTransactionId
      paymongoAmount
      paymongoPaymentMethod
      paymongoTimestamp
      createdAt
      updatedAt
    }
  }
`;

export const GET_ORDER_DETAILS = gql`
  query OrderDetails($orderId: Int!) {
    orderDetails(orderId: $orderId) {
      orderId
      orderNumber
      userId
      productId
      orderType
      quantity
      unitPrice
      totalPrice
      status
      deliveryStatus
      paymentMethod
      paymentProofImage
      paymentProofUploadedAt
      paymongoTransactionId
      paymongoAmount
      paymongoPaymentMethod
      paymongoTimestamp
      createdAt
      updatedAt
    }
  }
`;

export const GET_CLIENT_ORDERS = gql`
  query ClientOrders($userId: Int!) {
    clientOrders(userId: $userId) {
      orderId
      orderNumber
      userId
      productId
      orderType
      quantity
      unitPrice
      totalPrice
      status
      deliveryStatus
      paymentMethod
      paymentProofImage
      paymentProofUploadedAt
      paymongoTransactionId
      paymongoAmount
      paymongoPaymentMethod
      paymongoTimestamp
      createdAt
      updatedAt
    }
  }
`;
