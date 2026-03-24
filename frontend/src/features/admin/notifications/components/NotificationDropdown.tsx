"use client";

import { useQuery, useMutation } from "@apollo/client/react";
import { X, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { GET_NOTIFICATIONS, MARK_NOTIFICATION_AS_READ, MARK_ALL_NOTIFICATIONS_AS_READ } from "../../../b2b/orders/services/query";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

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

interface NotificationDropdownProps {
  userId: number | undefined;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * NotificationDropdown - Dropdown style notification list
 * Appears below the bell icon in the navbar
 * Clicking a notification marks it as read and navigates to the order
 */
export function NotificationDropdown({ userId, isOpen, onClose }: NotificationDropdownProps) {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data, loading, refetch } = useQuery<{
    getNotificationsByUserId: Notification[];
  }>(GET_NOTIFICATIONS, {
    skip: !userId || !isOpen,
  });

  const [markAsRead] = useMutation(MARK_NOTIFICATION_AS_READ, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Failed to mark as read:", error);
      toast.error("Failed to mark notification as read");
    },
  });

  const [markAllAsRead] = useMutation(MARK_ALL_NOTIFICATIONS_AS_READ, {
    onCompleted: () => {
      refetch();
      toast.success("All notifications marked as read");
    },
    onError: (error) => {
      console.error("Failed to mark all as read:", error);
      toast.error("Failed to mark notifications as read");
    },
  });

  const notifications = data?.getNotificationsByUserId || [];

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  const getNotificationDotColor = (type: string) => {
    switch (type) {
      case "payment_proof_rejected":
        return "#ef4444"; // red
      case "payment_proof_approved":
        return "#22c55e"; // green
      case "order_status_change":
        return "#3b82f6"; // blue
      default:
        return "#bf262f"; // maroon
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    if (isToday) {
      return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    }

    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const handleNotificationClick = async (notification: Notification) => {
    try {
      // Mark as read if not already read
      if (!notification.isRead) {
        await markAsRead({
          variables: {
            notificationId: notification.notificationId,
          },
        });
      }

      // Navigate to order if orderId exists
      if (notification.orderId) {
        onClose();
        router.push(`/b2b/my-orders?expandOrderId=${notification.orderId}`);
      }
    } catch (error) {
      console.error("Failed to handle notification click:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    if (!userId) return;
    
    try {
      await markAllAsRead({
        variables: {
          userId: userId,
        },
      });
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 z-50 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden w-96"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <div className="max-h-96 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-sm text-gray-500">Loading...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 px-4">
            <Bell className="h-8 w-8 text-gray-300 mb-2" />
            <p className="text-sm text-gray-500">No notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => {
              const dotColor = getNotificationDotColor(notification.type);

              return (
                <div
                  key={notification.notificationId}
                  onClick={() => handleNotificationClick(notification)}
                  className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                  style={{ borderLeft: `3px solid ${dotColor}` }}
                >
                  <div className="flex gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {notification.title}
                      </p>
                      <p className="text-xs text-gray-600 line-clamp-2 mt-0.5">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1.5">
                        {formatDate(notification.createdAt)}
                      </p>
                    </div>
                    {/* Unread indicator */}
                    {!notification.isRead && (
                      <div
                        className="flex-shrink-0 w-2 h-2 rounded-full mt-2"
                        style={{ backgroundColor: dotColor }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="border-t border-gray-100 px-4 py-2 bg-gray-50">
          <button 
            onClick={handleMarkAllAsRead}
            className="text-xs text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            Mark all as read
          </button>
        </div>
      )}
    </div>
  );
}
