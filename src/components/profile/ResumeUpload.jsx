import { useState, useEffect, useRef } from "react";
import { Pencil } from "lucide-react";

function ResumeUpload({ editable, initialFile, onSave }) {
    const [file, setFile] = useState(initialFile || null);
    const [tempFile, setTempFile] = useState(null);
    const [editing, setEditing] = useState(false);

    const uploadRef = useRef(null);
    const editRef = useRef(null);

    useEffect(() => {
        setFile(initialFile || null);
    }, [initialFile]);

    const handleFileSelect = (e) => {
        const selected = e.target.files[0];
        if (!selected) return;

        setTempFile(selected);
        setEditing(true);
    };

    const handleSave = () => {
        setFile(tempFile);
        onSave?.(tempFile);
        setTempFile(null);
        setEditing(false);
    };

    const handleCancel = () => {
        setTempFile(null);
        setEditing(false);
    };

    return (
        <div className="bg-gray-100 shadow-sm rounded-lg p-4 space-y-3">

            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                    Resume
                </h2>

                {editable && file && (
                    <>
                        <button
                            onClick={() => editRef.current.click()}
                            className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                        >
                            <Pencil size={18} />
                        </button>

                        <input
                            type="file"
                            ref={editRef}
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                    </>
                )}
            </div>

            {/* Current Resume */}
            {file && (
                <p className="text-gray-700 text-sm font-medium">{file.name}</p>
            )}

            {/* Selected file before saving */}
            {tempFile && (
                <p className="text-blue-600 text-sm">{tempFile.name}</p>
            )}

            {/* Upload button (only if no resume yet) */}
            {editable && !file && !editing && (
                <>
                    <button
                        onClick={() => uploadRef.current.click()}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                    >
                        Upload Resume
                    </button>

                    <input
                        type="file"
                        ref={uploadRef}
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                </>
            )}

            {/* Save Cancel buttons */}
            {editing && (
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
            )}

            {/* Format info */}
            <p className="text-gray-500 text-xs">
                Allowed formats: .pdf, .doc, .docx
            </p>

            {!file && !tempFile && (
                <p className="text-gray-500 text-sm">No resume uploaded yet.</p>
            )}

        </div>
    );
}

export default ResumeUpload;