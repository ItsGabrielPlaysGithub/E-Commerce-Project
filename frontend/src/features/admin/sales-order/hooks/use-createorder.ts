import { useMutation } from "@apollo/client/react";
import { CREATE_ADMIN_ORDER } from "../services/mutation";
import { CreateOrderMutation, CreateOrderMutationVariables } from "@/gql/graphql";

export const useCreateOrder = () => {
    return useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CREATE_ADMIN_ORDER);
};
