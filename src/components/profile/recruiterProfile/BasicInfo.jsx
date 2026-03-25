import { useState } from "react";
import { Pencil } from "lucide-react";

function BasicInfo({ profile, editable }) {
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState(profile || {});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        console.log("Save Basic Info", form);
        setEditing(false);
    };

    return (
        <div className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-6 transition-colors">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    Basic Info
                </h2>
                {editable && (
                    <button
                        onClick={() => setEditing(true)}
                        className="p-1.5 text-gray-400 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Edit basic info"
                    >
                        <Pencil size={18} />
                    </button>
                )}
            </div>

            {/* Display Mode */}
            {!editing ? (
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p>
                        <span className="font-medium">Name:</span> {profile?.name || "N/A"}
                    </p>
                    <p>
                        <span className="font-medium">Email:</span> {profile?.email || "N/A"}
                    </p>
                    <p>
                        <span className="font-medium">Phone:</span> {profile?.phone || "N/A"}
                    </p>
                    <p>
                        <span className="font-medium">Location:</span> {profile?.location || "N/A"}
                    </p>
                </div>
            ) : (
                // Edit Mode
                <div className="space-y-3">
                    <input
                        name="name"
                        value={form.name || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
                        placeholder="Name"
                    />
                    <input
                        name="phone"
                        value={form.phone || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
                        placeholder="Phone"
                    />
                    <input
                        name="location"
                        value={form.location || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
                        placeholder="Location"
                    />

                    <button
                        onClick={handleSave}
                        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        Save
                    </button>
                </div>
            )}
        </div>
    );
}

export default BasicInfo;