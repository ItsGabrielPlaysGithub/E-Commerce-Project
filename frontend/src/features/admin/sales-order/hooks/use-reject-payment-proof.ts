import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
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
    refetchQueries: [{ query: GET_ALL_ORDERS }],
    awaitRefetchQueries: true,
  });
};
