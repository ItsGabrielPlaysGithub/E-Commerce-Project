export const GET_PRODUCTS_QUERY = `
  query GetProducts {
    getProducts {
      productId
      productPrice
    }
  }
`;

export const CREATE_ORDER_MUTATION = `
  mutation CreateOrder($input: CreateOrderDto!) {
    createOrder(input: $input) {
      orderId
      productId
      userId
      quantity
      unitPrice
      totalPrice
      status
      createdAt
    }
  }
`;
