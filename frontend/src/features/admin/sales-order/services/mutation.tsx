import { gql } from "@apollo/client";

export const CREATE_ADMIN_ORDER = gql`
  mutation CreateAdminOrder($input: CreateOrderDto!) {
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

export const UPDATE_ADMIN_ORDER = gql`
  mutation UpdateAdminOrder($input: UpdateOrderDto!) {
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

export const TRANSITION_ADMIN_ORDER_STATUS = gql`
  mutation TransitionAdminOrderStatus($input: TransitionOrderStatusDto!) {
    transitionOrderStatus(input: $input) {
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
