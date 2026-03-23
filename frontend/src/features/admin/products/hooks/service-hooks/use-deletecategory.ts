import { useMutation } from "@apollo/client/react";
import { DELETE_CATEGORY } from "../../services/category";
import { DeleteCategoryMutation, DeleteCategoryMutationVariables } from "@/gql/graphql";
import { GET_CATEGORIES } from "../../services/category";

export const useDeleteCategory = () => {
  return useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(
    DELETE_CATEGORY,
    {
      refetchQueries: [{ query: GET_CATEGORIES }],
      awaitRefetchQueries: true,
    }
  );
};
