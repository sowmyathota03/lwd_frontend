import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { getUnreadMessageCount } from "../../api/messagingApi";
import { AuthContext } from "../../context/AuthContext";
import { useMessagingSocket } from "../../hooks/useMessagingSocket";
import { useRealtimeCount } from "../../hooks/useRealtimeCount";

const MessageBadge = ({ navItemClass }) => {
  const { user } = useContext(AuthContext);
  const { connected, unreadMessageCount } = useMessagingSocket(user?.userId);

  const count = useRealtimeCount({
    socketCount: unreadMessageCount,
    connected,
    fetchCountApi: getUnreadMessageCount,
  });

  return (
    <NavLink to="/messaging" className={navItemClass}>
      <div className="relative flex items-center justify-center">
        <span className="text-lg">💬</span>

        {count > 0 && (
          <span className="absolute -top-2 -right-2 min-w-4.5 h-4.5 px-1 text-[10px] flex items-center justify-center bg-red-500 text-white rounded-full leading-none">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </div>
    </NavLink>
  );
};

export default MessageBadge;