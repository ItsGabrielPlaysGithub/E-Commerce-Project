import { useMutation } from "@apollo/client/react";
import { TRANSITION_ORDER_STATUS } from "../services/mutation";

export const useUpdateOrderStatus = () => {
  return useMutation(TRANSITION_ORDER_STATUS);
};
