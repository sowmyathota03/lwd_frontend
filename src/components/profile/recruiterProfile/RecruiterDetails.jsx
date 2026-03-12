import { useState } from "react";
import { Pencil } from "lucide-react";

function RecruiterDetails({ editable }) {

    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
        designation: "",
        department: "",
        workEmail: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-gray-100 shadow-sm rounded-lg p-4">

            <div className="flex justify-between mb-3">
                <h2 className="text-lg font-semibold">Recruiter Details</h2>

                {editable && (
                    <button onClick={() => setEditing(true)}>
                        <Pencil size={18} />
                    </button>
                )}
            </div>

            {!editing ? (
                <div className="space-y-2">
                    <p><b>Designation:</b> {form.designation}</p>
                    <p><b>Department:</b> {form.department}</p>
                    <p><b>Work Email:</b> {form.workEmail}</p>
                </div>
            ) : (
                <div className="space-y-2">

                    <input
                        name="designation"
                        placeholder="Designation"
                        className="border p-2 w-full rounded"
                        onChange={handleChange}
                    />

                    <input
                        name="department"
                        placeholder="Department"
                        className="border p-2 w-full rounded"
                        onChange={handleChange}
                    />

                    <input
                        name="workEmail"
                        placeholder="Work Email"
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

export default RecruiterDetails;