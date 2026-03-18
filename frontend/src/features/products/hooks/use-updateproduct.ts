import { useMutation } from "@apollo/client/react";
import { UPDATE_PRODUCT } from "../services/mutation";
import { UpdateProductMutation, UpdateProductMutationVariables, GetProductsQuery } from "@/gql/graphql";
import { GET_PRODUCTS } from "../services/query";

export const useUpdateProduct = () => {
    return useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UPDATE_PRODUCT, {
        update(cache, { data }) {
            if (!data?.updateProduct) return;

            const existingData = cache.readQuery<GetProductsQuery>({ query: GET_PRODUCTS });
            if (!existingData) return;

            // Update the cache with the new product data
            const updatedProducts = existingData.getProducts.map((product) =>
                product.productId === data.updateProduct!.productId
                    ? (data.updateProduct as any)
                    : product
            );

            cache.writeQuery<GetProductsQuery>({
                query: GET_PRODUCTS,
                data: {
                    getProducts: updatedProducts,
                },
            });
        },
    });
}