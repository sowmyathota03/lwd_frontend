import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  createCompany,
  updateCompany,
  getMyCompany,
  getCompanyById,
} from "../../api/CompanyApi";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../common/Loader";
import CompanyAnalytics from "../company/CompanyAnalytics";

// Heroicons v2 outline – make sure @heroicons/react is installed
import {
  BuildingOfficeIcon,
  GlobeAltIcon,
  MapPinIcon,
  PencilSquareIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentTextIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolid } from "@heroicons/react/24/solid";

export default function CompanyProfile() {
  const [company, setCompany] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useContext(AuthContext);

  const { companyId } = useParams();

  const [formData, setFormData] = useState({
    companyName: "",
    description: "",
    website: "",
    location: "",
    logoUrl: "",
    isActive: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadCompany();
  }, [companyId]);

  const loadCompany = async () => {
    try {
      setLoading(true);
      let data;
      if (companyId) {
        // 🔹 Admin viewing specific company
        data = await getCompanyById(companyId);
      } else {
        // 🔹 Recruiter viewing own company
        data = await getMyCompany();
        console.log("My Company:", data);
      }

      setCompany(data);
      setFormData({
        companyName: data.companyName || "",
        description: data.description || "",
        website: data.website || "",
        location: data.location || "",
        logoUrl: data.logoUrl || "",
        isActive: data.isActive ?? true,
      });

      setIsEditing(false);
    } catch (err) {
      if (err?.response?.status === 404) {
        setIsEditing(true);
      } else {
        setError("Failed to load company profile");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setSaving(true);

      if (company?.id) {
        await updateCompany(company.id, formData);
        setSuccess("Company profile updated successfully ✅");
      } else {
        await createCompany(formData);
        setSuccess("Company profile created successfully 🎉");
      }

      await loadCompany();
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const canEdit = user?.role === "ADMIN" || user?.role === "RECRUITER_ADMIN";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader />
          <p className="mt-4 text-sm text-gray-500">Loading company profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button (optional - you can add navigation) */}
        {/* <button
          onClick={() => window.history.back()}
          className="mb-4 inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back
        </button> */}

        {/* Error / Success Messages */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 border border-red-200">
            <div className="flex items-center">
              <XCircleIcon className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-lg bg-green-50 p-4 border border-green-200">
            <div className="flex items-center">
              <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2" />
              <p className="text-sm text-green-700">{success}</p>
            </div>
          </div>
        )}

        {/* View Mode */}
        {!isEditing && company && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header with logo and basic info */}
            <div className="bg-linear-to-r from-blue-50 to-indigo-50 px-6 py-6 md:px-8 md:py-8 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Logo */}
                  <div className="w-20 h-20 rounded-xl bg-white shadow-md flex items-center justify-center overflow-hidden text-3xl font-bold text-blue-600 border border-gray-200">
                    {company.logoUrl ? (
                      <img
                        src={company.logoUrl}
                        alt={company.companyName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <BuildingOfficeIcon className="h-10 w-10 text-blue-500" />
                    )}
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                      {company.companyName}
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                          company.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {company.isActive ? (
                          <CheckCircleSolid className="h-3 w-3" />
                        ) : (
                          <XCircleIcon className="h-3 w-3" />
                        )}
                        {company.isActive ? "Active" : "Inactive"}
                      </span>
                      {company.industry && (
                        <span className="text-xs text-gray-500">
                          {company.industry}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Edit button */}
                {canEdit && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition shadow-sm"
                  >
                    <PencilSquareIcon className="h-4 w-4" />
                    Edit Company
                  </button>
                )}
              </div>
            </div>

            {/* Company Details */}
            <div className="p-6 md:p-8 space-y-6">
              {/* Key details grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <GlobeAltIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Website
                    </p>
                    {company.website ? (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        {company.website}
                      </a>
                    ) : (
                      <p className="text-sm text-gray-500">-</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </p>
                    <p className="text-sm text-gray-800">
                      {company.location || "-"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <DocumentTextIcon className="h-4 w-4 text-gray-400" />
                  About Company
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {company.description || "No description provided."}
                </p>
              </div>

              {/* Analytics Section */}
              <div className="pt-4 border-t border-gray-100">
                <CompanyAnalytics companyId={company.id} />
              </div>
            </div>
          </div>
        )}

        {/* Edit / Create Mode */}
        {isEditing && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              {company ? (
                <>
                  <PencilSquareIcon className="h-5 w-5 text-blue-500" />
                  Edit Company
                </>
              ) : (
                <>
                  <BuildingOfficeIcon className="h-5 w-5 text-blue-500" />
                  Create New Company
                </>
              )}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="e.g., Acme Inc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Tell us about your company..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Logo URL
                </label>
                <input
                  type="url"
                  name="logoUrl"
                  value={formData.logoUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="https://example.com/logo.png"
                />
              </div>

              {/* Checkbox for isActive (optional, might be hidden for non-admins) */}
              {(user?.role === "ADMIN" || user?.role === "RECRUITER_ADMIN") && (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isActive"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="isActive" className="text-sm text-gray-700">
                    Company is active
                  </label>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? "Saving..." : company ? "Save Changes" : "Create Company"}
                </button>
                {company && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}