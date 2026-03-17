import { useMutation } from "@apollo/client/react";
import { TRANSITION_ORDER_STATUS } from "../services/mutation";
import { TransitionOrderStatusMutation, TransitionOrderStatusMutationVariables } from "@/gql/graphql";

export const useTransitionOrderStatus = () => {
    return useMutation<TransitionOrderStatusMutation, TransitionOrderStatusMutationVariables>(TRANSITION_ORDER_STATUS);
};
