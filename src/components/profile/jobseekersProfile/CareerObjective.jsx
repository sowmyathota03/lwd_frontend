import { useState } from "react";
import { Pencil } from "lucide-react";
import CareerObjectiveForm from "./CareerObjectiveForm";
import {Section} from "../comman/Helpers";

/**
 * CareerObjective component – displays and edits the career objective.
 *
 * @param {Object} props
 * @param {string} props.objective - Current career objective text
 * @param {boolean} props.editable - Whether the current user can edit
 * @param {Function} props.onSave - Async function to save new objective
 */
function CareerObjective({ objective, editable, onSave }) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Career Objective</h2>
        {editable && (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 rounded-md hover:bg-blue-100 transition"
            aria-label="Edit career objective"
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

      {/* Objective content */}
      {objective ? (
        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
          {objective}
        </p>
      ) : (
        <p className="text-gray-500 text-sm">
          {editable
            ? "No career objective added. Click the edit button to add one."
            : "No career objective provided."}
        </p>
      )}

      {/* Edit Modal */}
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