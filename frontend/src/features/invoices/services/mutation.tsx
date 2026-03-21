import { gql } from "@apollo/client";

/**
 * GraphQL Mutations for Invoices
 */
export const PAY_INVOICE_BY_ORDER_ID = gql`
  mutation PayInvoiceByOrderId($orderId: Int!) {
    payInvoiceByOrderId(orderId: $orderId) {
      invoiceId
      orderId
      invoiceNumber
      totalAmount
      paymentStatus
      dueDate
      updatedAt
    }
  }
`;
