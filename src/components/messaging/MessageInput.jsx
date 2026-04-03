import { useRef, useState } from "react";
import { SendHorizonal } from "lucide-react";

const MessageInput = ({
  onSendMessage,
  disabled = false,
  connected = false,
  sending = false,
}) => {
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef(null);

  const resizeTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    resizeTextarea();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (disabled || sending || !connected) return;

    const trimmed = inputValue.trim();
    if (!trimmed) return;

    onSendMessage(trimmed);
    setInputValue("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const isBlocked = disabled || sending || !connected;
  const canSend = inputValue.trim() && !isBlocked;

  return (
    <div className="border-t border-slate-200 bg-white/95 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/95">
      {/* Status bar */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">

        <span className="text-xs text-slate-400 dark:text-slate-500">
          {inputValue.length}/1000
        </span>
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="px-4 pb-4">
        <div className="flex items-end gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 shadow-sm transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:focus-within:border-blue-400 dark:focus-within:bg-slate-800">
          <textarea
            ref={textareaRef}
            rows={1}
            maxLength={1000}
            value={inputValue}
            disabled={disabled || sending}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={
              connected
                ? "Type your message..."
                : "Waiting for connection..."
            }
            className="max-h-35 min-h-4 flex-1 resize-none overflow-y-auto bg-transparent px-1 text-sm leading-6 text-slate-700 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-60 dark:text-slate-200 dark:placeholder:text-slate-500"
          />

          <button
            type="submit"
            disabled={!canSend}
            className={`
              inline-flex h-6 w-6 items-center justify-center rounded-xl
              transition-all duration-200
              ${
                canSend
                  ? "bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg active:scale-95"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-700 dark:text-slate-500"
              }
            `}
            aria-label="Send message"
          >
            <SendHorizonal size={18} className="translate-x-px" />
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between px-1">
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            Press Enter to send • Shift + Enter for new line
          </p>

          {sending && (
            <span className="text-[11px] font-medium text-blue-600 dark:text-blue-400">
              Sending...
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default MessageInput;