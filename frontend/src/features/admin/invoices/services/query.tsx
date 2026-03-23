import { gql } from "@apollo/client";

/**
 * GraphQL Queries for Invoices
 */
export const GET_ALL_INVOICES = gql`
  query GetAllInvoices {
    allInvoices {
      invoiceId
      orderId
      userId
      invoiceNumber
      totalAmount
      dueDate
      paymentStatus
      createdAt
      updatedAt
    }
  }
`;

export const GET_INVOICE_BY_ID = gql`
  query GetInvoiceById($invoiceId: Int!) {
    invoiceByOrderId(orderId: $invoiceId) {
      invoiceId
      orderId
      userId
      invoiceNumber
      totalAmount
      dueDate
      paymentStatus
      createdAt
      updatedAt
    }
  }
`;
