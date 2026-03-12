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
        <div className="bg-gray-100 shadow-sm rounded-lg p-4">

            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">Basic Info</h2>

                {editable && (
                    <button onClick={() => setEditing(true)}>
                        <Pencil size={18} />
                    </button>
                )}
            </div>

            {!editing ? (
                <div className="space-y-2">
                    <p><b>Name:</b> {profile?.name}</p>
                    <p><b>Email:</b> {profile?.email}</p>
                    <p><b>Phone:</b> {profile?.phone}</p>
                    <p><b>Location:</b> {profile?.location}</p>
                </div>
            ) : (
                <div className="space-y-2">
                    <input
                        name="name"
                        value={form.name || ""}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                        placeholder="Name"
                    />

                    <input
                        name="phone"
                        value={form.phone || ""}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                        placeholder="Phone"
                    />

                    <input
                        name="location"
                        value={form.location || ""}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                        placeholder="Location"
                    />

                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                        Save
                    </button>
                </div>
            )}
        </div>
    );
}

export default BasicInfo;