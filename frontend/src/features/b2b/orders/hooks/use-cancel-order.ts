'use client';

import { useMutation } from '@apollo/client/react';
import { CANCEL_ORDER } from '../services/mutation';
import { GET_CLIENT_ORDERS } from '../services/query';

type CancelOrderMutationData = {
  cancelOrder: {
    orderId: number;
  };
};

type CancelOrderMutationVars = {
  input: {
    orderId: number;
  };
};

type ClientOrdersQueryData = {
  clientOrders: Array<Record<string, unknown> & { orderId: number }>;
};

export const useCancelOrder = () => {
  const [cancelOrderMutation] = useMutation<CancelOrderMutationData, CancelOrderMutationVars>(CANCEL_ORDER, {
    update(cache, { data }) {
      if (!data?.cancelOrder) return;

      // Update the client's orders cache
      const existingData = cache.readQuery<ClientOrdersQueryData>({ query: GET_CLIENT_ORDERS });
      if (!existingData) return;

      const updatedOrders = existingData.clientOrders.map((order) =>
        order.orderId === data.cancelOrder.orderId
          ? { ...order, ...data.cancelOrder }
          : order
      );

      cache.writeQuery({
        query: GET_CLIENT_ORDERS,
        data: {
          clientOrders: updatedOrders,
        },
      });
    },
  });

  return {
    cancelOrder: async (orderId: number) => {
      return cancelOrderMutation({
        variables: {
          input: { orderId },
        },
      });
    },
  };
};
