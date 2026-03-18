import { useMutation } from "@apollo/client/react";
import { UPDATE_ADMIN_ORDER } from "../services/mutation";
import { UpdateOrderMutation, UpdateOrderMutationVariables } from "@/gql/graphql";

export const useUpdateOrder = () => {
    return useMutation<UpdateOrderMutation, UpdateOrderMutationVariables>(UPDATE_ADMIN_ORDER);
};
