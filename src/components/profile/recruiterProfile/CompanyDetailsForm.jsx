import { useState } from "react";
import {
    createCompanyDetails,
    updateCompanyDetails,
} from "../../../api/CompanyDetailsApi";

function CompanyDetailsForm({ company, onClose, onSave }) {
    const [formData, setFormData] = useState({
        companyName: company?.companyName || "",
        industry: company?.industry || "",
        location: company?.location || "",
        website: company?.website || "",
        companySize: company?.companySize || "",
        description: company?.description || "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let savedCompany;

            if (company) {
                // update
                savedCompany = await updateCompanyDetails(company.id, formData);
            } else {
                // create
                savedCompany = await createCompanyDetails(formData);
            }

            onSave(savedCompany);
        } catch (error) {
            console.error("Error saving company", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

            <div className="bg-white p-6 rounded-lg w-full max-w-lg">

                <h2 className="text-xl font-semibold mb-4">
                    {company ? "Edit Company" : "Add Company"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-3">

                    <input
                        type="text"
                        name="companyName"
                        placeholder="Company Name"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />

                    <input
                        type="text"
                        name="industry"
                        placeholder="Industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />

                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />

                    <input
                        type="text"
                        name="website"
                        placeholder="Company Website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />

                    <input
                        type="text"
                        name="companySize"
                        placeholder="Company Size"
                        value={formData.companySize}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />

                    <textarea
                        name="description"
                        placeholder="Company Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />

                    <div className="flex justify-end gap-2 pt-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
}

export default CompanyDetailsForm;