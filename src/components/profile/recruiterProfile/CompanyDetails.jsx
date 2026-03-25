import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";

import {
    getMyCompanyDetails,
    getCompanyDetailsByUserId,
} from "../../../api/CompanyDetailsApi";

import CompanyDetailsForm from "./CompanyDetailsForm";

function CompanyDetails({ userId, editable }) {
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);

    // Load company details
    useEffect(() => {
        fetchCompany();
    }, [userId]);

    const fetchCompany = async () => {
        setLoading(true);
        try {
            const data = userId
                ? await getCompanyDetailsByUserId(userId)
                : await getMyCompanyDetails();
            setCompany(data);
        } catch (err) {
            console.error("Error fetching company details", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = (savedCompany) => {
        setCompany(savedCompany);
        setEditing(false);
    };

    if (loading) {
        return (
            <p className="p-4 text-gray-500 dark:text-gray-400">
                Loading company details...
            </p>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-6 space-y-4 transition-colors">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100">
                    Company Details
                </h2>

                {editable && !company && (
                    <button
                        onClick={() => setEditing(true)}
                        className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                    >
                        + Add
                    </button>
                )}
            </div>

            {/* No company */}
            {!company && (
                <p className="text-gray-500 dark:text-gray-400">
                    No company details added.
                </p>
            )}

            {/* Company Card */}
            {company && (
                <div className="flex flex-col md:flex-row justify-between items-start p-6 bg-gray-50 dark:bg-slate-700 rounded-xl hover:shadow-lg transition-shadow">
                    <div className="flex-1 space-y-2">
                        {/* Title & Edit */}
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-lg">
                                {company.companyName}
                            </h3>
                            {editable && (
                                <button
                                    onClick={() => setEditing(true)}
                                    className="p-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded transition-colors"
                                    aria-label="Edit Company Details"
                                >
                                    <Pencil size={18} />
                                </button>
                            )}
                        </div>

                        {company.industry && (
                            <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                                {company.industry}
                            </p>
                        )}

                        {company.location && (
                            <p className="text-gray-600 dark:text-gray-300">{company.location}</p>
                        )}

                        {company.website && (
                            <a
                                href={company.website}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                {company.website}
                            </a>
                        )}

                        {company.companySize && (
                            <p className="text-gray-600 dark:text-gray-300">
                                Size: {company.companySize}
                            </p>
                        )}

                        {company.description && (
                            <p className="text-gray-600 dark:text-gray-300">{company.description}</p>
                        )}
                    </div>
                </div>
            )}

            {/* Form Modal */}
            {editing && (
                <CompanyDetailsForm
                    company={company}
                    onClose={() => setEditing(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}

export default CompanyDetails;