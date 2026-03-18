import { useMutation } from "@apollo/client/react";
import { TRANSITION_ADMIN_ORDER_STATUS } from "../services/mutation";
import { TransitionOrderStatusMutation, TransitionOrderStatusMutationVariables, AllOrdersQuery } from "@/gql/graphql";
import { GET_ALL_ORDERS } from "../services/query";

export const useTransitionOrderStatus = () => {
    return useMutation<TransitionOrderStatusMutation, TransitionOrderStatusMutationVariables>(TRANSITION_ADMIN_ORDER_STATUS, {
        update(cache, { data }) {
            if (!data?.transitionOrderStatus) return;

            const existingData = cache.readQuery<AllOrdersQuery>({ query: GET_ALL_ORDERS });
            if (!existingData) return;

            // Update the cache with the new order status
            const updatedOrders = existingData.allOrders.map((order) =>
                order.orderId === data.transitionOrderStatus!.orderId
                    ? (data.transitionOrderStatus as any)
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
