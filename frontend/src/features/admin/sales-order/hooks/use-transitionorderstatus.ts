import { useMutation } from "@apollo/client/react";
import { TRANSITION_ADMIN_ORDER_STATUS } from "../services/mutation";
import { TransitionOrderStatusMutation, TransitionOrderStatusMutationVariables } from "@/gql/graphql";
import { GET_ALL_ORDERS } from "../services/query";

export const useTransitionOrderStatus = () => {
    return useMutation<TransitionOrderStatusMutation, TransitionOrderStatusMutationVariables>(
        TRANSITION_ADMIN_ORDER_STATUS,
        {
            refetchQueries: [{ query: GET_ALL_ORDERS }],
            awaitRefetchQueries: true,
        }
    );
};
