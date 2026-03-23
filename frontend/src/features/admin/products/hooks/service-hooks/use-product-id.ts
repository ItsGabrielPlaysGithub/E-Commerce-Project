import { useQuery } from "@apollo/client/react";
import { GET_PRODUCT_BY_ID } from "../../services/query";
import { GetProductByIdQuery } from "@/gql/graphql";

export const useGetProductIdQuery = (productId: string | number | undefined) => {
    const id = productId ? parseInt(String(productId), 10) : null;
    
    return useQuery<GetProductByIdQuery>(
        GET_PRODUCT_BY_ID,
        {
            variables: { productId: id || 0 },
            skip: !id, // Skip query if no valid ID
        }
    );
};