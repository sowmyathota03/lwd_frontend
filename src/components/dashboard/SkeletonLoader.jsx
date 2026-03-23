// ./src/components/dashboard/common/SkeletonLoader.jsx

const SkeletonLoader = () => {
  return (
    <div className="lwd-section">

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="lwd-skeleton h-32"></div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lwd-skeleton h-64"></div>
        <div className="lwd-skeleton h-64"></div>
      </div>

      {/* Table */}
      <div className="lwd-skeleton h-80"></div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="lwd-skeleton h-48"></div>
        <div className="lwd-skeleton h-48"></div>
        <div className="lwd-skeleton h-48"></div>
      </div>

    </div>
  );
};

export default SkeletonLoader;