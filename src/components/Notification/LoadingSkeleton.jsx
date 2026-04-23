const LoadingSkeleton = () => (
  <div className="space-y-3">
    {[1, 2, 3].map((item) => (
      <div key={item} className="rounded-xl border border-gray-200 dark:border-slate-700 p-4 animate-pulse">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-slate-700" />
          <div className="flex-1 space-y-2">
            <div className="h-4 rounded bg-gray-200 dark:bg-slate-700 w-3/4" />
            <div className="h-3 rounded bg-gray-200 dark:bg-slate-700 w-full" />
            <div className="h-3 rounded bg-gray-200 dark:bg-slate-700 w-1/4" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default LoadingSkeleton;