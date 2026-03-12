import { useState } from "react";
import { Pencil } from "lucide-react";
import CareerObjectiveForm from "./CareerObjectiveForm";

function CareerObjective({ objective, editable, refetch }) {
    const [editing, setEditing] = useState(false);

    return (
        <div className="bg-gray-100 shadow-sm rounded-lg p-4 space-y-3">

            {/* Header */}
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                    Career Objective
                </h2>

                {editable && (
                    <button
                        onClick={() => setEditing(true)}
                        className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                    >
                        <Pencil size={18} />
                    </button>
                )}
            </div>

            {/* Objective Text */}
            {!objective && (
                <p className="text-gray-500 text-sm">
                    No career objective added.
                </p>
            )}

            {objective && (
                <p className="text-gray-700 text-sm whitespace-pre-line">
                    {objective}
                </p>
            )}

            {/* Edit Modal */}
            {editing && (
                <CareerObjectiveForm
                    objective={objective}
                    onClose={() => setEditing(false)}
                    refetch={refetch}
                />
            )}
        </div>
    );
}

export default CareerObjective;