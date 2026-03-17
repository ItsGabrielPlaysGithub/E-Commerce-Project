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
  category: Scalars['String']['input'];
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

export type InvoicesTbl = {
  __typename?: 'InvoicesTbl';
  createdAt: Scalars['DateTime']['output'];
  dueDate: Scalars['DateTime']['output'];
  invoiceId: Scalars['Float']['output'];
  invoiceNumber: Scalars['String']['output'];
  orderId: Scalars['Float']['output'];
  paymentStatus: Scalars['String']['output'];
  totalAmount: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['Float']['output'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createOrder: OrdersTbl;
  createProduct: ProductsTbl;
  createUser: UsersTbl;
  deleteProduct: ProductsTbl;
  deleteUser: UsersTbl;
  login: LoginResponse;
  logout: LoginResponse;
  payInvoiceByOrderId: InvoicesTbl;
  transitionOrderStatus: OrdersTbl;
  updateOrder: OrdersTbl;
  updateProduct: ProductsTbl;
  updateUser: UsersTbl;
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


export type MutationPayInvoiceByOrderIdArgs = {
  orderId: Scalars['Int']['input'];
};


export type MutationTransitionOrderStatusArgs = {
  input: TransitionOrderStatusDto;
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

export type OrdersTbl = {
  __typename?: 'OrdersTbl';
  createdAt: Scalars['DateTime']['output'];
  deliveryStatus?: Maybe<Scalars['String']['output']>;
  orderId: Scalars['Float']['output'];
  orderNumber: Scalars['String']['output'];
  orderType?: Maybe<Scalars['String']['output']>;
  paymentMethod?: Maybe<Scalars['String']['output']>;
  paymentProofImage?: Maybe<Scalars['String']['output']>;
  paymentProofUploadedAt?: Maybe<Scalars['DateTime']['output']>;
  paymongoAmount?: Maybe<Scalars['Float']['output']>;
  paymongoPaymentMethod?: Maybe<Scalars['String']['output']>;
  paymongoTimestamp?: Maybe<Scalars['DateTime']['output']>;
  paymongoTransactionId?: Maybe<Scalars['String']['output']>;
  productId: Scalars['Float']['output'];
  quantity: Scalars['Float']['output'];
  status: Scalars['String']['output'];
  totalPrice: Scalars['Float']['output'];
  unitPrice: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['Float']['output'];
};

export type ProductsTbl = {
  __typename?: 'ProductsTbl';
  available: Scalars['Int']['output'];
  blocked: Scalars['Int']['output'];
  category: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
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
  allOrders: Array<OrdersTbl>;
  clientOrders: Array<OrdersTbl>;
  getAllUsers: Array<UsersTbl>;
  getProductById: ProductsTbl;
  getProducts: Array<ProductsTbl>;
  invoiceByOrderId?: Maybe<InvoicesTbl>;
  orderDetails: OrdersTbl;
  readProfile: UsersTbl;
};


export type QueryClientOrdersArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryGetProductByIdArgs = {
  productId: Scalars['Int']['input'];
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

export type TransitionOrderStatusDto = {
  nextStatus: Scalars['String']['input'];
  orderId: Scalars['Int']['input'];
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
  category?: InputMaybe<Scalars['String']['input']>;
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

export type CreateProductMutationVariables = Exact<{
  input: CreateProductDto;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'ProductsTbl', productId: number, productName: string, productDescription: string, sku: string, category: string, productPrice: number, reorderPoint: number, available: number, createdAt: any, updatedAt: any } };

export type UpdateProductMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: UpdateProductDto;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct: { __typename?: 'ProductsTbl', productId: number, productName: string, productDescription: string, sku: string, category: string, productPrice: number, reorderPoint: number, available: number, createdAt: any, updatedAt: any } };

export type DeleteProductMutationVariables = Exact<{
  productId: Scalars['Int']['input'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct: { __typename?: 'ProductsTbl', productId: number } };

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', getProducts: Array<{ __typename?: 'ProductsTbl', productId: number, productName: string, productDescription: string, sku: string, category: string, productPrice: number, reorderPoint: number, available: number, blocked: number, createdAt: any, updatedAt: any }> };

export type GetProductByIdQueryVariables = Exact<{
  productId: Scalars['Int']['input'];
}>;


export type GetProductByIdQuery = { __typename?: 'Query', getProductById: { __typename?: 'ProductsTbl', productId: number, productName: string, productDescription: string, sku: string, category: string, productPrice: number, reorderPoint: number, available: number, inTransit: number, blocked: number, createdAt: any, updatedAt: any } };

export type CreateOrderMutationVariables = Exact<{
  input: CreateOrderDto;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'OrdersTbl', orderId: number, userId: number, productId: number, quantity: number, status: string, totalPrice: number, createdAt: any, updatedAt: any } };

export type UpdateOrderMutationVariables = Exact<{
  input: UpdateOrderDto;
}>;


export type UpdateOrderMutation = { __typename?: 'Mutation', updateOrder: { __typename?: 'OrdersTbl', orderId: number, userId: number, productId: number, quantity: number, status: string, totalPrice: number, createdAt: any, updatedAt: any } };

export type TransitionOrderStatusMutationVariables = Exact<{
  input: TransitionOrderStatusDto;
}>;


export type TransitionOrderStatusMutation = { __typename?: 'Mutation', transitionOrderStatus: { __typename?: 'OrdersTbl', orderId: number, userId: number, productId: number, quantity: number, status: string, totalPrice: number, createdAt: any, updatedAt: any } };

export type AllOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllOrdersQuery = { __typename?: 'Query', allOrders: Array<{ __typename?: 'OrdersTbl', orderId: number, orderNumber: string, userId: number, productId: number, orderType?: string | null, quantity: number, unitPrice: number, totalPrice: number, status: string, deliveryStatus?: string | null, paymentMethod?: string | null, paymentProofImage?: string | null, paymentProofUploadedAt?: any | null, paymongoTransactionId?: string | null, paymongoAmount?: number | null, paymongoPaymentMethod?: string | null, paymongoTimestamp?: any | null, createdAt: any, updatedAt: any }> };

export type OrderDetailsQueryVariables = Exact<{
  orderId: Scalars['Int']['input'];
}>;


export type OrderDetailsQuery = { __typename?: 'Query', orderDetails: { __typename?: 'OrdersTbl', orderId: number, orderNumber: string, userId: number, productId: number, orderType?: string | null, quantity: number, unitPrice: number, totalPrice: number, status: string, deliveryStatus?: string | null, paymentMethod?: string | null, paymentProofImage?: string | null, paymentProofUploadedAt?: any | null, paymongoTransactionId?: string | null, paymongoAmount?: number | null, paymongoPaymentMethod?: string | null, paymongoTimestamp?: any | null, createdAt: any, updatedAt: any } };

export type ClientOrdersQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type ClientOrdersQuery = { __typename?: 'Query', clientOrders: Array<{ __typename?: 'OrdersTbl', orderId: number, orderNumber: string, userId: number, productId: number, orderType?: string | null, quantity: number, unitPrice: number, totalPrice: number, status: string, deliveryStatus?: string | null, paymentMethod?: string | null, paymentProofImage?: string | null, paymentProofUploadedAt?: any | null, paymongoTransactionId?: string | null, paymongoAmount?: number | null, paymongoPaymentMethod?: string | null, paymongoTimestamp?: any | null, createdAt: any, updatedAt: any }> };

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


export const CreateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProductDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"productDescription"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"productPrice"}},{"kind":"Field","name":{"kind":"Name","value":"reorderPoint"}},{"kind":"Field","name":{"kind":"Name","value":"available"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProductDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"productDescription"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"productPrice"}},{"kind":"Field","name":{"kind":"Name","value":"reorderPoint"}},{"kind":"Field","name":{"kind":"Name","value":"available"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateProductMutation, UpdateProductMutationVariables>;
export const DeleteProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productId"}}]}}]}}]} as unknown as DocumentNode<DeleteProductMutation, DeleteProductMutationVariables>;
export const GetProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"productDescription"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"productPrice"}},{"kind":"Field","name":{"kind":"Name","value":"reorderPoint"}},{"kind":"Field","name":{"kind":"Name","value":"available"}},{"kind":"Field","name":{"kind":"Name","value":"blocked"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetProductsQuery, GetProductsQueryVariables>;
export const GetProductByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProductById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"productDescription"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"productPrice"}},{"kind":"Field","name":{"kind":"Name","value":"reorderPoint"}},{"kind":"Field","name":{"kind":"Name","value":"available"}},{"kind":"Field","name":{"kind":"Name","value":"inTransit"}},{"kind":"Field","name":{"kind":"Name","value":"blocked"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetProductByIdQuery, GetProductByIdQueryVariables>;
export const CreateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOrderDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateOrderMutation, CreateOrderMutationVariables>;
export const UpdateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateOrderDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateOrderMutation, UpdateOrderMutationVariables>;
export const TransitionOrderStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TransitionOrderStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TransitionOrderStatusDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transitionOrderStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<TransitionOrderStatusMutation, TransitionOrderStatusMutationVariables>;
export const AllOrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllOrders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allOrders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"orderNumber"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"orderType"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryStatus"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofImage"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofUploadedAt"}},{"kind":"Field","name":{"kind":"Name","value":"paymongoTransactionId"}},{"kind":"Field","name":{"kind":"Name","value":"paymongoAmount"}},{"kind":"Field","name":{"kind":"Name","value":"paymongoPaymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"paymongoTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AllOrdersQuery, AllOrdersQueryVariables>;
export const OrderDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OrderDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"orderNumber"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"orderType"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryStatus"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofImage"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofUploadedAt"}},{"kind":"Field","name":{"kind":"Name","value":"paymongoTransactionId"}},{"kind":"Field","name":{"kind":"Name","value":"paymongoAmount"}},{"kind":"Field","name":{"kind":"Name","value":"paymongoPaymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"paymongoTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<OrderDetailsQuery, OrderDetailsQueryVariables>;
export const ClientOrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ClientOrders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clientOrders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"orderNumber"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"orderType"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryStatus"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofImage"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProofUploadedAt"}},{"kind":"Field","name":{"kind":"Name","value":"paymongoTransactionId"}},{"kind":"Field","name":{"kind":"Name","value":"paymongoAmount"}},{"kind":"Field","name":{"kind":"Name","value":"paymongoPaymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"paymongoTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<ClientOrdersQuery, ClientOrdersQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"emailAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"emailAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"emailAddress"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const ReadProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"readProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"readProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"emailAddress"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<ReadProfileQuery, ReadProfileQueryVariables>;