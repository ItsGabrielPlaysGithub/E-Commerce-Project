import { useMutation } from "@apollo/client/react";
import { DELETE_PRODUCT } from "../services/mutation";
import { DeleteProductMutation, DeleteProductMutationVariables } from "@/gql/graphql";

export const useDeleteProduct = () => {
    return useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DELETE_PRODUCT);
}