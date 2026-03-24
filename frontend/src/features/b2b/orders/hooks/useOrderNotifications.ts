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
    variables: { userId: userId || 0 },
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
      // Toast notifications removed - using dropdown notifications instead
      // Mark as shown to avoid showing duplicates
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
