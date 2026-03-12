import { useState } from "react";
import { Pencil } from "lucide-react";

function SocialLinks({ editable }) {

    const [editing, setEditing] = useState(false);

    const [links, setLinks] = useState({
        linkedin: "",
        twitter: "",
        facebook: "",
    });

    const handleChange = (e) => {
        setLinks({ ...links, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-gray-100 shadow-sm rounded-lg p-4">

            <div className="flex justify-between mb-3">
                <h2 className="text-lg font-semibold">Social Links</h2>

                {editable && (
                    <button onClick={() => setEditing(true)}>
                        <Pencil size={18} />
                    </button>
                )}
            </div>

            {!editing ? (
                <div className="space-y-2">

                    <p>LinkedIn: {links.linkedin}</p>
                    <p>Twitter: {links.twitter}</p>
                    <p>Facebook: {links.facebook}</p>

                </div>
            ) : (
                <div className="space-y-2">

                    <input
                        name="linkedin"
                        placeholder="LinkedIn URL"
                        className="border p-2 w-full rounded"
                        onChange={handleChange}
                    />

                    <input
                        name="twitter"
                        placeholder="Twitter URL"
                        className="border p-2 w-full rounded"
                        onChange={handleChange}
                    />

                    <input
                        name="facebook"
                        placeholder="Facebook URL"
                        className="border p-2 w-full rounded"
                        onChange={handleChange}
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

export default SocialLinks;