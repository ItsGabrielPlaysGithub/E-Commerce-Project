import { useQuery } from "@apollo/client/react";
import { GET_CATEGORIES } from "../../services/category";
import { GetCategoriesQuery } from "@/gql/graphql";

export const useGetCategories = () => {
  return useQuery<GetCategoriesQuery>(GET_CATEGORIES);
};
