import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderDto!) {
    createOrder(input: $input) {
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

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($input: UpdateOrderDto!) {
    updateOrder(input: $input) {
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

export const TRANSITION_ORDER_STATUS = gql`
  mutation TransitionOrderStatus($input: TransitionOrderStatusDto!) {
    transitionOrderStatus(input: $input) {
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
