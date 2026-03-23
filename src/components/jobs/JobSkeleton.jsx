function JobSkeleton() {
  return (
    <div className="w-72 p-5 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse flex flex-col gap-3 shadow-sm">
      {/* Job Title */}
      <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded-lg w-3/4" />

      {/* Company / Location */}
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-lg w-1/2" />

      {/* Description lines */}
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-lg w-full" />
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-lg w-5/6" />

      {/* Skills / Tags */}
      <div className="flex gap-2 mt-2">
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded-full w-10" />
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded-full w-14" />
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded-full w-8" />
      </div>
    </div>
  );
}

export default JobSkeleton;