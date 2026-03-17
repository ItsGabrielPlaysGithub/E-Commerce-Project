import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      productId
      productName
      productDescription
      sku
      category
      productPrice
      reorderPoint
      available
      blocked
      createdAt
      updatedAt
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($productId: Int!) {
    getProductById(productId: $productId) {
      productId
      productName
      productDescription
      sku
      category
      productPrice
      reorderPoint
      available
      inTransit
      blocked
      createdAt
      updatedAt
    }
  }
`;
