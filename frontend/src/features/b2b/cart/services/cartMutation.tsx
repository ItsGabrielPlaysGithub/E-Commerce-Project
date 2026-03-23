import { gql } from "@apollo/client";

export const ADD_TO_CART = gql`
  mutation AddToCart($userId: Int!, $input: AddToCartInput!) {
    addToCart(userId: $userId, input: $input) {
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
  }
`;

export const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($userId: Int!, $input: UpdateCartItemInput!) {
    updateCartItem(userId: $userId, input: $input) {
      id
      quantity
      updatedAt
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($userId: Int!, $itemId: Int!) {
    removeFromCart(userId: $userId, itemId: $itemId)
  }
`;

export const CLEAR_CART = gql`
  mutation ClearCart($userId: Int!) {
    clearCart(userId: $userId)
  }
`;

export const REMOVE_CART_ITEM_BY_PRODUCT_ID = gql`
  mutation RemoveCartItemByProductId($userId: Int!, $productId: Int!) {
    removeCartItemByProductId(userId: $userId, productId: $productId)
  }
`;
