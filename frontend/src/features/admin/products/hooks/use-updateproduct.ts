import { useMutation } from "@apollo/client/react";
import { UPDATE_PRODUCT } from "../services/mutation";
import { UpdateProductMutation, UpdateProductMutationVariables } from "@/gql/graphql";

export const useUpdateProduct = () => {
    return useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UPDATE_PRODUCT);
}