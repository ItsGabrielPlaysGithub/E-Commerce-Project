import { useMutation } from "@apollo/client/react";
import { TRANSITION_ADMIN_ORDER_STATUS } from "../services/mutation";
import { TransitionOrderStatusMutation, TransitionOrderStatusMutationVariables } from "@/gql/graphql";

export const useTransitionOrderStatus = () => {
    return useMutation<TransitionOrderStatusMutation, TransitionOrderStatusMutationVariables>(TRANSITION_ADMIN_ORDER_STATUS);
};
