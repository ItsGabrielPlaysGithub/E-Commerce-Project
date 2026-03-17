import { useQuery } from "@apollo/client/react";
import { GET_ORDER_DETAILS } from "../services/query";
import { OrderDetailsQuery, OrderDetailsQueryVariables } from "@/gql/graphql";

export const useOrderDetails = (orderId: number) => {
    return useQuery<OrderDetailsQuery, OrderDetailsQueryVariables>(
        GET_ORDER_DETAILS,
        { variables: { orderId } }
    );
};
