import { useQuery } from "@apollo/client/react";
import { GET_PRODUCT_BY_NAME } from "../../services/query";
import { GetProductByNameQuery } from "@/gql/graphql";

export const useGetProductByNameQuery = (productName: string | undefined) => {
    return useQuery<GetProductByNameQuery>(
        GET_PRODUCT_BY_NAME,
        {
            variables: { productName: productName || "" },
            skip: !productName, // Skip query if no valid name
        }
    );
};
