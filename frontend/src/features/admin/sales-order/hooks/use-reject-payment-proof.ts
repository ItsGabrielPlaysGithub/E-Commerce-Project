import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { AllOrdersQuery } from "@/gql/graphql";
import { GET_ALL_ORDERS } from "../services/query";

const REJECT_PAYMENT_PROOF = gql`
  mutation RejectPaymentProof($input: RejectPaymentProofDto!) {
    rejectPaymentProof(input: $input) {
      orderId
      status
      paymentProofStatus
      paymentProofAttempts
      paymentProofRejectionReason
      rejectionReason
    }
  }
`;

interface RejectPaymentProofInput {
  orderId: number;
  rejectionReason: string;
}

export const useRejectPaymentProof = () => {
  return useMutation<any, { input: RejectPaymentProofInput }>(REJECT_PAYMENT_PROOF, {
    update(cache, { data }) {
      if (!data?.rejectPaymentProof) return;

      const existingData = cache.readQuery<AllOrdersQuery>({ query: GET_ALL_ORDERS });
      if (!existingData) return;

      // Update the cache with the rejected payment proof
      const updatedOrders = existingData.allOrders.map((order) =>
        order.orderId === data.rejectPaymentProof!.orderId
          ? {
              ...order,
              ...data.rejectPaymentProof,
            }
          : order
      );

      cache.writeQuery<AllOrdersQuery>({
        query: GET_ALL_ORDERS,
        data: {
          allOrders: updatedOrders,
        },
      });
    },
  });
};
