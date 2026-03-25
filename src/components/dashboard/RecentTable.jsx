// ./src/components/dashboard/common/RecentTable.jsx
import React from "react";

const RecentTable = ({ title, columns, data, keyField }) => {
  return (
    <div className="lwd-card p-5">

      {/* Title */}
      <h3 className="lwd-title mb-4">{title}</h3>

      <div className="overflow-x-auto">
        <table className="lwd-table">

          {/* Table Header */}
          <thead className="lwd-table-header">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data.map((item, idx) => (
              <tr
                key={keyField ? item[keyField] : idx}
                className="lwd-table-row hover:bg-gray-50 dark:hover:bg-slate-700"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-4 py-3 whitespace-nowrap text-sm lwd-text"
                  >
                    {item[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default RecentTable;