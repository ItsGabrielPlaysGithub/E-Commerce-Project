import { gql } from "@apollo/client";

/**
 * GraphQL Queries for Orders
 */
export const GET_CLIENT_ORDERS = gql`
  query GetClientOrders {
    clientOrders {
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
      paymentProofImage
      paymentProofStatus
      paymentProofRejectionReason
      paymentProofAttempts
      paymongoTransactionId
      createdAt
      updatedAt
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
      paymentProofImage
      paymentProofStatus
      paymentProofRejectionReason
      paymentProofAttempts
      paymongoTransactionId
      createdAt
      updatedAt
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
      paymentProofStatus
      paymentProofRejectionReason
      paymentProofAttempts
    }
  }
`;

/**
 * Notifications Query
 */
export const GET_NOTIFICATIONS = gql`
  query GetNotificationsByUserId {
    getNotificationsByUserId {
      notificationId
      userId
      type
      title
      message
      orderId
      isRead
      createdAt
      readAt
      metadata
    }
  }
`;

/**
 * Mark Notification as Read Mutation
 */
export const MARK_NOTIFICATION_AS_READ = gql`
  mutation MarkNotificationAsRead($notificationId: Int!) {
    markNotificationAsRead(notificationId: $notificationId) {
      notificationId
      isRead
      readAt
    }
  }
`;

/**
 * Mark All Notifications as Read Mutation
 */
export const MARK_ALL_NOTIFICATIONS_AS_READ = gql`
  mutation MarkAllNotificationsAsRead {
    markAllNotificationsAsRead {
      notificationId
      isRead
      readAt
    }
  }
`;