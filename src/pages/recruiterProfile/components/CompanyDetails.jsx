import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";

import {
    getMyCompanyDetails,
    getCompanyDetailsByUserId,
} from "../../../api/CompanyApi";

import CompanyDetailsForm from "./CompanyDetailsForm";

function CompanyDetails({ userId, editable }) {
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);

    // ================= LOAD COMPANY =================
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

    if (loading)
        return <p className="p-3 text-gray-500">Loading company details...</p>;

    return (
        <div className="bg-gray-100 shadow-sm rounded-lg p-4 space-y-3">

            {/* Header */}
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                    Company Details
                </h2>

                {editable && !company && (
                    <button
                        onClick={() => setEditing(true)}
                        className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        + Add
                    </button>
                )}
            </div>

            {/* No Data */}
            {!company && (
                <p className="text-gray-500">No company details added.</p>
            )}

            {/* Company Card */}
            {company && (
                <div className="flex justify-between items-start p-4 bg-white rounded-md hover:shadow transition">

                    <div className="flex-1 space-y-1">

                        {/* Title + Edit */}
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-gray-800 text-base">
                                {company.companyName}
                            </h3>

                            {editable && (
                                <button
                                    onClick={() => setEditing(true)}
                                    className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                                >
                                    <Pencil size={18} />
                                </button>
                            )}
                        </div>

                        {company.industry && (
                            <p className="text-indigo-600">{company.industry}</p>
                        )}

                        {company.location && (
                            <p className="text-gray-600">{company.location}</p>
                        )}

                        {company.website && (
                            <p className="text-blue-600">{company.website}</p>
                        )}

                        {company.companySize && (
                            <p className="text-gray-600">Size: {company.companySize}</p>
                        )}

                        {company.description && (
                            <p className="text-gray-600">{company.description}</p>
                        )}

                    </div>
                </div>
            )}

            {/* Modal Form */}
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