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
    "\n  mutation CreateAdminOrder($input: CreateOrderDto!) {\n    createOrder(input: $input) {\n      orderId\n      userId\n      productId\n      quantity\n      status\n      totalPrice\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.CreateAdminOrderDocument,
    "\n  mutation UpdateAdminOrder($input: UpdateOrderDto!) {\n    updateOrder(input: $input) {\n      orderId\n      userId\n      productId\n      quantity\n      status\n      totalPrice\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.UpdateAdminOrderDocument,
    "\n  mutation TransitionAdminOrderStatus($input: TransitionOrderStatusDto!) {\n    transitionOrderStatus(input: $input) {\n      orderId\n      orderNumber\n      userId\n      productId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      paymentMethod\n      paymentProofImage\n      paymentProofUploadedAt\n      paymongoTransactionId\n      paymongoAmount\n      paymongoPaymentMethod\n      paymongoTimestamp\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.TransitionAdminOrderStatusDocument,
    "\n  query AllOrders {\n    allOrders {\n      orderId\n      orderNumber\n      userId\n      productId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      paymentMethod\n      paymentProofImage\n      paymentProofUploadedAt\n      paymongoTransactionId\n      paymongoAmount\n      paymongoPaymentMethod\n      paymongoTimestamp\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.AllOrdersDocument,
    "\n  query OrderDetails($orderId: Int!) {\n    orderDetails(orderId: $orderId) {\n      orderId\n      orderNumber\n      userId\n      productId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      paymentMethod\n      paymentProofImage\n      paymentProofUploadedAt\n      paymongoTransactionId\n      paymongoAmount\n      paymongoPaymentMethod\n      paymongoTimestamp\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.OrderDetailsDocument,
    "\n  query ClientOrders($userId: Int!) {\n    clientOrders(userId: $userId) {\n      orderId\n      orderNumber\n      userId\n      productId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      paymentMethod\n      paymentProofImage\n      paymentProofUploadedAt\n      paymongoTransactionId\n      paymongoAmount\n      paymongoPaymentMethod\n      paymongoTimestamp\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.ClientOrdersDocument,
    "\n  mutation Login($emailAddress: String!, $password: String!) {\n    login(emailAddress: $emailAddress, password: $password) {\n        message\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation Logout {\n    logout {\n      message\n    }\n  }\n": typeof types.LogoutDocument,
    "\n  query readProfile($userId: Int!) {\n    readProfile(userId: $userId) {\n      userId\n      fullName\n      emailAddress\n      companyName\n      address\n      phoneNumber\n      role\n    }\n  }\n": typeof types.ReadProfileDocument,
    "\n  mutation AddToCart($userId: Int!, $input: AddToCartInput!) {\n    addToCart(userId: $userId, input: $input) {\n      id\n      userId\n      productId\n      quantity\n      unitPrice\n      selectedColor\n      selectedSize\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.AddToCartDocument,
    "\n  mutation UpdateCartItem($userId: Int!, $input: UpdateCartItemInput!) {\n    updateCartItem(userId: $userId, input: $input) {\n      id\n      quantity\n      updatedAt\n    }\n  }\n": typeof types.UpdateCartItemDocument,
    "\n  mutation RemoveFromCart($userId: Int!, $itemId: Int!) {\n    removeFromCart(userId: $userId, itemId: $itemId)\n  }\n": typeof types.RemoveFromCartDocument,
    "\n  mutation ClearCart($userId: Int!) {\n    clearCart(userId: $userId)\n  }\n": typeof types.ClearCartDocument,
    "\n  mutation RemoveCartItemByProductId($userId: Int!, $productId: Int!) {\n    removeCartItemByProductId(userId: $userId, productId: $productId)\n  }\n": typeof types.RemoveCartItemByProductIdDocument,
    "\n  mutation PlaceOrder($input: PlaceOrderInput!) {\n    placeOrder(input: $input) {\n      success\n      orderNumber\n      message\n      orderId\n      createdAt\n    }\n  }\n": typeof types.PlaceOrderDocument,
    "\n  query GetCart($userId: Int!) {\n    getCart(userId: $userId) {\n      items {\n        id\n        userId\n        productId\n        quantity\n        unitPrice\n        selectedColor\n        selectedSize\n        createdAt\n        updatedAt\n      }\n      totalItems\n      totalPrice\n    }\n  }\n": typeof types.GetCartDocument,
    "\n  mutation CreateOrder($input: CreateOrderDto!) {\n    createOrder(input: $input) {\n      orderId\n      orderNumber\n      productId\n      userId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.CreateOrderDocument,
    "\n  mutation UpdateOrder($input: UpdateOrderDto!) {\n    updateOrder(input: $input) {\n      orderId\n      orderNumber\n      productId\n      userId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.UpdateOrderDocument,
    "\n  mutation TransitionOrderStatus($input: TransitionOrderStatusDto!) {\n    transitionOrderStatus(input: $input) {\n      orderId\n      orderNumber\n      productId\n      userId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.TransitionOrderStatusDocument,
    "\n  query GetClientOrders($userId: Int!) {\n    clientOrders(userId: $userId) {\n      orderId\n      orderNumber\n      productId\n      userId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      deliveryFee\n      grandTotal\n      status\n      deliveryStatus\n      createdAt\n      updatedAt\n      paymentProofImage\n    }\n  }\n": typeof types.GetClientOrdersDocument,
    "\n  query GetOrderDetails($orderId: Int!) {\n    orderDetails(orderId: $orderId) {\n      orderId\n      orderNumber\n      productId\n      userId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      deliveryFee\n      grandTotal\n      status\n      deliveryStatus\n      createdAt\n      updatedAt\n      paymentProofImage\n    }\n  }\n": typeof types.GetOrderDetailsDocument,
    "\n  query GetAllOrders {\n    allOrders {\n      orderId\n      orderNumber\n      productId\n      userId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      deliveryFee\n      grandTotal\n      status\n      deliveryStatus\n      createdAt\n      updatedAt\n      paymentProofImage\n    }\n  }\n": typeof types.GetAllOrdersDocument,
    "\n  mutation CreateProduct($input: CreateProductDto!) {\n    createProduct(input: $input) {\n        productId\n        productName\n        productDescription\n        sku\n        category\n        productPrice\n        reorderPoint\n        available\n        blocked\n        inTransit\n        createdAt\n        updatedAt\n    }\n}\n": typeof types.CreateProductDocument,
    "\n  mutation UpdateProduct($id: Int!, $input: UpdateProductDto!) {\n    updateProduct(id: $id, input: $input) {\n        productId\n        productName\n        productDescription\n        sku\n        category\n        productPrice\n        reorderPoint\n        available\n        blocked\n        inTransit\n        createdAt\n        updatedAt\n    }\n}\n": typeof types.UpdateProductDocument,
    "\n  mutation DeleteProduct($productId: Int!) {\n    deleteProduct(productId: $productId) {\n        productId\n    }\n}\n": typeof types.DeleteProductDocument,
    "\n  query GetProducts {\n    getProducts {\n      productId\n      productName\n      productDescription\n      sku\n      category\n      productPrice\n      reorderPoint\n      available\n      blocked\n      inTransit\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetProductsDocument,
    "\n  query GetProductById($productId: Int!) {\n    getProductById(productId: $productId) {\n      productId\n      productName\n      productDescription\n      sku\n      category\n      productPrice\n      reorderPoint\n      available\n      inTransit\n      blocked\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetProductByIdDocument,
};
const documents: Documents = {
    "\n  mutation CreateAdminOrder($input: CreateOrderDto!) {\n    createOrder(input: $input) {\n      orderId\n      userId\n      productId\n      quantity\n      status\n      totalPrice\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreateAdminOrderDocument,
    "\n  mutation UpdateAdminOrder($input: UpdateOrderDto!) {\n    updateOrder(input: $input) {\n      orderId\n      userId\n      productId\n      quantity\n      status\n      totalPrice\n      createdAt\n      updatedAt\n    }\n  }\n": types.UpdateAdminOrderDocument,
    "\n  mutation TransitionAdminOrderStatus($input: TransitionOrderStatusDto!) {\n    transitionOrderStatus(input: $input) {\n      orderId\n      orderNumber\n      userId\n      productId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      paymentMethod\n      paymentProofImage\n      paymentProofUploadedAt\n      paymongoTransactionId\n      paymongoAmount\n      paymongoPaymentMethod\n      paymongoTimestamp\n      createdAt\n      updatedAt\n    }\n  }\n": types.TransitionAdminOrderStatusDocument,
    "\n  query AllOrders {\n    allOrders {\n      orderId\n      orderNumber\n      userId\n      productId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      paymentMethod\n      paymentProofImage\n      paymentProofUploadedAt\n      paymongoTransactionId\n      paymongoAmount\n      paymongoPaymentMethod\n      paymongoTimestamp\n      createdAt\n      updatedAt\n    }\n  }\n": types.AllOrdersDocument,
    "\n  query OrderDetails($orderId: Int!) {\n    orderDetails(orderId: $orderId) {\n      orderId\n      orderNumber\n      userId\n      productId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      paymentMethod\n      paymentProofImage\n      paymentProofUploadedAt\n      paymongoTransactionId\n      paymongoAmount\n      paymongoPaymentMethod\n      paymongoTimestamp\n      createdAt\n      updatedAt\n    }\n  }\n": types.OrderDetailsDocument,
    "\n  query ClientOrders($userId: Int!) {\n    clientOrders(userId: $userId) {\n      orderId\n      orderNumber\n      userId\n      productId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      paymentMethod\n      paymentProofImage\n      paymentProofUploadedAt\n      paymongoTransactionId\n      paymongoAmount\n      paymongoPaymentMethod\n      paymongoTimestamp\n      createdAt\n      updatedAt\n    }\n  }\n": types.ClientOrdersDocument,
    "\n  mutation Login($emailAddress: String!, $password: String!) {\n    login(emailAddress: $emailAddress, password: $password) {\n        message\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Logout {\n    logout {\n      message\n    }\n  }\n": types.LogoutDocument,
    "\n  query readProfile($userId: Int!) {\n    readProfile(userId: $userId) {\n      userId\n      fullName\n      emailAddress\n      companyName\n      address\n      phoneNumber\n      role\n    }\n  }\n": types.ReadProfileDocument,
    "\n  mutation AddToCart($userId: Int!, $input: AddToCartInput!) {\n    addToCart(userId: $userId, input: $input) {\n      id\n      userId\n      productId\n      quantity\n      unitPrice\n      selectedColor\n      selectedSize\n      createdAt\n      updatedAt\n    }\n  }\n": types.AddToCartDocument,
    "\n  mutation UpdateCartItem($userId: Int!, $input: UpdateCartItemInput!) {\n    updateCartItem(userId: $userId, input: $input) {\n      id\n      quantity\n      updatedAt\n    }\n  }\n": types.UpdateCartItemDocument,
    "\n  mutation RemoveFromCart($userId: Int!, $itemId: Int!) {\n    removeFromCart(userId: $userId, itemId: $itemId)\n  }\n": types.RemoveFromCartDocument,
    "\n  mutation ClearCart($userId: Int!) {\n    clearCart(userId: $userId)\n  }\n": types.ClearCartDocument,
    "\n  mutation RemoveCartItemByProductId($userId: Int!, $productId: Int!) {\n    removeCartItemByProductId(userId: $userId, productId: $productId)\n  }\n": types.RemoveCartItemByProductIdDocument,
    "\n  mutation PlaceOrder($input: PlaceOrderInput!) {\n    placeOrder(input: $input) {\n      success\n      orderNumber\n      message\n      orderId\n      createdAt\n    }\n  }\n": types.PlaceOrderDocument,
    "\n  query GetCart($userId: Int!) {\n    getCart(userId: $userId) {\n      items {\n        id\n        userId\n        productId\n        quantity\n        unitPrice\n        selectedColor\n        selectedSize\n        createdAt\n        updatedAt\n      }\n      totalItems\n      totalPrice\n    }\n  }\n": types.GetCartDocument,
    "\n  mutation CreateOrder($input: CreateOrderDto!) {\n    createOrder(input: $input) {\n      orderId\n      orderNumber\n      productId\n      userId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreateOrderDocument,
    "\n  mutation UpdateOrder($input: UpdateOrderDto!) {\n    updateOrder(input: $input) {\n      orderId\n      orderNumber\n      productId\n      userId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      createdAt\n      updatedAt\n    }\n  }\n": types.UpdateOrderDocument,
    "\n  mutation TransitionOrderStatus($input: TransitionOrderStatusDto!) {\n    transitionOrderStatus(input: $input) {\n      orderId\n      orderNumber\n      productId\n      userId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      createdAt\n      updatedAt\n    }\n  }\n": types.TransitionOrderStatusDocument,
    "\n  query GetClientOrders($userId: Int!) {\n    clientOrders(userId: $userId) {\n      orderId\n      orderNumber\n      productId\n      userId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      deliveryFee\n      grandTotal\n      status\n      deliveryStatus\n      createdAt\n      updatedAt\n      paymentProofImage\n    }\n  }\n": types.GetClientOrdersDocument,
    "\n  query GetOrderDetails($orderId: Int!) {\n    orderDetails(orderId: $orderId) {\n      orderId\n      orderNumber\n      productId\n      userId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      deliveryFee\n      grandTotal\n      status\n      deliveryStatus\n      createdAt\n      updatedAt\n      paymentProofImage\n    }\n  }\n": types.GetOrderDetailsDocument,
    "\n  query GetAllOrders {\n    allOrders {\n      orderId\n      orderNumber\n      productId\n      userId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      deliveryFee\n      grandTotal\n      status\n      deliveryStatus\n      createdAt\n      updatedAt\n      paymentProofImage\n    }\n  }\n": types.GetAllOrdersDocument,
    "\n  mutation CreateProduct($input: CreateProductDto!) {\n    createProduct(input: $input) {\n        productId\n        productName\n        productDescription\n        sku\n        category\n        productPrice\n        reorderPoint\n        available\n        blocked\n        inTransit\n        createdAt\n        updatedAt\n    }\n}\n": types.CreateProductDocument,
    "\n  mutation UpdateProduct($id: Int!, $input: UpdateProductDto!) {\n    updateProduct(id: $id, input: $input) {\n        productId\n        productName\n        productDescription\n        sku\n        category\n        productPrice\n        reorderPoint\n        available\n        blocked\n        inTransit\n        createdAt\n        updatedAt\n    }\n}\n": types.UpdateProductDocument,
    "\n  mutation DeleteProduct($productId: Int!) {\n    deleteProduct(productId: $productId) {\n        productId\n    }\n}\n": types.DeleteProductDocument,
    "\n  query GetProducts {\n    getProducts {\n      productId\n      productName\n      productDescription\n      sku\n      category\n      productPrice\n      reorderPoint\n      available\n      blocked\n      inTransit\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetProductsDocument,
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
export function graphql(source: "\n  mutation CreateAdminOrder($input: CreateOrderDto!) {\n    createOrder(input: $input) {\n      orderId\n      userId\n      productId\n      quantity\n      status\n      totalPrice\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateAdminOrder($input: CreateOrderDto!) {\n    createOrder(input: $input) {\n      orderId\n      userId\n      productId\n      quantity\n      status\n      totalPrice\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateAdminOrder($input: UpdateOrderDto!) {\n    updateOrder(input: $input) {\n      orderId\n      userId\n      productId\n      quantity\n      status\n      totalPrice\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateAdminOrder($input: UpdateOrderDto!) {\n    updateOrder(input: $input) {\n      orderId\n      userId\n      productId\n      quantity\n      status\n      totalPrice\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation TransitionAdminOrderStatus($input: TransitionOrderStatusDto!) {\n    transitionOrderStatus(input: $input) {\n      orderId\n      orderNumber\n      userId\n      productId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      paymentMethod\n      paymentProofImage\n      paymentProofUploadedAt\n      paymongoTransactionId\n      paymongoAmount\n      paymongoPaymentMethod\n      paymongoTimestamp\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation TransitionAdminOrderStatus($input: TransitionOrderStatusDto!) {\n    transitionOrderStatus(input: $input) {\n      orderId\n      orderNumber\n      userId\n      productId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      paymentMethod\n      paymentProofImage\n      paymentProofUploadedAt\n      paymongoTransactionId\n      paymongoAmount\n      paymongoPaymentMethod\n      paymongoTimestamp\n      createdAt\n      updatedAt\n    }\n  }\n"];
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
export function graphql(source: "\n  mutation AddToCart($userId: Int!, $input: AddToCartInput!) {\n    addToCart(userId: $userId, input: $input) {\n      id\n      userId\n      productId\n      quantity\n      unitPrice\n      selectedColor\n      selectedSize\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation AddToCart($userId: Int!, $input: AddToCartInput!) {\n    addToCart(userId: $userId, input: $input) {\n      id\n      userId\n      productId\n      quantity\n      unitPrice\n      selectedColor\n      selectedSize\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCartItem($userId: Int!, $input: UpdateCartItemInput!) {\n    updateCartItem(userId: $userId, input: $input) {\n      id\n      quantity\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCartItem($userId: Int!, $input: UpdateCartItemInput!) {\n    updateCartItem(userId: $userId, input: $input) {\n      id\n      quantity\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveFromCart($userId: Int!, $itemId: Int!) {\n    removeFromCart(userId: $userId, itemId: $itemId)\n  }\n"): (typeof documents)["\n  mutation RemoveFromCart($userId: Int!, $itemId: Int!) {\n    removeFromCart(userId: $userId, itemId: $itemId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ClearCart($userId: Int!) {\n    clearCart(userId: $userId)\n  }\n"): (typeof documents)["\n  mutation ClearCart($userId: Int!) {\n    clearCart(userId: $userId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveCartItemByProductId($userId: Int!, $productId: Int!) {\n    removeCartItemByProductId(userId: $userId, productId: $productId)\n  }\n"): (typeof documents)["\n  mutation RemoveCartItemByProductId($userId: Int!, $productId: Int!) {\n    removeCartItemByProductId(userId: $userId, productId: $productId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation PlaceOrder($input: PlaceOrderInput!) {\n    placeOrder(input: $input) {\n      success\n      orderNumber\n      message\n      orderId\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation PlaceOrder($input: PlaceOrderInput!) {\n    placeOrder(input: $input) {\n      success\n      orderNumber\n      message\n      orderId\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCart($userId: Int!) {\n    getCart(userId: $userId) {\n      items {\n        id\n        userId\n        productId\n        quantity\n        unitPrice\n        selectedColor\n        selectedSize\n        createdAt\n        updatedAt\n      }\n      totalItems\n      totalPrice\n    }\n  }\n"): (typeof documents)["\n  query GetCart($userId: Int!) {\n    getCart(userId: $userId) {\n      items {\n        id\n        userId\n        productId\n        quantity\n        unitPrice\n        selectedColor\n        selectedSize\n        createdAt\n        updatedAt\n      }\n      totalItems\n      totalPrice\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOrder($input: CreateOrderDto!) {\n    createOrder(input: $input) {\n      orderId\n      orderNumber\n      productId\n      userId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOrder($input: CreateOrderDto!) {\n    createOrder(input: $input) {\n      orderId\n      orderNumber\n      productId\n      userId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateOrder($input: UpdateOrderDto!) {\n    updateOrder(input: $input) {\n      orderId\n      orderNumber\n      productId\n      userId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateOrder($input: UpdateOrderDto!) {\n    updateOrder(input: $input) {\n      orderId\n      orderNumber\n      productId\n      userId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation TransitionOrderStatus($input: TransitionOrderStatusDto!) {\n    transitionOrderStatus(input: $input) {\n      orderId\n      orderNumber\n      productId\n      userId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation TransitionOrderStatus($input: TransitionOrderStatusDto!) {\n    transitionOrderStatus(input: $input) {\n      orderId\n      orderNumber\n      productId\n      userId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      status\n      deliveryStatus\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetClientOrders($userId: Int!) {\n    clientOrders(userId: $userId) {\n      orderId\n      orderNumber\n      productId\n      userId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      deliveryFee\n      grandTotal\n      status\n      deliveryStatus\n      createdAt\n      updatedAt\n      paymentProofImage\n    }\n  }\n"): (typeof documents)["\n  query GetClientOrders($userId: Int!) {\n    clientOrders(userId: $userId) {\n      orderId\n      orderNumber\n      productId\n      userId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      deliveryFee\n      grandTotal\n      status\n      deliveryStatus\n      createdAt\n      updatedAt\n      paymentProofImage\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetOrderDetails($orderId: Int!) {\n    orderDetails(orderId: $orderId) {\n      orderId\n      orderNumber\n      productId\n      userId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      deliveryFee\n      grandTotal\n      status\n      deliveryStatus\n      createdAt\n      updatedAt\n      paymentProofImage\n    }\n  }\n"): (typeof documents)["\n  query GetOrderDetails($orderId: Int!) {\n    orderDetails(orderId: $orderId) {\n      orderId\n      orderNumber\n      productId\n      userId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      deliveryFee\n      grandTotal\n      status\n      deliveryStatus\n      createdAt\n      updatedAt\n      paymentProofImage\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllOrders {\n    allOrders {\n      orderId\n      orderNumber\n      productId\n      userId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      deliveryFee\n      grandTotal\n      status\n      deliveryStatus\n      createdAt\n      updatedAt\n      paymentProofImage\n    }\n  }\n"): (typeof documents)["\n  query GetAllOrders {\n    allOrders {\n      orderId\n      orderNumber\n      productId\n      userId\n      orderType\n      quantity\n      unitPrice\n      totalPrice\n      deliveryFee\n      grandTotal\n      status\n      deliveryStatus\n      createdAt\n      updatedAt\n      paymentProofImage\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateProduct($input: CreateProductDto!) {\n    createProduct(input: $input) {\n        productId\n        productName\n        productDescription\n        sku\n        category\n        productPrice\n        reorderPoint\n        available\n        blocked\n        inTransit\n        createdAt\n        updatedAt\n    }\n}\n"): (typeof documents)["\n  mutation CreateProduct($input: CreateProductDto!) {\n    createProduct(input: $input) {\n        productId\n        productName\n        productDescription\n        sku\n        category\n        productPrice\n        reorderPoint\n        available\n        blocked\n        inTransit\n        createdAt\n        updatedAt\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateProduct($id: Int!, $input: UpdateProductDto!) {\n    updateProduct(id: $id, input: $input) {\n        productId\n        productName\n        productDescription\n        sku\n        category\n        productPrice\n        reorderPoint\n        available\n        blocked\n        inTransit\n        createdAt\n        updatedAt\n    }\n}\n"): (typeof documents)["\n  mutation UpdateProduct($id: Int!, $input: UpdateProductDto!) {\n    updateProduct(id: $id, input: $input) {\n        productId\n        productName\n        productDescription\n        sku\n        category\n        productPrice\n        reorderPoint\n        available\n        blocked\n        inTransit\n        createdAt\n        updatedAt\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteProduct($productId: Int!) {\n    deleteProduct(productId: $productId) {\n        productId\n    }\n}\n"): (typeof documents)["\n  mutation DeleteProduct($productId: Int!) {\n    deleteProduct(productId: $productId) {\n        productId\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProducts {\n    getProducts {\n      productId\n      productName\n      productDescription\n      sku\n      category\n      productPrice\n      reorderPoint\n      available\n      blocked\n      inTransit\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetProducts {\n    getProducts {\n      productId\n      productName\n      productDescription\n      sku\n      category\n      productPrice\n      reorderPoint\n      available\n      blocked\n      inTransit\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProductById($productId: Int!) {\n    getProductById(productId: $productId) {\n      productId\n      productName\n      productDescription\n      sku\n      category\n      productPrice\n      reorderPoint\n      available\n      inTransit\n      blocked\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetProductById($productId: Int!) {\n    getProductById(productId: $productId) {\n      productId\n      productName\n      productDescription\n      sku\n      category\n      productPrice\n      reorderPoint\n      available\n      inTransit\n      blocked\n      createdAt\n      updatedAt\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;