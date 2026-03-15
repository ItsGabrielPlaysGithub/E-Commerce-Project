import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      productId
      productName
      productDescription
      productPrice
      createdAt
      updatedAt
    }
  }
`;

