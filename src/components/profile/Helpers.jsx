 export const Section = ({ title, children, onEdit, editing, editable }) => (
    <div className="bg-gray-100 p-6 rounded-xl space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{title}</h3>

        {editable && !editing && (
          <button
            onClick={onEdit}
            className="text-sm bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition"
          >
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
    <div>
      <p className="text-xs uppercase text-gray-500">{label}</p>
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