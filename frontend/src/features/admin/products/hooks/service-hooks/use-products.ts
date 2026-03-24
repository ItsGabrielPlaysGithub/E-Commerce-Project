import { useQuery } from "@apollo/client/react";
import { GET_PRODUCTS } from "../../services/query";
import { GetProductsQuery } from "@/gql/graphql";

export const useProducts = () => {
    // Products are public data - no authentication required
    return useQuery<GetProductsQuery>(GET_PRODUCTS);
};
