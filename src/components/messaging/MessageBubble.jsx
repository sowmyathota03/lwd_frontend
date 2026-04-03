import React, { useMemo } from "react";
import {
  Check,
  CheckCheck,
  Clock3,
  AlertCircle,
  Trash2,
} from "lucide-react";

const MessageBubble = ({
  message,
  isMe,
  selectionMode = false,
  isSelected = false,
  onToggleSelect,
  onDeleteMessage,
}) => {
  const formattedTime = useMemo(() => {
    return message?.timestamp
      ? new Date(message.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";
  }, [message?.timestamp]);

  const isDeleted = message?.softDeleted === true;

  const handleToggleSelect = () => {
    if (!message?.id || typeof onToggleSelect !== "function") return;
    onToggleSelect(message.id);
  };

  const handleDelete = () => {
    if (!message?.id || typeof onDeleteMessage !== "function") return;
    onDeleteMessage(message.id);
  };

  const renderStatus = () => {
    if (!isMe || isDeleted) return null;

    switch (message?.status) {
      case "PENDING":
        return <Clock3 size={13} className="text-amber-300 shrink-0" />;
      case "SENT":
        return <Check size={13} className="text-white/70 shrink-0" />;
      case "DELIVERED":
        return <CheckCheck size={13} className="text-white/70 shrink-0" />;
      case "READ":
        return <CheckCheck size={13} className="text-sky-300 shrink-0" />;
      case "FAILED":
        return <AlertCircle size={13} className="text-red-300 shrink-0" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} px-3 py-1.5`}>
      <div className="flex items-end gap-2 max-w-[78%] sm:max-w-[72%]">
        {selectionMode && (
          <label className="flex items-center pb-2 cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleToggleSelect}
              className="h-4 w-4 rounded border-slate-400 text-blue-600 focus:ring-blue-500"
            />
          </label>
        )}

        <div
          className={`
            group relative min-w-24 max-w-full rounded-2xl px-4 py-3 shadow-sm
            transition-all duration-200
            ${isMe
              ? "bg-linear-to-br from-blue-500 to-blue-600 text-white rounded-br-md"
              : "bg-slate-800/95 text-slate-100 border border-slate-700 rounded-bl-md"}
            ${isSelected ? "ring-2 ring-blue-400" : ""}
            ${isDeleted ? "opacity-80" : ""}
          `}
        >
          {!selectionMode && isMe && !isDeleted && (
            <button
              type="button"
              onClick={handleDelete}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition p-1 rounded-md hover:bg-white/10"
              aria-label="Delete message"
              title="Delete message"
            >
              <Trash2 size={14} className="text-white/80" />
            </button>
          )}

          <p
            className={`text-[15px] leading-6 whitespace-pre-wrap wrap-anywhere ${
              !selectionMode && isMe && !isDeleted ? "pr-7" : ""
            } ${isDeleted ? "italic text-white/75 dark:text-slate-400" : ""}`}
          >
            {isDeleted ? "This message was deleted" : message?.text || ""}
          </p>

          <div
            className={`mt-2 flex items-center gap-1 text-[11px] ${
              isMe ? "justify-end text-white/80" : "justify-end text-slate-400"
            }`}
          >
            <span>{formattedTime}</span>
            {renderStatus()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MessageBubble);