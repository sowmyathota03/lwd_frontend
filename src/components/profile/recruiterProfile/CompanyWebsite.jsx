import { useState } from "react";
import { Pencil } from "lucide-react";

function CompanyWebsite({ editable }) {
    const [editing, setEditing] = useState(false);
    const [website, setWebsite] = useState("");

    return (
        <div className="bg-white dark:bg-slate-800 shadow-md rounded-2xl p-6 transition-colors">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100">
                    Company Website
                </h2>

                {editable && (
                    <button
                        onClick={() => setEditing(true)}
                        className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-700/20 rounded transition-colors"
                        aria-label="Edit Website"
                    >
                        <Pencil size={18} />
                    </button>
                )}
            </div>

            {/* Website Display / Edit */}
            {!editing ? (
                <p
                    className={`text-blue-600 dark:text-blue-400 font-medium ${!website ? "italic text-gray-500 dark:text-gray-400" : ""
                        }`}
                >
                    {website || "No website added"}
                </p>
            ) : (
                <div className="space-y-3">
                    <input
                        type="url"
                        placeholder="Website URL"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                    <button
                        onClick={() => setEditing(false)}
                        className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                    >
                        Save
                    </button>
                </div>
            )}
        </div>
    );
}

export default CompanyWebsite;