import { gql } from "@apollo/client";

export const GET_CART = gql`
  query GetCart($userId: Int!) {
    getCart(userId: $userId) {
      items {
        id
        userId
        productId
        quantity
        unitPrice
        selectedColor
        selectedSize
        createdAt
        updatedAt
      }
      totalItems
      totalPrice
    }
  }
`;
