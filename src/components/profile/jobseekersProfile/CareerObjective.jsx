import { useState } from "react";
import CareerObjectiveForm from "./CareerObjectiveForm";

function CareerObjective({ objective, editable, onSave }) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="lwd-card space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="lwd-title">Career Objective</h2>

        {editable && (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 text-sm lwd-link border border-blue-200 dark:border-gray-600 px-3 py-1.5 rounded-md hover:bg-blue-100 dark:hover:bg-slate-700 transition"
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

      {/* Content */}
      {objective ? (
        <p className="lwd-text leading-relaxed whitespace-pre-line">
          {objective}
        </p>
      ) : (
        <p className="lwd-text">
          {editable
            ? "No career objective added. Click the edit button to add one."
            : "No career objective provided."}
        </p>
      )}

      {/* Modal */}
      {editing && (
        <CareerObjectiveForm
          objective={objective}
          onClose={() => setEditing(false)}
          onSave={async (newObjective) => {
            await onSave(newObjective);
            setEditing(false);
          }}
        />
      )}
    </div>
  );
}

export default CareerObjective;