import { gql } from "@apollo/client";

export const GET_ALL_ORDERS = gql`
  query AllOrders {
    allOrders {
      orderId
      userId
      productId
      quantity
      status
      totalPrice
      createdAt
      updatedAt
    }
  }
`;

export const GET_ORDER_DETAILS = gql`
  query OrderDetails($orderId: Int!) {
    orderDetails(orderId: $orderId) {
      orderId
      userId
      productId
      quantity
      status
      totalPrice
      createdAt
      updatedAt
    }
  }
`;

export const GET_CLIENT_ORDERS = gql`
  query ClientOrders($userId: Int!) {
    clientOrders(userId: $userId) {
      orderId
      userId
      productId
      quantity
      status
      totalPrice
      createdAt
      updatedAt
    }
  }
`;
