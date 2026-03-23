/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AddToCartInput = {
  productId: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
  selectedColor?: InputMaybe<Scalars['String']['input']>;
  selectedSize?: InputMaybe<Scalars['String']['input']>;
  unitPrice: Scalars['Float']['input'];
};

export type AssignmentResult = {
  __typename?: 'AssignmentResult';
  count: Scalars['Int']['output'];
  message: Scalars['String']['output'];
};

export type CartItem = {
  __typename?: 'CartItem';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  productId: Scalars['Int']['output'];
  quantity: Scalars['Int']['output'];
  selectedColor?: Maybe<Scalars['String']['output']>;
  selectedSize?: Maybe<Scalars['String']['output']>;
  unitPrice: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['Int']['output'];
};

export type CartResponse = {
  __typename?: 'CartResponse';
  items: Array<CartItem>;
  totalItems: Scalars['Float']['output'];
  totalPrice: Scalars['Float']['output'];
};

export type CategoriesTbl = {
  __typename?: 'CategoriesTbl';
  categoryId: Scalars['Int']['output'];
  categoryName: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  products?: Maybe<Array<ProductsTbl>>;
  skuPrefix: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateCategoryDto = {
  categoryName: Scalars['String']['input'];
  skuPrefix: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

export type CreateNotificationDto = {
  message: Scalars['String']['input'];
  metadata?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

export type CreateOrderDto = {
  deliveryStatus?: InputMaybe<Scalars['String']['input']>;
  orderNumber: Scalars['String']['input'];
  orderType?: InputMaybe<Scalars['String']['input']>;
  paymentMethod?: InputMaybe<Scalars['String']['input']>;
  paymentProofImage?: InputMaybe<Scalars['String']['input']>;
  paymentProofUploadedAt?: InputMaybe<Scalars['DateTime']['input']>;
  paymongoAmount?: InputMaybe<Scalars['Float']['input']>;
  paymongoPaymentMethod?: InputMaybe<Scalars['String']['input']>;
  paymongoTimestamp?: InputMaybe<Scalars['DateTime']['input']>;
  paymongoTransactionId?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
  totalPrice: Scalars['Float']['input'];
  unitPrice: Scalars['Float']['input'];
  userId: Scalars['Int']['input'];
};

export type CreateProductDto = {
  available: Scalars['Float']['input'];
  blocked?: InputMaybe<Scalars['Float']['input']>;
  categoryId: Scalars['Int']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  inTransit?: InputMaybe<Scalars['Float']['input']>;
  productDescription?: InputMaybe<Scalars['String']['input']>;
  productName: Scalars['String']['input'];
  productPrice: Scalars['Float']['input'];
  reorderPoint: Scalars['Float']['input'];
  sku: Scalars['String']['input'];
};

export type CreateUserDto = {
  address: Scalars['String']['input'];
  companyName: Scalars['String']['input'];
  emailAddress: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  middleName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type DeliveryDetailsInput = {
  address: Scalars['String']['input'];
  contactNumber: Scalars['String']['input'];
  contactPerson: Scalars['String']['input'];
  deliveryDate: Scalars['DateTime']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
};

export type InvoicesTbl = {
  __typename?: 'InvoicesTbl';
  createdAt: Scalars['DateTime']['output'];
  dueDate: Scalars['DateTime']['output'];
  invoiceId: Scalars['Float']['output'];
  invoiceNumber: Scalars['String']['output'];
  order: OrdersTbl;
  orderId: Scalars['Float']['output'];
  paymentStatus: Scalars['String']['output'];
  totalAmount: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: UsersTbl;
  userId: Scalars['Float']['output'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addToCart: CartItem;
  approvePaymentProof: OrdersTbl;
  assignRandomCategoriesToProducts: AssignmentResult;
  clearCart: Scalars['Boolean']['output'];
  createCategory: CategoriesTbl;
  createNotification: NotificationsTbl;
  createOrder: OrdersTbl;
  createProduct: ProductsTbl;
  createUser: UsersTbl;
  deleteCategory: CategoriesTbl;
  deleteNotification: Scalars['Boolean']['output'];
  deleteProduct: ProductsTbl;
  deleteUser: UsersTbl;
  login: LoginResponse;
  logout: LoginResponse;
  markAllNotificationsAsRead: Array<NotificationsTbl>;
  markNotificationAsRead: NotificationsTbl;
  payInvoiceByOrderId: InvoicesTbl;
  placeOrder: PlaceOrderResponse;
  rejectPaymentProof: OrdersTbl;
  removeCartItemByProductId: Scalars['Boolean']['output'];
  removeFromCart: Scalars['Boolean']['output'];
  transitionOrderStatus: OrdersTbl;
  updateCartItem: CartItem;
  updateCategory: CategoriesTbl;
  updateOrder: OrdersTbl;
  updateProduct: ProductsTbl;
  updateUser: UsersTbl;
};


export type MutationAddToCartArgs = {
  input: AddToCartInput;
  userId: Scalars['Int']['input'];
};


export type MutationApprovePaymentProofArgs = {
  orderId: Scalars['Int']['input'];
};


export type MutationClearCartArgs = {
  userId: Scalars['Int']['input'];
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryDto;
};


export type MutationCreateNotificationArgs = {
  input: CreateNotificationDto;
};


export type MutationCreateOrderArgs = {
  input: CreateOrderDto;
};


export type MutationCreateProductArgs = {
  input: CreateProductDto;
};


export type MutationCreateUserArgs = {
  input: CreateUserDto;
};


export type MutationDeleteCategoryArgs = {
  categoryId: Scalars['Int']['input'];
};


export type MutationDeleteNotificationArgs = {
  notificationId: Scalars['Int']['input'];
};


export type MutationDeleteProductArgs = {
  productId: Scalars['Int']['input'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  emailAddress: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationMarkAllNotificationsAsReadArgs = {
  userId: Scalars['Int']['input'];
};


export type MutationMarkNotificationAsReadArgs = {
  notificationId: Scalars['Int']['input'];
};


export type MutationPayInvoiceByOrderIdArgs = {
  orderId: Scalars['Int']['input'];
};


export type MutationPlaceOrderArgs = {
  input: PlaceOrderInput;
};


export type MutationRejectPaymentProofArgs = {
  input: RejectPaymentProofDto;
};


export type MutationRemoveCartItemByProductIdArgs = {
  productId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationRemoveFromCartArgs = {
  itemId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationTransitionOrderStatusArgs = {
  input: TransitionOrderStatusDto;
};


export type MutationUpdateCartItemArgs = {
  input: UpdateCartItemInput;
  userId: Scalars['Int']['input'];
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['Int']['input'];
  input: UpdateCategoryDto;
};


export type MutationUpdateOrderArgs = {
  input: UpdateOrderDto;
};


export type MutationUpdateProductArgs = {
  id: Scalars['Int']['input'];
  input: UpdateProductDto;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserDto;
};

export type NotificationsTbl = {
  __typename?: 'NotificationsTbl';
  createdAt: Scalars['DateTime']['output'];
  isRead: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  metadata?: Maybe<Scalars['String']['output']>;
  notificationId: Scalars['Int']['output'];
  orderId?: Maybe<Scalars['Int']['output']>;
  readAt?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  userId: Scalars['Float']['output'];
};

export type OrderItemInput = {
  productId: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
  unitPrice: Scalars['Float']['input'];
};

export type OrdersTbl = {
  __typename?: 'OrdersTbl';
  createdAt: Scalars['DateTime']['output'];
  deliveryFee?: Maybe<Scalars['Float']['output']>;
  deliveryStatus?: Maybe<Scalars['String']['output']>;
  grandTotal?: Maybe<Scalars['Float']['output']>;
  orderId: Scalars['Float']['output'];
  orderNumber?: Maybe<Scalars['String']['output']>;
  orderType?: Maybe<Scalars['String']['output']>;
  paymentMethod?: Maybe<Scalars['String']['output']>;
  paymentProofAttempts: Scalars['Float']['output'];
  paymentProofImage?: Maybe<Scalars['String']['output']>;
  paymentProofRejectionReason?: Maybe<Scalars['String']['output']>;
  paymentProofStatus?: Maybe<Scalars['String']['output']>;
  paymentProofUploadedAt?: Maybe<Scalars['DateTime']['output']>;
  paymongoAmount?: Maybe<Scalars['Float']['output']>;
  paymongoPaymentMethod?: Maybe<Scalars['String']['output']>;
  paymongoTimestamp?: Maybe<Scalars['DateTime']['output']>;
  paymongoTransactionId?: Maybe<Scalars['String']['output']>;
  productId: Scalars['Float']['output'];
  quantity: Scalars['Float']['output'];
  rejectionReason?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  totalPrice: Scalars['Float']['output'];
  unitPrice: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['Float']['output'];
};

export type PlaceOrderInput = {
  companyId?: InputMaybe<Scalars['String']['input']>;
  delivery: DeliveryDetailsInput;
  deliveryFee: Scalars['Float']['input'];
  grandTotal: Scalars['Float']['input'];
  items: Array<OrderItemInput>;
  paymentMethod: Scalars['String']['input'];
  subtotal: Scalars['Float']['input'];
  userId: Scalars['Int']['input'];
};

export type PlaceOrderResponse = {
  __typename?: 'PlaceOrderResponse';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  message: Scalars['String']['output'];
  orderId?: Maybe<Scalars['Int']['output']>;
  orderNumber: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type ProductsTbl = {
  __typename?: 'ProductsTbl';
  available: Scalars['Int']['output'];
  blocked: Scalars['Int']['output'];
  category?: Maybe<CategoriesTbl>;
  categoryId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  inTransit: Scalars['Int']['output'];
  productDescription: Scalars['String']['output'];
  productId: Scalars['Int']['output'];
  productName: Scalars['String']['output'];
  productPrice: Scalars['Float']['output'];
  reorderPoint: Scalars['Int']['output'];
  sku: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  allInvoices: Array<InvoicesTbl>;
  allOrders: Array<OrdersTbl>;
  clientOrders: Array<OrdersTbl>;
  getAllUsers: Array<UsersTbl>;
  getCart: CartResponse;
  getCategories: Array<CategoriesTbl>;
  getCategoryById: CategoriesTbl;
  getCategoryBySlug: CategoriesTbl;
  getNotification: NotificationsTbl;
  getNotificationsByUserId: Array<NotificationsTbl>;
  getProductById: ProductsTbl;
  getProductByName: ProductsTbl;
  getProducts: Array<ProductsTbl>;
  getUnreadNotificationCount: Scalars['Int']['output'];
  invoiceByOrderId?: Maybe<InvoicesTbl>;
  orderDetails: OrdersTbl;
  readProfile: UsersTbl;
};


export type QueryClientOrdersArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryGetCartArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryGetCategoryByIdArgs = {
  categoryId: Scalars['Int']['input'];
};


export type QueryGetCategoryBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryGetNotificationArgs = {
  notificationId: Scalars['Int']['input'];
};


export type QueryGetNotificationsByUserIdArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryGetProductByIdArgs = {
  productId: Scalars['Int']['input'];
};


export type QueryGetProductByNameArgs = {
  productName: Scalars['String']['input'];
};


export type QueryGetUnreadNotificationCountArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryInvoiceByOrderIdArgs = {
  orderId: Scalars['Int']['input'];
};


export type QueryOrderDetailsArgs = {
  orderId: Scalars['Int']['input'];
};


export type QueryReadProfileArgs = {
  userId: Scalars['Int']['input'];
};

export type RejectPaymentProofDto = {
  orderId: Scalars['Int']['input'];
  rejectionReason: Scalars['String']['input'];
};

export type TransitionOrderStatusDto = {
  nextStatus: Scalars['String']['input'];
  orderId: Scalars['Int']['input'];
  rejectionReason?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCartItemInput = {
  id: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
};

export type UpdateCategoryDto = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  categoryName?: InputMaybe<Scalars['String']['input']>;
  skuPrefix?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOrderDto = {
  deliveryStatus?: InputMaybe<Scalars['String']['input']>;
  orderId: Scalars['Float']['input'];
  orderNumber?: InputMaybe<Scalars['String']['input']>;
  orderType?: InputMaybe<Scalars['String']['input']>;
  paymentMethod?: InputMaybe<Scalars['String']['input']>;
  paymentProofImage?: InputMaybe<Scalars['String']['input']>;
  paymentProofUploadedAt?: InputMaybe<Scalars['DateTime']['input']>;
  paymongoAmount?: InputMaybe<Scalars['Float']['input']>;
  paymongoPaymentMethod?: InputMaybe<Scalars['String']['input']>;
  paymongoTimestamp?: InputMaybe<Scalars['DateTime']['input']>;
  paymongoTransactionId?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['Int']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  totalPrice?: InputMaybe<Scalars['Float']['input']>;
  unitPrice?: InputMaybe<Scalars['Float']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateProductDto = {
  available?: InputMaybe<Scalars['Float']['input']>;
  blocked?: InputMaybe<Scalars['Float']['input']>;
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  inTransit?: InputMaybe<Scalars['Float']['input']>;
  productDescription?: InputMaybe<Scalars['String']['input']>;
  productName?: InputMaybe<Scalars['String']['input']>;
  productPrice?: InputMaybe<Scalars['Float']['input']>;
  reorderPoint?: InputMaybe<Scalars['Float']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserDto = {
  address?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  emailAddress?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['Float']['input'];
};

export type UsersTbl = {
  __typename?: 'UsersTbl';
  address: Scalars['String']['output'];
  companyName: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  emailAddress: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  middleName: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  profPicture: Scalars['String']['output'];
  role: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['Float']['output'];
};

export type PayInvoiceByOrderIdMutationVariables = Exact<{
  orderId: Scalars['Int']['input'];
}>;


export type PayInvoiceByOrderIdMutation = { __typename?: 'Mutation', payInvoiceByOrderId: { __typename?: 'InvoicesTbl', invoiceId: number, orderId: number, invoiceNumber: string, totalAmount: number, paymentStatus: string, dueDate: any, updatedAt: any } };

export type GetAllInvoicesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllInvoicesQuery = { __typename?: 'Query', allInvoices: Array<{ __typename?: 'InvoicesTbl', invoiceId: number, orderId: number, userId: number, invoiceNumber: string, totalAmount: number, dueDate: any, paymentStatus: string, createdAt: any, updatedAt: any }> };

export type GetInvoiceByIdQueryVariables = Exact<{
  invoiceId: Scalars['Int']['input'];
}>;


export type GetInvoiceByIdQuery = { __typename?: 'Query', invoiceByOrderId?: { __typename?: 'InvoicesTbl', invoiceId: number, orderId: number, userId: number, invoiceNumber: string, totalAmount: number, dueDate: any, paymentStatus: string, createdAt: any, updatedAt: any } | null };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'CategoriesTbl', categoryId: number, categoryName: string, slug: string, skuPrefix: string, createdAt: any, updatedAt: any }> };

export type CreateCategoryMutationVariables = Exact<{
  input: CreateCategoryDto;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'CategoriesTbl', categoryId: number, categoryName: string, slug: string, skuPrefix: string, createdAt: any, updatedAt: any } };

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: UpdateCategoryDto;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory: { __typename?: 'CategoriesTbl', categoryId: number, categoryName: string, slug: string, skuPrefix: string, createdAt: any, updatedAt: any } };

export type DeleteCategoryMutationVariables = Exact<{
  categoryId: Scalars['Int']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: { __typename?: 'CategoriesTbl', categoryId: number } };

export type AssignRandomCategoriesToProductsMutationVariables = Exact<{ [key: string]: never; }>;


export type AssignRandomCategoriesToProductsMutation = { __typename?: 'Mutation', assignRandomCategoriesToProducts: { __typename?: 'AssignmentResult', message: string, count: number } };

export type CreateProductMutationVariables = Exact<{
  input: CreateProductDto;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'ProductsTbl', productId: number, productName: string, productDescription: string, imageUrl?: string | null, sku: string, categoryId: number, productPrice: number, reorderPoint: number, available: number, blocked: number, inTransit: number, createdAt: any, updatedAt: any, category?: { __typename?: 'CategoriesTbl', categoryId: number, categoryName: string, slug: string } | null } };

export type UpdateProductMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: UpdateProductDto;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct: { __typename?: 'ProductsTbl', productId: number, productName: string, productDescription: string, imageUrl?: string | null, sku: string, categoryId: number, productPrice: number, reorderPoint: number, available: number, blocked: number, inTransit: number, createdAt: any, updatedAt: any, category?: { __typename?: 'CategoriesTbl', categoryId: number, categoryName: string, slug: string } | null } };

export type DeleteProductMutationVariables = Exact<{
  productId: Scalars['Int']['input'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct: { __typename?: 'ProductsTbl', productId: number } };

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', getProducts: Array<{ __typename?: 'ProductsTbl', productId: number, productName: string, productDescription: string, sku: string, categoryId: number, imageUrl?: string | null, productPrice: number, reorderPoint: number, available: number, blocked: number, inTransit: number, createdAt: any, updatedAt: any, category?: { __typename?: 'CategoriesTbl', categoryId: number, categoryName: string, slug: string } | null }> };

export type GetProductByIdQueryVariables = Exact<{
  productId: Scalars['Int']['input'];
}>;


export type GetProductByIdQuery = { __typename?: 'Query', getProductById: { __typename?: 'ProductsTbl', productId: number, productName: string, productDescription: string, sku: string, categoryId: number, imageUrl?: string | null, productPrice: number, reorderPoint: number, available: number, inTransit: number, blocked: number, createdAt: any, updatedAt: any, category?: { __typename?: 'CategoriesTbl', categoryId: number, categoryName: string, slug: string } | null } };

export type GetProductByNameQueryVariables = Exact<{
  productName: Scalars['String']['input'];
}>;


export type GetProductByNameQuery = { __typename?: 'Query', getProductByName: { __typename?: 'ProductsTbl', productId: number, productName: string, productDescription: string, sku: string, categoryId: number, imageUrl?: string | null, productPrice: number, reorderPoint: number, available: number, inTransit: number, blocked: number, createdAt: any, updatedAt: any, category?: { __typename?: 'CategoriesTbl', categoryId: number, categoryName: string, slug: string } | null } };

export type RejectPaymentProofMutationVariables = Exact<{
  input: RejectPaymentProofDto;
}>;


export type RejectPaymentProofMutation = { __typename?: 'Mutation', rejectPaymentProof: { __typename?: 'OrdersTbl', orderId: number, status: string, paymentProofStatus?: string | null, paymentProofAttempts: number, paymentProofRejectionReason?: string | null, rejectionReason?: string | null } };

export type CreateAdminOrderMutationVariables = Exact<{
  input: CreateOrderDto;
}>;


export type CreateAdminOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'OrdersTbl', orderId: number, userId: number, productId: number, quantity: number, status: string, totalPrice: number, createdAt: any, updatedAt: any } };

export type UpdateAdminOrderMutationVariables = Exact<{
  input: UpdateOrderDto;
}>;


export type UpdateAdminOrderMutation = { __typename?: 'Mutation', updateOrder: { __typename?: 'OrdersTbl', orderId: number, userId: number, productId: number, quantity: number, status: string, totalPrice: number, createdAt: any, updatedAt: any } };

export type TransitionAdminOrderStatusMutationVariables = Exact<{
  input: TransitionOrderStatusDto;
}>;


export type TransitionAdminOrderStatusMutation = { __typename?: 'Mutation', transitionOrderStatus: { __typename?: 'OrdersTbl', orderId: number, orderNumber?: string | null, userId: number, productId: number, orderType?: string | null, quantity: number, unitPrice: number, totalPrice: number, status: string, deliveryStatus?: string | null, paymentMethod?: string | null, paymentProofImage?: string | null, paymentProofUploadedAt?: any | null, paymongoTransactionId?: string | null, paymongoAmount?: number | null, paymongoPaymentMethod?: string | null, paymongoTimestamp?: any | null, createdAt: any, updatedAt: any } };

export type AllOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllOrdersQuery = { __typename?: 'Query', allOrders: Array<{ __typename?: 'OrdersTbl', orderId: number, orderNumber?: string | null, userId: number, productId: number, orderType?: string | null, quantity: number, unitPrice: number, totalPrice: number, status: string, deliveryStatus?: string | null, paymentMethod?: string | null, paymentProofImage?: string | null, paymentProofUploadedAt?: any | null, paymentProofStatus?: string | null, paymentProofRejectionReason?: string | null, paymentProofAttempts: number, paymongoTransactionId?: string | null, paymongoAmount?: number | null, paymongoPaymentMethod?: string | null, paymongoTimestamp?: any | null, createdAt: any, updatedAt: any }> };

export type OrderDetailsQueryVariables = Exact<{
  orderId: Scalars['Int']['input'];
}>;


export type OrderDetailsQuery = { __typename?: 'Query', orderDetails: { __typename?: 'OrdersTbl', orderId: number, orderNumber?: string | null, userId: number, productId: number, orderType?: string | null, quantity: number, unitPrice: number, totalPrice: number, status: string, deliveryStatus?: string | null, paymentMethod?: string | null, paymentProofImage?: string | null, paymentProofUploadedAt?: any | null, paymentProofStatus?: string | null, paymentProofRejectionReason?: string | null, paymentProofAttempts: number, paymongoTransactionId?: string | null, paymongoAmount?: number | null, paymongoPaymentMethod?: string | null, paymongoTimestamp?: any | null, createdAt: any, updatedAt: any } };

export type ClientOrdersQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type ClientOrdersQuery = { __typename?: 'Query', clientOrders: Array<{ __typename?: 'OrdersTbl', orderId: number, orderNumber?: string | null, userId: number, productId: number, orderType?: string | null, quantity: number, unitPrice: number, totalPrice: number, status: string, deliveryStatus?: string | null, paymentMethod?: string | null, paymentProofImage?: string | null, paymentProofUploadedAt?: any | null, paymentProofStatus?: string | null, paymentProofRejectionReason?: string | null, paymentProofAttempts: number, paymongoTransactionId?: string | null, paymongoAmount?: number | null, paymongoPaymentMethod?: string | null, paymongoTimestamp?: any | null, createdAt: any, updatedAt: any }> };

export type LoginMutationVariables = Exact<{
  emailAddress: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', message: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LoginResponse', message: string } };

export type ReadProfileQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type ReadProfileQuery = { __typename?: 'Query', readProfile: { __typename?: 'UsersTbl', userId: number, fullName: string, emailAddress: string, companyName: string, address: string, phoneNumber: string, role: string } };

export type AddToCartMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  input: AddToCartInput;
}>;


export type AddToCartMutation = { __typename?: 'Mutation', addToCart: { __typename?: 'CartItem', id: number, userId: number, productId: number, quantity: number, unitPrice: number, selectedColor?: string | null, selectedSize?: string | null, createdAt: any, updatedAt: any } };

export type UpdateCartItemMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  input: UpdateCartItemInput;
}>;


export type UpdateCartItemMutation = { __typename?: 'Mutation', updateCartItem: { __typename?: 'CartItem', id: number, quantity: number, updatedAt: any } };

export type RemoveFromCartMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  itemId: Scalars['Int']['input'];
}>;


export type RemoveFromCartMutation = { __typename?: 'Mutation', removeFromCart: boolean };

export type ClearCartMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type ClearCartMutation = { __typename?: 'Mutation', clearCart: boolean };

export type RemoveCartItemByProductIdMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  productId: Scalars['Int']['input'];
}>;


export type RemoveCartItemByProductIdMutation = { __typename?: 'Mutation', removeCartItemByProductId: boolean };

export type PlaceOrderMutationVariables = Exact<{
  input: PlaceOrderInput;
}>;


export type PlaceOrderMutation = { __typename?: 'Mutation', placeOrder: { __typename?: 'PlaceOrderResponse', success: boolean, orderNumber: string, message: string, orderId?: number | null, createdAt?: any | null } };

export type GetCartQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type GetCartQuery = { __typename?: 'Query', getCart: { __typename?: 'CartResponse', totalItems: number, totalPrice: number, items: Array<{ __typename?: 'CartItem', id: number, userId: number, productId: number, quantity: number, unitPrice: number, selectedColor?: string | null, selectedSize?: string | null, createdAt: any, updatedAt: any }> } };

export type CreateOrderMutationVariables = Exact<{
  input: CreateOrderDto;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'OrdersTbl', orderId: number, orderNumber?: string | null, productId: number, userId: number, orderType?: string | null, quantity: number, unitPrice: number, totalPrice: number, status: string, deliveryStatus?: string | null, createdAt: any, updatedAt: any } };

export type UpdateOrderMutationVariables = Exact<{
  input: UpdateOrderDto;
}>;


export type UpdateOrderMutation = { __typename?: 'Mutation', updateOrder: { __typename?: 'OrdersTbl', orderId: number, orderNumber?: string | null, productId: number, userId: number, orderType?: string | null, quantity: number, unitPrice: number, totalPrice: number, status: string, deliveryStatus?: string | null, createdAt: any, updatedAt: any } };

export type TransitionOrderStatusMutationVariables = Exact<{
  input: TransitionOrderStatusDto;
}>;


export type TransitionOrderStatusMutation = { __typename?: 'Mutation', transitionOrderStatus: { __typename?: 'OrdersTbl', orderId: number, orderNumber?: string | null, productId: number, userId: number, orderType?: string | null, quantity: number, unitPrice: number, totalPrice: number, status: string, deliveryStatus?: string | null, createdAt: any, updatedAt: any } };

export type GetClientOrdersQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type GetClientOrdersQuery = { __typename?: 'Query', clientOrders: Array<{ __typename?: 'OrdersTbl', orderId: number, orderNumber?: string | null, productId: number, userId: number, orderType?: string | null, quantity: number, unitPrice: number, totalPrice: number, deliveryFee?: number | null, grandTotal?: number | null, status: string, deliveryStatus?: string | null, createdAt: any, updatedAt: any, paymentProofImage?: string | null, paymentProofStatus?: string | null, paymentProofRejectionReason?: string | null, paymentProofAttempts: number }> };

export type GetOrderDetailsQueryVariables = Exact<{
  orderId: Scalars['Int']['input'];
}>;


export type GetOrderDetailsQuery = { __typename?: 'Query', orderDetails: { __typename?: 'OrdersTbl', orderId: number, orderNumber?: string | null, productId: number, userId: number, orderType?: string | null, quantity: number, unitPrice: number, totalPrice: number, deliveryFee?: number | null, grandTotal?: number | null, status: string, deliveryStatus?: string | null, createdAt: any, updatedAt: any, paymentProofImage?: string | null, paymentProofStatus?: string | null, paymentProofRejectionReason?: string | null, paymentProofAttempts: number } };

export type GetAllOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllOrdersQuery = { __typename?: 'Query', allOrders: Array<{ __typename?: 'OrdersTbl', orderId: number, orderNumber?: string | null, productId: number, userId: number, orderType?: string | null, quantity: number, unitPrice: number, totalPrice: number, deliveryFee?: number | null, grandTotal?: number | null, status: string, deliveryStatus?: string | null, createdAt: any, updatedAt: any, paymentProofImage?: string | null, paymentProofStatus?: string | null, paymentProofRejectionReason?: string | null, paymentProofAttempts: number }> };

export type GetNotificationsByUserIdQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type GetNotificationsByUserIdQuery = { __typename?: 'Query', getNotificationsByUserId: Array<{ __typename?: 'NotificationsTbl', notificationId: number, userId: number, type: string, title: string, message: string, orderId?: number | null, isRead: boolean, createdAt: any, readAt?: any | null, metadata?: string | null }> };

export type MarkNotificationAsReadMutationVariables = Exact<{
  notificationId: Scalars['Int']['input'];
}>;


export type MarkNotificationAsReadMutation = { __typename?: 'Mutation', markNotificationAsRead: { __typename?: 'NotificationsTbl', notificationId: number, isRead: boolean, readAt?: any | null } };

export type MarkAllNotificationsAsReadMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type MarkAllNotificationsAsReadMutation = { __typename?: 'Mutation', markAllNotificationsAsRead: Array<{ __typename?: 'NotificationsTbl', notificationId: number, isRead: boolean, readAt?: any | null }> };


export const PayInvoiceByOrderIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PayInvoiceByOrderId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payInvoiceByOrderId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invoiceId"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"invoiceNumber"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"paymentStatus"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<PayInvoiceByOrderIdMutation, PayInvoiceByOrderIdMutationVariables>;
export const GetAllInvoicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllInvoices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allInvoices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invoiceId"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"invoiceNumber"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"paymentStatus"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetAllInvoicesQuery, GetAllInvoicesQueryVariables>;
export const GetInvoiceByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetInvoiceById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invoiceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invoiceByOrderId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invoiceId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invoiceId"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"invoiceNumber"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"paymentStatus"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetInvoiceByIdQuery, GetInvoiceByIdQueryVariables>;
export const GetCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"categoryName"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"skuPrefix"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const CreateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCategoryDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"categoryName"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"skuPrefix"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const UpdateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCategoryDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"categoryName"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"skuPrefix"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const DeleteCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categoryId"}}]}}]}}]} as unknown as DocumentNode<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const AssignRandomCategoriesToProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AssignRandomCategoriesToProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignRandomCategoriesToProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<AssignRandomCategoriesToProductsMutation, AssignRandomCategoriesToProductsMutationVariables>;
export const CreateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProductDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"productDescription"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"categoryName"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"productPrice"}},{"kind":"Field","name":{"kind":"Name","value":"reorderPoint"}},{"kind":"Field","name":{"kind":"Name","value":"available"}},{"kind":"Field","name":{"kind":"Name","value":"blocked"}},{"kind":"Field","name":{"kind":"Name","value":"inTransit"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProductDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"productDescription"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"categoryName"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"productPrice"}},{"kind":"Field","name":{"kind":"Name","value":"reorderPoint"}},{"kind":"Field","name":{"kind":"Name","value":"available"}},{"kind":"Field","name":{"kind":"Name","value":"blocked"}},{"kind":"Field","name":{"kind":"Name","value":"inTransit"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateProductMutation, UpdateProductMutationVariables>;
export const DeleteProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productId"}}]}}]}}]} as unknown as DocumentNode<DeleteProductMutation, DeleteProductMutationVariables>;
export const GetProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"productDescription"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"categoryName"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"productPrice"}},{"kind":"Field","name":{"kind":"Name","value":"reorderPoint"}},{"kind":"Field","name":{"kind":"Name","value":"available"}},{"kind":"Field","name":{"kind":"Name","value":"blocked"}},{"kind":"Field","name":{"kind":"Name","value":"inTransit"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetProductsQuery, GetProductsQueryVariables>;
export const GetProductByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProductById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"productDescription"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"categoryName"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"productPrice"}},{"kind":"Field","name":{"kind":"Name","value":"reorderPoint"}},{"kind":"Field","name":{"kind":"Name","value":"available"}},{"kind":"Field","name":{"kind":"Name","value":"inTransit"}},{"kind":"Field","name":{"kind":"Name","value":"blocked"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetProductByIdQuery, GetProductByIdQueryVariables>;
export const GetProductByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProductByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"productDescription"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"categoryName"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"productPrice"}},{"kind":"Field","name":{"kind":"Name","value":"reorderPoint"}},{"kind":"Field","name":{"kind":"Name","value":"available"}},{"kind":"Field","name":{"kind":"Name","value":"inTransit"}},{"kind":"Field","name":{"kind":"Name","value":"blocked"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetProductByNameQuery, GetProductByNameQueryVariables>;
export const RejectPaymentProofDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RejectPaymentProof"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RejectPaymentProofDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rejectPaymentProof"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofStatus"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofAttempts"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofRejectionReason"}},{"kind":"Field","name":{"kind":"Name","value":"rejectionReason"}}]}}]}}]} as unknown as DocumentNode<RejectPaymentProofMutation, RejectPaymentProofMutationVariables>;
export const CreateAdminOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAdminOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOrderDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateAdminOrderMutation, CreateAdminOrderMutationVariables>;
export const UpdateAdminOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAdminOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateOrderDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateAdminOrderMutation, UpdateAdminOrderMutationVariables>;
export const TransitionAdminOrderStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TransitionAdminOrderStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TransitionOrderStatusDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transitionOrderStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"orderNumber"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"orderType"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryStatus"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofImage"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofUploadedAt"}},{"kind":"Field","name":{"kind":"Name","value":"paymongoTransactionId"}},{"kind":"Field","name":{"kind":"Name","value":"paymongoAmount"}},{"kind":"Field","name":{"kind":"Name","value":"paymongoPaymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"paymongoTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<TransitionAdminOrderStatusMutation, TransitionAdminOrderStatusMutationVariables>;
export const AllOrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllOrders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allOrders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"orderNumber"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"orderType"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryStatus"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofImage"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofUploadedAt"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofStatus"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofRejectionReason"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofAttempts"}},{"kind":"Field","name":{"kind":"Name","value":"paymongoTransactionId"}},{"kind":"Field","name":{"kind":"Name","value":"paymongoAmount"}},{"kind":"Field","name":{"kind":"Name","value":"paymongoPaymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"paymongoTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AllOrdersQuery, AllOrdersQueryVariables>;
export const OrderDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OrderDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"orderNumber"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"orderType"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryStatus"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofImage"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofUploadedAt"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofStatus"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofRejectionReason"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofAttempts"}},{"kind":"Field","name":{"kind":"Name","value":"paymongoTransactionId"}},{"kind":"Field","name":{"kind":"Name","value":"paymongoAmount"}},{"kind":"Field","name":{"kind":"Name","value":"paymongoPaymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"paymongoTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<OrderDetailsQuery, OrderDetailsQueryVariables>;
export const ClientOrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ClientOrders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clientOrders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"orderNumber"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"orderType"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryStatus"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofImage"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofUploadedAt"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofStatus"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofRejectionReason"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofAttempts"}},{"kind":"Field","name":{"kind":"Name","value":"paymongoTransactionId"}},{"kind":"Field","name":{"kind":"Name","value":"paymongoAmount"}},{"kind":"Field","name":{"kind":"Name","value":"paymongoPaymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"paymongoTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<ClientOrdersQuery, ClientOrdersQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"emailAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"emailAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"emailAddress"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const ReadProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"readProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"readProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"emailAddress"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<ReadProfileQuery, ReadProfileQueryVariables>;
export const AddToCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddToCart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddToCartInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addToCart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"selectedColor"}},{"kind":"Field","name":{"kind":"Name","value":"selectedSize"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AddToCartMutation, AddToCartMutationVariables>;
export const UpdateCartItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCartItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCartItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCartItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateCartItemMutation, UpdateCartItemMutationVariables>;
export const RemoveFromCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveFromCart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeFromCart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"itemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}}}]}]}}]} as unknown as DocumentNode<RemoveFromCartMutation, RemoveFromCartMutationVariables>;
export const ClearCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ClearCart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clearCart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<ClearCartMutation, ClearCartMutationVariables>;
export const RemoveCartItemByProductIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveCartItemByProductId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeCartItemByProductId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}}]}]}}]} as unknown as DocumentNode<RemoveCartItemByProductIdMutation, RemoveCartItemByProductIdMutationVariables>;
export const PlaceOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PlaceOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaceOrderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"placeOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"orderNumber"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<PlaceOrderMutation, PlaceOrderMutationVariables>;
export const GetCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"selectedColor"}},{"kind":"Field","name":{"kind":"Name","value":"selectedSize"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}}]}}]}}]} as unknown as DocumentNode<GetCartQuery, GetCartQueryVariables>;
export const CreateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOrderDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"orderNumber"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"orderType"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryStatus"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateOrderMutation, CreateOrderMutationVariables>;
export const UpdateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateOrderDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"orderNumber"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"orderType"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryStatus"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateOrderMutation, UpdateOrderMutationVariables>;
export const TransitionOrderStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TransitionOrderStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TransitionOrderStatusDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transitionOrderStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"orderNumber"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"orderType"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryStatus"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<TransitionOrderStatusMutation, TransitionOrderStatusMutationVariables>;
export const GetClientOrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetClientOrders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clientOrders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"orderNumber"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"orderType"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryFee"}},{"kind":"Field","name":{"kind":"Name","value":"grandTotal"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryStatus"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofImage"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofStatus"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofRejectionReason"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofAttempts"}}]}}]}}]} as unknown as DocumentNode<GetClientOrdersQuery, GetClientOrdersQueryVariables>;
export const GetOrderDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrderDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"orderNumber"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"orderType"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryFee"}},{"kind":"Field","name":{"kind":"Name","value":"grandTotal"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryStatus"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofImage"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofStatus"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofRejectionReason"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofAttempts"}}]}}]}}]} as unknown as DocumentNode<GetOrderDetailsQuery, GetOrderDetailsQueryVariables>;
export const GetAllOrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllOrders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allOrders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"orderNumber"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"orderType"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryFee"}},{"kind":"Field","name":{"kind":"Name","value":"grandTotal"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryStatus"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofImage"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofStatus"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofRejectionReason"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofAttempts"}}]}}]}}]} as unknown as DocumentNode<GetAllOrdersQuery, GetAllOrdersQueryVariables>;
export const GetNotificationsByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNotificationsByUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getNotificationsByUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notificationId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"isRead"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"readAt"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}}]}}]}}]} as unknown as DocumentNode<GetNotificationsByUserIdQuery, GetNotificationsByUserIdQueryVariables>;
export const MarkNotificationAsReadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MarkNotificationAsRead"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"notificationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markNotificationAsRead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"notificationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"notificationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notificationId"}},{"kind":"Field","name":{"kind":"Name","value":"isRead"}},{"kind":"Field","name":{"kind":"Name","value":"readAt"}}]}}]}}]} as unknown as DocumentNode<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>;
export const MarkAllNotificationsAsReadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MarkAllNotificationsAsRead"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markAllNotificationsAsRead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notificationId"}},{"kind":"Field","name":{"kind":"Name","value":"isRead"}},{"kind":"Field","name":{"kind":"Name","value":"readAt"}}]}}]}}]} as unknown as DocumentNode<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>;