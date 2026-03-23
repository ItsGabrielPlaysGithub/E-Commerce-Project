import { useMutation } from "@apollo/client/react";
import { UPDATE_CATEGORY } from "../../services/category";
import { UpdateCategoryMutation, UpdateCategoryMutationVariables } from "@/gql/graphql";
import { GET_CATEGORIES } from "../../services/category";

export const useUpdateCategory = () => {
  return useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(
    UPDATE_CATEGORY,
    {
      refetchQueries: [{ query: GET_CATEGORIES }],
      awaitRefetchQueries: true,
    }
  );
};
