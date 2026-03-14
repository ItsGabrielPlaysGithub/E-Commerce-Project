export interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface PlaceOrderRequest {
  items: OrderItem[];
  delivery: {
    address: string;
    contactPerson: string;
    contactNumber: string;
    deliveryDate: string;
    notes: string;
  };
  subtotal: number;
  deliveryFee: number;
  grandTotal: number;
  companyId?: string;
}

export type JwtPayload = {
  userId?: number;
  exp?: number;
};

export type ProductRow = {
  productId: number;
  productPrice: number | string;
};

export type CreateOrderMutationResult = {
  createOrder: {
    orderId: number;
    productId: number;
    userId: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    status: string;
    createdAt: string;
  };
};

export type GetProductsQueryResult = {
  getProducts: ProductRow[];
};
