import { useQuery } from "@apollo/client/react";
import { GET_PRODUCTS } from "../services/query";
import { GetProductsQuery } from "@/gql/graphql";

export const useGetProductIdQuery = (productId: number) => {
    return useQuery<GetProductsQuery>(GET_PRODUCTS, {
        variables: { productId },
    });
}