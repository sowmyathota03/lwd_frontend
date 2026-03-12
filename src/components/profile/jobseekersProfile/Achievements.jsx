import { useState } from "react";
import { Pencil } from "lucide-react";

function Achievements({ achievements = [], editable }) {
    const [achievementList, setAchievementList] = useState(achievements);
    const [editingIndex, setEditingIndex] = useState(null);
    const [value, setValue] = useState("");

    const handleAdd = () => {
        setEditingIndex("new");
        setValue("");
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setValue(achievementList[index]);
    };

    const handleSave = () => {
        if (editingIndex === "new") {
            setAchievementList([value, ...achievementList]);
        } else {
            const updated = [...achievementList];
            updated[editingIndex] = value;
            setAchievementList(updated);
        }

        setEditingIndex(null);
        setValue("");
    };

    const handleCancel = () => {
        setEditingIndex(null);
        setValue("");
    };

    return (
        <div className="bg-gray-100 shadow-sm rounded-lg p-4 space-y-3">

            {/* Header */}
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                    Achievements
                </h2>

                {editable && (
                    <button
                        onClick={handleAdd}
                        className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        + Add
                    </button>
                )}
            </div>

            {/* Empty */}
            {achievementList.length === 0 && (
                <p className="text-gray-500">No achievements added.</p>
            )}

            {/* List */}
            <div className="space-y-3">
                {achievementList.map((ach, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-start p-4 bg-white rounded-md hover:shadow transition"
                    >
                        <p className="text-gray-700 flex-1">{ach}</p>

                        {editable && (
                            <button
                                onClick={() => handleEdit(index)}
                                className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                            >
                                <Pencil size={18} />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Form */}
            {editingIndex !== null && (
                <div className="bg-white p-4 rounded-md shadow space-y-3">
                    <textarea
                        rows="3"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="w-full border rounded p-2"
                        placeholder="Enter achievement..."
                    />

                    <div className="flex gap-3">
                        <button
                            onClick={handleSave}
                            className="px-4 py-1 bg-green-600 text-white rounded"
                        >
                            Save
                        </button>

                        <button
                            onClick={handleCancel}
                            className="px-4 py-1 bg-gray-400 text-white rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Achievements;