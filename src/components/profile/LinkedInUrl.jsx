import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";

function LinkedInUrl({ editable, initialUrl, onSave }) {
    const [url, setUrl] = useState(initialUrl || "");
    const [tempUrl, setTempUrl] = useState("");
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        setUrl(initialUrl || "");
    }, [initialUrl]);

    const handleEdit = () => {
        setTempUrl(url);
        setEditing(true);
    };

    const handleSave = () => {
        setUrl(tempUrl);
        onSave?.(tempUrl);
        setEditing(false);
    };

    const handleCancel = () => {
        setTempUrl(url);
        setEditing(false);
    };

    return (
        <div className="bg-gray-100 shadow-sm rounded-lg p-4 space-y-3">

            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                    LinkedIn
                </h2>

                {editable && !editing && (
                    <button
                        onClick={handleEdit}
                        className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                    >
                        <Pencil size={18} />
                    </button>
                )}
            </div>

            {/* View Mode */}
            {!editing && (
                <p className="text-sm text-gray-700">
                    {url ? (
                        <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            {url}
                        </a>
                    ) : (
                        "No LinkedIn profile added"
                    )}
                </p>
            )}

            {/* Edit Mode */}
            {editing && (
                <>
                    <input
                        type="url"
                        value={tempUrl}
                        onChange={(e) => setTempUrl(e.target.value)}
                        placeholder="https://www.linkedin.com/in/username"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />

                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                        >
                            Save
                        </button>

                        <button
                            onClick={handleCancel}
                            className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </>
            )}

        </div>
    );
}

export default LinkedInUrl;