import { useMutation } from "@apollo/client/react";
import { UPDATE_ORDER } from "../services/mutation";
import { UpdateOrderMutation, UpdateOrderMutationVariables } from "@/gql/graphql";

export const useUpdateOrder = () => {
    return useMutation<UpdateOrderMutation, UpdateOrderMutationVariables>(UPDATE_ORDER);
};
