// src/components/FormComponents.jsx

export function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  icon,
  required = false,
}) {
  return (
    <div className="space-y-1">
      <label className="lwd-label">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {/* icon color fix */}
            <span className="lwd-icon">{icon}</span>
          </div>
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`lwd-input ${icon ? "pl-10" : ""}`}
        />
      </div>
    </div>
  );
}

export function Select({
  label,
  name,
  value,
  onChange,
  options,
  icon,
  required = false,
}) {
  return (
    <div className="space-y-1">
      <label className="lwd-label">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="lwd-icon">{icon}</span>
          </div>
        )}

        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`lwd-input appearance-none ${icon ? "pl-10" : ""}`}
        >
          <option value="">Select</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function Textarea({
  label,
  name,
  value,
  onChange,
  rows = 3,
}) {
  return (
    <div className="space-y-1">
      <label className="lwd-label">{label}</label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className="lwd-input"
      />
    </div>
  );
}

export function Checkbox({
  label,
  name,
  checked,
  onChange,
}) {
  return (
    <div className="flex items-center space-x-2 pt-6">
      <input
        type="checkbox"
        name={name}
        id={name}
        checked={checked}
        onChange={onChange}
        className="lwd-checkbox"
      />

      <label htmlFor={name} className="lwd-text">
        {label}
      </label>
    </div>
  );
}