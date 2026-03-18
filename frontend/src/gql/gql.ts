/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation CreateOrder($input: CreateOrderDto!) {\n    createOrder(input: $input) {\n      orderId\n      userId\n      productId\n      quantity\n      status\n      totalPrice\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.CreateOrderDocument,
    "\n  mutation UpdateOrder($input: UpdateOrderDto!) {\n    updateOrder(input: $input) {\n      orderId\n      userId\n      productId\n      quantity\n      status\n      totalPrice\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.UpdateOrderDocument,
    "\n  mutation TransitionOrderStatus($input: TransitionOrderStatusDto!) {\n    transitionOrderStatus(input: $input) {\n      orderId\n      userId\n      productId\n      quantity\n      status\n      totalPrice\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.TransitionOrderStatusDocument,
    "\n  query AllOrders {\n    allOrders {\n      orderId\n      orderNumber\n      userId\n      productId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      paymentMethod\n      paymentProofImage\n      paymentProofUploadedAt\n      paymongoTransactionId\n      paymongoAmount\n      paymongoPaymentMethod\n      paymongoTimestamp\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.AllOrdersDocument,
    "\n  query OrderDetails($orderId: Int!) {\n    orderDetails(orderId: $orderId) {\n      orderId\n      orderNumber\n      userId\n      productId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      paymentMethod\n      paymentProofImage\n      paymentProofUploadedAt\n      paymongoTransactionId\n      paymongoAmount\n      paymongoPaymentMethod\n      paymongoTimestamp\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.OrderDetailsDocument,
    "\n  query ClientOrders($userId: Int!) {\n    clientOrders(userId: $userId) {\n      orderId\n      orderNumber\n      userId\n      productId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      paymentMethod\n      paymentProofImage\n      paymentProofUploadedAt\n      paymongoTransactionId\n      paymongoAmount\n      paymongoPaymentMethod\n      paymongoTimestamp\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.ClientOrdersDocument,
    "\n  mutation Login($emailAddress: String!, $password: String!) {\n    login(emailAddress: $emailAddress, password: $password) {\n        message\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation Logout {\n    logout {\n      message\n    }\n  }\n": typeof types.LogoutDocument,
    "\n  query readProfile($userId: Int!) {\n    readProfile(userId: $userId) {\n      userId\n      fullName\n      emailAddress\n      companyName\n      address\n      phoneNumber\n      role\n    }\n  }\n": typeof types.ReadProfileDocument,
    "\n  mutation CreateProduct($input: CreateProductDto!) {\n    createProduct(input: $input) {\n        productId\n        productName\n        productDescription\n        sku\n        category\n        productPrice\n        reorderPoint\n        available\n        createdAt\n        updatedAt\n    }\n}\n": typeof types.CreateProductDocument,
    "\n  mutation UpdateProduct($id: Int!, $input: UpdateProductDto!) {\n    updateProduct(id: $id, input: $input) {\n        productId\n        productName\n        productDescription\n        sku\n        category\n        productPrice\n        reorderPoint\n        available\n        createdAt\n        updatedAt\n    }\n}\n": typeof types.UpdateProductDocument,
    "\n  mutation DeleteProduct($productId: Int!) {\n    deleteProduct(productId: $productId) {\n        productId\n    }\n}\n": typeof types.DeleteProductDocument,
    "\n  query GetProducts {\n    getProducts {\n      productId\n      productName\n      productDescription\n      sku\n      category\n      productPrice\n      reorderPoint\n      available\n      blocked\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetProductsDocument,
    "\n  query GetProductById($productId: Int!) {\n    getProductById(productId: $productId) {\n      productId\n      productName\n      productDescription\n      sku\n      category\n      productPrice\n      reorderPoint\n      available\n      inTransit\n      blocked\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetProductByIdDocument,
};
const documents: Documents = {
    "\n  mutation CreateOrder($input: CreateOrderDto!) {\n    createOrder(input: $input) {\n      orderId\n      userId\n      productId\n      quantity\n      status\n      totalPrice\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreateOrderDocument,
    "\n  mutation UpdateOrder($input: UpdateOrderDto!) {\n    updateOrder(input: $input) {\n      orderId\n      userId\n      productId\n      quantity\n      status\n      totalPrice\n      createdAt\n      updatedAt\n    }\n  }\n": types.UpdateOrderDocument,
    "\n  mutation TransitionOrderStatus($input: TransitionOrderStatusDto!) {\n    transitionOrderStatus(input: $input) {\n      orderId\n      userId\n      productId\n      quantity\n      status\n      totalPrice\n      createdAt\n      updatedAt\n    }\n  }\n": types.TransitionOrderStatusDocument,
    "\n  query AllOrders {\n    allOrders {\n      orderId\n      orderNumber\n      userId\n      productId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      paymentMethod\n      paymentProofImage\n      paymentProofUploadedAt\n      paymongoTransactionId\n      paymongoAmount\n      paymongoPaymentMethod\n      paymongoTimestamp\n      createdAt\n      updatedAt\n    }\n  }\n": types.AllOrdersDocument,
    "\n  query OrderDetails($orderId: Int!) {\n    orderDetails(orderId: $orderId) {\n      orderId\n      orderNumber\n      userId\n      productId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      paymentMethod\n      paymentProofImage\n      paymentProofUploadedAt\n      paymongoTransactionId\n      paymongoAmount\n      paymongoPaymentMethod\n      paymongoTimestamp\n      createdAt\n      updatedAt\n    }\n  }\n": types.OrderDetailsDocument,
    "\n  query ClientOrders($userId: Int!) {\n    clientOrders(userId: $userId) {\n      orderId\n      orderNumber\n      userId\n      productId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      paymentMethod\n      paymentProofImage\n      paymentProofUploadedAt\n      paymongoTransactionId\n      paymongoAmount\n      paymongoPaymentMethod\n      paymongoTimestamp\n      createdAt\n      updatedAt\n    }\n  }\n": types.ClientOrdersDocument,
    "\n  mutation Login($emailAddress: String!, $password: String!) {\n    login(emailAddress: $emailAddress, password: $password) {\n        message\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Logout {\n    logout {\n      message\n    }\n  }\n": types.LogoutDocument,
    "\n  query readProfile($userId: Int!) {\n    readProfile(userId: $userId) {\n      userId\n      fullName\n      emailAddress\n      companyName\n      address\n      phoneNumber\n      role\n    }\n  }\n": types.ReadProfileDocument,
    "\n  mutation CreateProduct($input: CreateProductDto!) {\n    createProduct(input: $input) {\n        productId\n        productName\n        productDescription\n        sku\n        category\n        productPrice\n        reorderPoint\n        available\n        createdAt\n        updatedAt\n    }\n}\n": types.CreateProductDocument,
    "\n  mutation UpdateProduct($id: Int!, $input: UpdateProductDto!) {\n    updateProduct(id: $id, input: $input) {\n        productId\n        productName\n        productDescription\n        sku\n        category\n        productPrice\n        reorderPoint\n        available\n        createdAt\n        updatedAt\n    }\n}\n": types.UpdateProductDocument,
    "\n  mutation DeleteProduct($productId: Int!) {\n    deleteProduct(productId: $productId) {\n        productId\n    }\n}\n": types.DeleteProductDocument,
    "\n  query GetProducts {\n    getProducts {\n      productId\n      productName\n      productDescription\n      sku\n      category\n      productPrice\n      reorderPoint\n      available\n      blocked\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetProductsDocument,
    "\n  query GetProductById($productId: Int!) {\n    getProductById(productId: $productId) {\n      productId\n      productName\n      productDescription\n      sku\n      category\n      productPrice\n      reorderPoint\n      available\n      inTransit\n      blocked\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetProductByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOrder($input: CreateOrderDto!) {\n    createOrder(input: $input) {\n      orderId\n      userId\n      productId\n      quantity\n      status\n      totalPrice\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOrder($input: CreateOrderDto!) {\n    createOrder(input: $input) {\n      orderId\n      userId\n      productId\n      quantity\n      status\n      totalPrice\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateOrder($input: UpdateOrderDto!) {\n    updateOrder(input: $input) {\n      orderId\n      userId\n      productId\n      quantity\n      status\n      totalPrice\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateOrder($input: UpdateOrderDto!) {\n    updateOrder(input: $input) {\n      orderId\n      userId\n      productId\n      quantity\n      status\n      totalPrice\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation TransitionOrderStatus($input: TransitionOrderStatusDto!) {\n    transitionOrderStatus(input: $input) {\n      orderId\n      userId\n      productId\n      quantity\n      status\n      totalPrice\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation TransitionOrderStatus($input: TransitionOrderStatusDto!) {\n    transitionOrderStatus(input: $input) {\n      orderId\n      userId\n      productId\n      quantity\n      status\n      totalPrice\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AllOrders {\n    allOrders {\n      orderId\n      orderNumber\n      userId\n      productId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      paymentMethod\n      paymentProofImage\n      paymentProofUploadedAt\n      paymongoTransactionId\n      paymongoAmount\n      paymongoPaymentMethod\n      paymongoTimestamp\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query AllOrders {\n    allOrders {\n      orderId\n      orderNumber\n      userId\n      productId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      paymentMethod\n      paymentProofImage\n      paymentProofUploadedAt\n      paymongoTransactionId\n      paymongoAmount\n      paymongoPaymentMethod\n      paymongoTimestamp\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query OrderDetails($orderId: Int!) {\n    orderDetails(orderId: $orderId) {\n      orderId\n      orderNumber\n      userId\n      productId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      paymentMethod\n      paymentProofImage\n      paymentProofUploadedAt\n      paymongoTransactionId\n      paymongoAmount\n      paymongoPaymentMethod\n      paymongoTimestamp\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query OrderDetails($orderId: Int!) {\n    orderDetails(orderId: $orderId) {\n      orderId\n      orderNumber\n      userId\n      productId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      paymentMethod\n      paymentProofImage\n      paymentProofUploadedAt\n      paymongoTransactionId\n      paymongoAmount\n      paymongoPaymentMethod\n      paymongoTimestamp\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ClientOrders($userId: Int!) {\n    clientOrders(userId: $userId) {\n      orderId\n      orderNumber\n      userId\n      productId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      paymentMethod\n      paymentProofImage\n      paymentProofUploadedAt\n      paymongoTransactionId\n      paymongoAmount\n      paymongoPaymentMethod\n      paymongoTimestamp\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query ClientOrders($userId: Int!) {\n    clientOrders(userId: $userId) {\n      orderId\n      orderNumber\n      userId\n      productId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      paymentMethod\n      paymentProofImage\n      paymentProofUploadedAt\n      paymongoTransactionId\n      paymongoAmount\n      paymongoPaymentMethod\n      paymongoTimestamp\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($emailAddress: String!, $password: String!) {\n    login(emailAddress: $emailAddress, password: $password) {\n        message\n    }\n  }\n"): (typeof documents)["\n  mutation Login($emailAddress: String!, $password: String!) {\n    login(emailAddress: $emailAddress, password: $password) {\n        message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Logout {\n    logout {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation Logout {\n    logout {\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query readProfile($userId: Int!) {\n    readProfile(userId: $userId) {\n      userId\n      fullName\n      emailAddress\n      companyName\n      address\n      phoneNumber\n      role\n    }\n  }\n"): (typeof documents)["\n  query readProfile($userId: Int!) {\n    readProfile(userId: $userId) {\n      userId\n      fullName\n      emailAddress\n      companyName\n      address\n      phoneNumber\n      role\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateProduct($input: CreateProductDto!) {\n    createProduct(input: $input) {\n        productId\n        productName\n        productDescription\n        sku\n        category\n        productPrice\n        reorderPoint\n        available\n        createdAt\n        updatedAt\n    }\n}\n"): (typeof documents)["\n  mutation CreateProduct($input: CreateProductDto!) {\n    createProduct(input: $input) {\n        productId\n        productName\n        productDescription\n        sku\n        category\n        productPrice\n        reorderPoint\n        available\n        createdAt\n        updatedAt\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateProduct($id: Int!, $input: UpdateProductDto!) {\n    updateProduct(id: $id, input: $input) {\n        productId\n        productName\n        productDescription\n        sku\n        category\n        productPrice\n        reorderPoint\n        available\n        createdAt\n        updatedAt\n    }\n}\n"): (typeof documents)["\n  mutation UpdateProduct($id: Int!, $input: UpdateProductDto!) {\n    updateProduct(id: $id, input: $input) {\n        productId\n        productName\n        productDescription\n        sku\n        category\n        productPrice\n        reorderPoint\n        available\n        createdAt\n        updatedAt\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteProduct($productId: Int!) {\n    deleteProduct(productId: $productId) {\n        productId\n    }\n}\n"): (typeof documents)["\n  mutation DeleteProduct($productId: Int!) {\n    deleteProduct(productId: $productId) {\n        productId\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProducts {\n    getProducts {\n      productId\n      productName\n      productDescription\n      sku\n      category\n      productPrice\n      reorderPoint\n      available\n      blocked\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetProducts {\n    getProducts {\n      productId\n      productName\n      productDescription\n      sku\n      category\n      productPrice\n      reorderPoint\n      available\n      blocked\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProductById($productId: Int!) {\n    getProductById(productId: $productId) {\n      productId\n      productName\n      productDescription\n      sku\n      category\n      productPrice\n      reorderPoint\n      available\n      inTransit\n      blocked\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetProductById($productId: Int!) {\n    getProductById(productId: $productId) {\n      productId\n      productName\n      productDescription\n      sku\n      category\n      productPrice\n      reorderPoint\n      available\n      inTransit\n      blocked\n      createdAt\n      updatedAt\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;