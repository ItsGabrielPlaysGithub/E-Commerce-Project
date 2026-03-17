import { useQuery } from "@apollo/client/react";
import { GET_ALL_ORDERS } from "../services/query";
import { AllOrdersQuery } from "@/gql/graphql";

export const useOrders = () => {
    return useQuery<AllOrdersQuery>(GET_ALL_ORDERS);
};
