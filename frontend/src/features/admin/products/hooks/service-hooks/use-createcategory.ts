import { useMutation } from "@apollo/client/react";
import { CREATE_CATEGORY } from "../../services/category";
import { CreateCategoryMutation, CreateCategoryMutationVariables } from "@/gql/graphql";
import { GET_CATEGORIES } from "../../services/category";

export const useCreateCategory = () => {
  return useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(
    CREATE_CATEGORY,
    {
      refetchQueries: [{ query: GET_CATEGORIES }],
      awaitRefetchQueries: true,
    }
  );
};
