// ================= SECTION =================
export const Section = ({ title, children, onEdit, editing, editable }) => (
  <div className="lwd-card space-y-4">

    <div className="flex justify-between items-center">
      <h3 className="lwd-section-title">{title}</h3>

      {editable && !editing && (
        <button
          onClick={onEdit}
          className="lwd-btn-primary-sm flex items-center gap-2"
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

// ================= GRID =================
export const Grid = ({ children }) => (
  <div className="grid md:grid-cols-2 gap-6">{children}</div>
);

// ================= FIELD =================
export const Field = ({ label, value }) => (
  <div>
    <p className="lwd-label uppercase tracking-wider">{label}</p>
    <p className="lwd-text mt-1">{value || "—"}</p>
  </div>
);

// ================= INPUT =================
export const Input = ({ label, ...props }) => (
  <div>
    {label && (
      <label className="lwd-label mb-1 block">{label}</label>
    )}
    <input
      {...props}
      className="lwd-input"
    />
  </div>
);

// ================= BUTTONS =================
export const Buttons = ({ onCancel, onSave, loading }) => (
  <div className="flex gap-4 mt-4">

    <button
      onClick={onCancel}
      className="lwd-btn-outline"
    >
      Cancel
    </button>

    <button
      onClick={onSave}
      disabled={loading}
      className="lwd-btn-primary disabled:opacity-60"
    >
      {loading ? "Saving..." : "Save"}
    </button>

  </div>
);

// ================= SELECT =================
export const Select = ({ label, options = [], ...props }) => (
  <div>
    {label && (
      <label className="lwd-label mb-1 block">{label}</label>
    )}

    <select
      {...props}
      className="lwd-input"
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

// ================= CHECKBOX =================
export const Checkbox = ({ label, ...props }) => (
  <div className="flex items-center gap-2 mt-2">

    <input
      type="checkbox"
      {...props}
      className="w-4 h-4 accent-blue-600"
    />

    {label && (
      <label className="lwd-text">{label}</label>
    )}
  </div>
);

// ================= FORMAT SKILL =================
export const formatSkill = (skill) => {
  if (!skill) return "";
  return skill
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};