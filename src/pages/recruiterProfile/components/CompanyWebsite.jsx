import { useState } from "react";
import { Pencil } from "lucide-react";

function CompanyWebsite({ editable }) {

    const [editing, setEditing] = useState(false);
    const [website, setWebsite] = useState("");

    return (
        <div className="bg-gray-100 shadow-sm rounded-lg p-4">

            <div className="flex justify-between mb-3">
                <h2 className="text-lg font-semibold">Company Website</h2>

                {editable && (
                    <button onClick={() => setEditing(true)}>
                        <Pencil size={18} />
                    </button>
                )}
            </div>

            {!editing ? (
                <p className="text-blue-600">{website || "No website added"}</p>
            ) : (
                <div className="space-y-2">

                    <input
                        placeholder="Website URL"
                        className="border p-2 w-full rounded"
                        onChange={(e) => setWebsite(e.target.value)}
                    />

                    <button
                        onClick={() => setEditing(false)}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                        Save
                    </button>

                </div>
            )}
        </div>
    );
}

export default CompanyWebsite;