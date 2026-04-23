import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { getUnreadNotificationCount } from "../../api/notificationApi";
import { AuthContext } from "../../context/AuthContext";
import { useMessagingSocket } from "../../hooks/useMessagingSocket";
import { useRealtimeCount } from "../../hooks/useRealtimeCount";

const NotificationBell = ({ navItemClass }) => {
  const { user } = useContext(AuthContext);
  const { connected, unreadNotificationCount } = useMessagingSocket(user?.userId);

  const unreadCount = useRealtimeCount({
    socketCount: unreadNotificationCount,
    connected,
    fetchCountApi: getUnreadNotificationCount,
  });

  return (
    <NavLink to="/notifications" className={navItemClass}>
      <div className="relative flex items-center justify-center">
        <span className="text-lg">🔔</span>

        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 min-w-4.5 h-4.5 px-1 text-[10px] flex items-center justify-center bg-red-500 text-white rounded-full leading-none">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </div>
    </NavLink>
  );
};

export default NotificationBell;