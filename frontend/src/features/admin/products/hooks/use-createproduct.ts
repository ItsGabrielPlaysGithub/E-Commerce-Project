import { useMutation } from "@apollo/client/react";
import { CREATE_PRODUCT } from "../services/mutation";
import { CreateProductMutation, CreateProductMutationVariables } from "@/gql/graphql";

export const useCreateProduct = () => {
    return useMutation<CreateProductMutation, CreateProductMutationVariables>(CREATE_PRODUCT);
}
