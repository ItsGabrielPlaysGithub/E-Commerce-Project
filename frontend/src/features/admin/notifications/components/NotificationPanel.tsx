"use client";

import { useQuery } from "@apollo/client/react";
import { X, AlertCircle, CheckCircle, Clock, Bell } from "lucide-react";
import { GET_NOTIFICATIONS } from "../../../b2b/orders/services/query";

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

interface NotificationPanelProps {
  userId: number | undefined;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * NotificationPanel - Elegant, minimal notification modal
 * Matches project theme with red/maroon color scheme
 */
export function NotificationPanel({ userId, isOpen, onClose }: NotificationPanelProps) {
  const { data, loading } = useQuery<{
    getNotificationsByUserId: Notification[];
  }>(GET_NOTIFICATIONS, {
    skip: !userId || !isOpen,
  });

  const notifications = data?.getNotificationsByUserId || [];

  const getNotificationStyle = (type: string) => {
    switch (type) {
      case "payment_proof_rejected":
        return {
          bgLight: "#fef2f2",
          borderColor: "#fecaca",
          dotColor: "#ef4444",
          textColor: "#991b1b",
          icon: AlertCircle,
        };
      case "payment_proof_approved":
        return {
          bgLight: "#f0fdf4",
          borderColor: "#bbf7d0",
          dotColor: "#22c55e",
          textColor: "#166534",
          icon: CheckCircle,
        };
      case "order_status_change":
        return {
          bgLight: "#eff6ff",
          borderColor: "#bfdbfe",
          dotColor: "#3b82f6",
          textColor: "#1e40af",
          icon: Clock,
        };
      default:
        return {
          bgLight: "#f9f9f9",
          borderColor: "#e5e5e5",
          dotColor: "#bf262f",
          textColor: "#4b5563",
          icon: Bell,
        };
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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal - Centered, elegant, minimal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="w-full max-w-md pointer-events-auto rounded-2xl bg-white shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 -mr-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <p className="text-sm text-gray-500">Loading...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-6">
                <Bell className="h-10 w-10 text-gray-300 mb-3" />
                <p className="text-sm text-gray-500 text-center">No notifications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => {
                  const style = getNotificationStyle(notification.type);
                  const Icon = style.icon;

                  return (
                    <div
                      key={notification.notificationId}
                      className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer group"
                      style={{ borderLeft: `4px solid ${style.dotColor}` }}
                    >
                      <div className="flex gap-3">
                        {/* Icon */}
                        <div
                          className="flex-shrink-0 p-2 rounded-lg mt-0.5"
                          style={{ backgroundColor: style.bgLight }}
                        >
                          <Icon className="h-4 w-4" style={{ color: style.dotColor }} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 mb-0.5">
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400">
                            {formatDate(notification.createdAt)}
                          </p>
                        </div>

                        {/* Unread dot */}
                        {!notification.isRead && (
                          <div
                            className="flex-shrink-0 w-2 h-2 rounded-full mt-2"
                            style={{ backgroundColor: style.dotColor }}
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
            <div className="border-t border-gray-100 px-6 py-3 bg-gray-50">
              <button className="text-xs text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Mark all as read
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
