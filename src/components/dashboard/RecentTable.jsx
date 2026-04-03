// ./src/components/dashboard/common/RecentTable.jsx

const RecentTable = ({
  title,
  columns = [],
  data = [],
  keyField,
}) => {
  return (
    <div className="lwd-card p-0 overflow-hidden">

      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-sm font-bold text-slate-800 dark:text-white">
          {title}
        </h3>
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">

          <thead className="bg-slate-50/50 dark:bg-slate-900/30">
            <tr>
              {columns.length > 0 ? (
                columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-6 py-3 text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800"
                  >
                    {col.label}
                  </th>
                ))
              ) : (
                <th className="px-6 py-3 text-xs font-medium text-slate-400">
                  No columns defined
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {data.length > 0 ? (
              data.map((item, idx) => (
                <tr
                  key={keyField ? item[keyField] : idx}
                  className="hover:bg-blue-50/20 dark:hover:bg-blue-900/5 transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-600 dark:text-slate-300"
                    >
                      {item?.[col.key] ?? "—"}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length || 1}
                  className="px-6 py-12 text-center text-sm font-medium text-slate-400 dark:text-slate-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-slate-50/30 dark:bg-slate-900/20 border-t border-slate-100 dark:border-slate-800 flex justify-end">
        <span className="text-xs font-medium text-slate-400">
          Showing last {data.length} {data.length === 1 ? "entry" : "entries"}
        </span>
      </div>
    </div>
  );
};

export default RecentTable;