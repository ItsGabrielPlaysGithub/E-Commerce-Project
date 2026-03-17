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
  productId: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
  totalPrice: Scalars['Float']['input'];
  unitPrice: Scalars['Float']['input'];
  userId: Scalars['Int']['input'];
};

export type CreateProductDto = {
  productDescription: Scalars['String']['input'];
  productName: Scalars['String']['input'];
  productPrice: Scalars['Float']['input'];
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
  input: UpdateProductDto;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserDto;
};

export type OrdersTbl = {
  __typename?: 'OrdersTbl';
  createdAt: Scalars['DateTime']['output'];
  orderId: Scalars['Float']['output'];
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
  createdAt: Scalars['DateTime']['output'];
  productDescription: Scalars['String']['output'];
  productId: Scalars['Float']['output'];
  productName: Scalars['String']['output'];
  productPrice: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  allOrders: Array<OrdersTbl>;
  clientOrders: Array<OrdersTbl>;
  getAllUsers: Array<UsersTbl>;
  getProducts: Array<ProductsTbl>;
  invoiceByOrderId?: Maybe<InvoicesTbl>;
  orderDetails: OrdersTbl;
  readProfile: UsersTbl;
};


export type QueryClientOrdersArgs = {
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

export type TransitionOrderStatusDto = {
  nextStatus: Scalars['String']['input'];
  orderId: Scalars['Int']['input'];
};

export type UpdateOrderDto = {
  orderId: Scalars['Float']['input'];
  productId?: InputMaybe<Scalars['Int']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  totalPrice?: InputMaybe<Scalars['Float']['input']>;
  unitPrice?: InputMaybe<Scalars['Float']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateProductDto = {
  productDescription?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['Float']['input'];
  productName?: InputMaybe<Scalars['String']['input']>;
  productPrice?: InputMaybe<Scalars['Float']['input']>;
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

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', getProducts: Array<{ __typename?: 'ProductsTbl', productId: number, productName: string, productDescription: string, productPrice: number, createdAt: any, updatedAt: any }> };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"emailAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"emailAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"emailAddress"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const ReadProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"readProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"readProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"emailAddress"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<ReadProfileQuery, ReadProfileQueryVariables>;
export const GetProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"productDescription"}},{"kind":"Field","name":{"kind":"Name","value":"productPrice"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetProductsQuery, GetProductsQueryVariables>;