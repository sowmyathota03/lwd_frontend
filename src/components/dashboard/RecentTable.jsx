// ./src/components/dashboard/common/RecentTable.jsx


const RecentTable = ({
  title,
  columns = [],   // ✅ default empty array
  data = [],      // ✅ default empty array
  keyField,
}) => {
  return (
    <div className="lwd-card p-5">

      {/* Title */}
      <h3 className="lwd-title mb-4">{title}</h3>

      <div className="overflow-x-auto">
        <table className="lwd-table">

          {/* Table Header */}
          <thead className="lwd-table-header">
            <tr>
              {columns.length > 0 ? (
                columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    {col.label}
                  </th>
                ))
              ) : (
                <th className="px-4 py-3 text-sm text-gray-500">
                  No Columns
                </th>
              )}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data.length > 0 ? (
              data.map((item, idx) => (
                <tr
                  key={keyField ? item[keyField] : idx}
                  className="lwd-table-row hover:bg-gray-50 dark:hover:bg-slate-700"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-4 py-3 whitespace-nowrap text-sm lwd-text"
                    >
                      {item?.[col.key] ?? "-"} {/* ✅ safe access */}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length || 1}
                  className="text-center py-4 text-sm text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default RecentTable;