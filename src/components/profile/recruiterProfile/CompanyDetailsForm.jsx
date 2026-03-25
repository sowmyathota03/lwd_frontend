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
                savedCompany = await updateCompanyDetails(company.id, formData);
            } else {
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
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg p-6 overflow-y-auto transition-colors"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                    {company ? "Edit Company" : "Add Company"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        name="companyName"
                        placeholder="Company Name"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                    />

                    <input
                        type="text"
                        name="industry"
                        placeholder="Industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />

                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />

                    <input
                        type="text"
                        name="website"
                        placeholder="Company Website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />

                    <input
                        type="text"
                        name="companySize"
                        placeholder="Company Size"
                        value={formData.companySize}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />

                    <textarea
                        name="description"
                        placeholder="Company Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-y"
                        rows={4}
                    />

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-500 rounded-lg bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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