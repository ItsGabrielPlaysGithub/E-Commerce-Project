"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { toast } from "sonner";
import { GET_NOTIFICATIONS } from "../services/query";

interface Notification {
  notificationId: number;
  userId: number;
  type: string;
  title: string;
  message: string;
  orderId?: number;
  isRead: boolean;
  createdAt: string;
  readAt?: string;
  metadata?: string;
}

export function useOrderNotifications(userId: number | undefined) {
  const [shownNotifications, setShownNotifications] = useState<Set<number>>(
    new Set()
  );

  const { data, loading, refetch } = useQuery<{
    getNotificationsByUserId: Notification[];
  }>(GET_NOTIFICATIONS, {
    skip: !userId,
    pollInterval: 30000, // Poll every 30 seconds for new notifications
  });

  // Show toast notifications for unread items
  useEffect(() => {
    if (!data?.getNotificationsByUserId) return;

    const notifications = data.getNotificationsByUserId.filter(
      (n) => !n.isRead && !shownNotifications.has(n.notificationId)
    );

    notifications.forEach((notification) => {
      if (notification.type === "payment_proof_rejected") {
        toast.error(`${notification.title}\n${notification.message}`, {
          description: notification.orderId
            ? `Order #${notification.orderId}`
            : undefined,
          duration: 5000,
        });
      } else if (notification.type === "payment_proof_approved") {
        toast.success(`${notification.title}\n${notification.message}`, {
          description: notification.orderId
            ? `Order #${notification.orderId}`
            : undefined,
          duration: 5000,
        });
      } else {
        toast.info(`${notification.title}\n${notification.message}`, {
          description: notification.orderId
            ? `Order #${notification.orderId}`
            : undefined,
          duration: 5000,
        });
      }

      setShownNotifications((prev) => {
        const updated = new Set(prev);
        updated.add(notification.notificationId);
        return updated;
      });
    });
  }, [data?.getNotificationsByUserId, shownNotifications]);

  return {
    notifications: data?.getNotificationsByUserId || [],
    loading,
    refetch,
  };
}
