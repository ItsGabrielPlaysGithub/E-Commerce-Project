import { useMutation } from "@apollo/client/react";
import { DELETE_PRODUCT } from "../../services/mutation";
import { DeleteProductMutation, DeleteProductMutationVariables, GetProductsQuery } from "@/gql/graphql";
import { GET_PRODUCTS } from "../../services/query";

export const useDeleteProduct = () => {
    return useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DELETE_PRODUCT, {
        update(cache, { data }) {
            if (!data?.deleteProduct) return;

            try {
                const existingData = cache.readQuery<GetProductsQuery>({ query: GET_PRODUCTS });
                if (!existingData) return;

                // Remove the deleted product from the cache
                const updatedProducts = existingData.getProducts.filter(
                    (product) => product.productId !== data.deleteProduct!.productId
                );

                cache.writeQuery<GetProductsQuery>({
                    query: GET_PRODUCTS,
                    data: {
                        getProducts: updatedProducts,
                    },
                });
            } catch (error) {
                console.error('Error deleting product from cache:', error);
            }
        },
    });
}