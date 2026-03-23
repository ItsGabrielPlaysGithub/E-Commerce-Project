import { useMutation } from "@apollo/client/react";
import { CREATE_PRODUCT } from "../../services/mutation";
import { CreateProductMutation, CreateProductMutationVariables, GetProductsQuery } from "@/gql/graphql";
import { GET_PRODUCTS } from "../../services/query";

export const useCreateProduct = () => {
    return useMutation<CreateProductMutation, CreateProductMutationVariables>(CREATE_PRODUCT, {
        update(cache, { data }) {
            if (!data?.createProduct) return;

            try {
                const existingData = cache.readQuery<GetProductsQuery>({ query: GET_PRODUCTS });
                if (!existingData) return;

                // Add the new product to the cache
                cache.writeQuery<GetProductsQuery>({
                    query: GET_PRODUCTS,
                    data: {
                        getProducts: [...existingData.getProducts, data.createProduct],
                    },
                });
            } catch (error) {
                console.error('Error creating product in cache:', error);
            }
        },
    });
}
