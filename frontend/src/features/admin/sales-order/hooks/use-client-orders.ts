import { useQuery } from "@apollo/client/react";
import { GET_CLIENT_ORDERS } from "../services/query";
import { ClientOrdersQuery, ClientOrdersQueryVariables } from "@/gql/graphql";

export const useClientOrders = () => {
    return useQuery<ClientOrdersQuery, ClientOrdersQueryVariables>(
        GET_CLIENT_ORDERS
    );
};
