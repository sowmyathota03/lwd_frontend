import { useState } from "react";

function CareerObjectiveForm({ objective, onClose, refetch }) {
    const [text, setText] = useState(objective || "");

    const handleSave = () => {
        // API call here
        console.log("Saving objective:", text);

        refetch?.();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-5 space-y-4">

                <h2 className="text-lg font-semibold text-gray-800">
                    Edit Career Objective
                </h2>

                <textarea
                    rows="5"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write your career objective..."
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                    >
                        Save
                    </button>
                </div>

            </div>

        </div>
    );
}

export default CareerObjectiveForm;