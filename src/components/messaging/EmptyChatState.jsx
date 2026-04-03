import { MessageSquare, Search, PenSquare } from "lucide-react";

const EmptyChatState = () => {
  return (
    <div className="relative flex-1 h-full overflow-hidden bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/10" />
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-400/10" />
      </div>

      <div className="relative flex h-full items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-xl text-center">
          {/* Icon Card */}
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border border-blue-100 bg-white/80 shadow-lg shadow-blue-100/40 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
              <MessageSquare size={30} strokeWidth={2.2} />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Welcome to your messages
          </h2>

          {/* Description */}
          <p className="mx-auto mt-3 max-w-md text-sm sm:text-base leading-7 text-slate-600 dark:text-slate-400">
            Select a conversation from the sidebar to continue chatting, or
            start a new conversation to connect instantly.
          </p>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              <PenSquare size={18} />
              Start New Chat
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Search size={18} />
              Browse Conversations
            </button>
          </div>

          {/* Optional helper section */}
          <div className="mt-10 rounded-2xl border border-slate-200/80 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Messages from recruiters and job seekers will appear here. Keep
              your communication professional and respond promptly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyChatState;