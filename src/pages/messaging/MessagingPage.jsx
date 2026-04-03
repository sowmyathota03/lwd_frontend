import Messaging from "../../components/messaging/Messaging";

export default function MessagingPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-5xl mx-auto shadow-2xl rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700">
        <Messaging />
      </div>
    </div>
  );
}