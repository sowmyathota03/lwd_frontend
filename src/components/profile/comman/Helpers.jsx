export const Section = ({ title, children, onEdit, editing, editable }) => (
  <div className="bg-white border border-gray-200 p-6 rounded-xl space-y-4">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold">{title}</h3>

      {editable && !editing && (
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 rounded-md hover:bg-blue-100 transition"
          aria-label="Edit section"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          Edit
        </button>
      )}
    </div>

    {children}
  </div>
);

export const Grid = ({ children }) => (
  <div className="grid md:grid-cols-2 gap-6">{children}</div>
);

export const Field = ({ label, value }) => (
  <div className="flex gap-2">
    <p className="text-xs uppercase text-gray-500 mt-1">{label}:</p>
    <p className="font-medium">{value || "-"}</p>
  </div>
);

export const Input = ({ label, ...props }) => (
  <div>
    {label && (
      <label className="text-xs uppercase text-gray-500 mb-1 block">
        {label}
      </label>
    )}
    <input
      {...props}
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
    />
  </div>
);

export const Buttons = ({ onCancel, onSave, loading }) => (
  <div className="flex gap-4 mt-4">
    <button
      onClick={onCancel}
      className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
    >
      Cancel
    </button>

    <button
      onClick={onSave}
      disabled={loading}
      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-60"
    >
      {loading ? "Saving..." : "Save"}
    </button>
  </div>
);

export const Select = ({ label, options = [], ...props }) => (
  <div>
    {label && (
      <label className="text-xs uppercase text-gray-500 mb-1 block">
        {label}
      </label>
    )}

    <select
      {...props}
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
    >
      <option value="">Select {label}</option>

      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export const Checkbox = ({ label, ...props }) => (
  <div className="flex items-center gap-2 mt-2">
    <input type="checkbox" {...props} className="w-4 h-4 accent-blue-600" />

    {label && <label className="text-sm text-gray-700">{label}</label>}
  </div>
);

export const formatSkill = (skill) => {
  if (!skill) return "";
  return skill
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
