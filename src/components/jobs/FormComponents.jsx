// src/components/FormComponents.jsx
import { motion } from "framer-motion";

export function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  icon: Icon,
  required = false,
}) {
  return (
    <div className="space-y-3 group/input">
      {label && (
        <div className="flex items-center gap-2">
          {Icon && <Icon size={14} className="text-slate-400 group-focus-within/input:text-blue-500 transition-colors" />}
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 group-focus-within/input:text-blue-600 transition-colors">
            {label} {required && <span className="text-rose-500">*</span>}
          </label>
        </div>
      )}

      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`
            lwd-input h-14 bg-white dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 focus:ring-blue-500/20 px-6 font-bold tracking-tight transition-all
            ${Icon ? "pl-12" : ""}
          `}
        />
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Icon size={18} className="text-slate-300 dark:text-slate-600 group-focus-within/input:text-blue-500 transition-colors" />
          </div>
        )}
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
  icon: Icon,
  required = false,
}) {
  return (
    <div className="space-y-3 group/select">
      {label && (
        <div className="flex items-center gap-2">
          {Icon && <Icon size={14} className="text-slate-400 group-focus-within/select:text-blue-500 transition-colors" />}
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 group-focus-within/select:text-blue-600 transition-colors">
            {label} {required && <span className="text-rose-500">*</span>}
          </label>
        </div>
      )}

      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`
            lwd-input h-14 appearance-none bg-white dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 focus:ring-blue-500/20 px-6 font-bold tracking-tight transition-all
            ${Icon ? "pl-12" : ""}
          `}
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt.replace(/_/g, " ")}
            </option>
          ))}
        </select>
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Icon size={18} className="text-slate-300 dark:text-slate-600 group-focus-within/select:text-blue-500 transition-colors" />
          </div>
        )}
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
           </svg>
        </div>
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
  icon: Icon,
}) {
  return (
    <div className="space-y-3 group/textarea">
      {label && (
        <div className="flex items-center gap-2">
          {Icon && <Icon size={14} className="text-slate-400 group-focus-within/textarea:text-blue-500 transition-colors" />}
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 group-focus-within/textarea:text-blue-600 transition-colors">{label}</label>
        </div>
      )}

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className="lwd-input bg-white dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 focus:ring-blue-500/20 px-6 py-4 font-bold tracking-tight min-h-[120px] transition-all"
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
    <div className="flex items-center gap-3 pt-4 group/checkbox cursor-pointer">
      <div className="relative flex items-center">
        <input
          type="checkbox"
          name={name}
          id={name}
          checked={checked}
          onChange={onChange}
          className="peer h-6 w-6 appearance-none rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer"
        />
        <svg className="absolute w-4 h-4 text-white left-1 pointer-events-none hidden peer-checked:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <label htmlFor={name} className="text-sm font-semibold text-slate-600 dark:text-slate-300 group-hover/checkbox:text-slate-800 dark:group-hover/checkbox:text-white transition-colors cursor-pointer">
        {label}
      </label>
    </div>
  );
}