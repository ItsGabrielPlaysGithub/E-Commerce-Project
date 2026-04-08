import { gql } from "@apollo/client";

export const GET_CATALOG_DATA = gql`
  query GetCatalogData {
    getProducts {
      productId
      productName
      productDescription
      sku
      categoryId
      imageUrl
      category {
        categoryId
        categoryName
        slug
      }
      productPrice
      available
      createdAt
    }
    getCategories {
      categoryId
      categoryName
      slug
    }
  }
`;
