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
        <div className="lwd-card lwd-card-hover space-y-4">

            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="lwd-title">Social Links</h2>

                {editable && !editing && (
                    <button
                        onClick={() => setEditing(true)}
                        className="p-1.5 rounded-md hover:bg-blue-50 dark:hover:bg-slate-700 transition"
                    >
                        <Pencil className="lwd-icon" />
                    </button>
                )}
            </div>

            {/* View Mode */}
            {!editing ? (
                <div className="space-y-2 text-sm">
                    <p className="lwd-text">
                        <span className="font-medium">LinkedIn:</span>{" "}
                        {links.linkedin || "Not provided"}
                    </p>

                    <p className="lwd-text">
                        <span className="font-medium">Twitter:</span>{" "}
                        {links.twitter || "Not provided"}
                    </p>

                    <p className="lwd-text">
                        <span className="font-medium">Facebook:</span>{" "}
                        {links.facebook || "Not provided"}
                    </p>
                </div>
            ) : (
                /* Edit Mode */
                <div className="space-y-3">

                    <div>
                        <label className="lwd-label">LinkedIn</label>
                        <input
                            name="linkedin"
                            placeholder="LinkedIn URL"
                            value={links.linkedin}
                            onChange={handleChange}
                            className="lwd-input"
                        />
                    </div>

                    <div>
                        <label className="lwd-label">Twitter</label>
                        <input
                            name="twitter"
                            placeholder="Twitter URL"
                            value={links.twitter}
                            onChange={handleChange}
                            className="lwd-input"
                        />
                    </div>

                    <div>
                        <label className="lwd-label">Facebook</label>
                        <input
                            name="facebook"
                            placeholder="Facebook URL"
                            value={links.facebook}
                            onChange={handleChange}
                            className="lwd-input"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            onClick={() => setEditing(false)}
                            className="lwd-btn-secondary"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={() => setEditing(false)}
                            className="lwd-btn-primary"
                        >
                            Save
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
}

export default SocialLinks;