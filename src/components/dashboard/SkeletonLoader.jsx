// ./src/components/dashboard/common/SkeletonLoader.jsx

const SkeletonLoader = () => {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-lg h-32"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-200 rounded-lg h-64"></div>
        <div className="bg-gray-200 rounded-lg h-64"></div>
      </div>
      <div className="bg-gray-200 rounded-lg h-80"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-200 rounded-lg h-48"></div>
        <div className="bg-gray-200 rounded-lg h-48"></div>
        <div className="bg-gray-200 rounded-lg h-48"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;