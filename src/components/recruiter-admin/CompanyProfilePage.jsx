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

import {
  BuildingOfficeIcon,
  GlobeAltIcon,
  MapPinIcon,
  PencilSquareIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

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

      data = companyId
        ? await getCompanyById(companyId)
        : await getMyCompany();

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
        setSuccess("Company updated successfully ✅");
      } else {
        await createCompany(formData);
        setSuccess("Company created successfully 🎉");
      }

      await loadCompany();
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const canEdit =
    user?.role === "ADMIN" || user?.role === "RECRUITER_ADMIN";

  if (loading) {
    return (
      <div className="lwd-page flex items-center justify-center">
        <div className="text-center">
          <Loader />
          <p className="lwd-text mt-4">Loading company profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lwd-page py-6">
      <div className="lwd-container max-w-5xl space-y-6">

        {/* Alerts */}
        {error && (
          <div className="lwd-card border border-red-300 dark:border-red-700">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {success && (
          <div className="lwd-card border border-green-300 dark:border-green-700">
            <p className="text-green-600 dark:text-green-400">{success}</p>
          </div>
        )}

        {/* VIEW MODE */}
        {!isEditing && company && (
          <div className="lwd-card lwd-card-hover">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">

                <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                  {company.logoUrl ? (
                    <img
                      src={company.logoUrl}
                      alt="logo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <BuildingOfficeIcon className="w-8 h-8 text-blue-500" />
                  )}
                </div>

                <div>
                  <h1 className="lwd-title text-xl">
                    {company.companyName}
                  </h1>

                  <span
                    className={`inline-block mt-1 px-2 py-1 text-xs rounded-md font-semibold
                    ${company.isActive
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                      }`}
                  >
                    {company.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              {canEdit && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="lwd-btn-primary flex items-center gap-2"
                >
                  <PencilSquareIcon className="w-4 h-4" />
                  Edit
                </button>
              )}
            </div>

            {/* Details */}
            <div className="grid md:grid-cols-2 gap-6">

              <div className="flex gap-3">
                <GlobeAltIcon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                <div>
                  <p className="lwd-label">Website</p>
                  <p className="lwd-text">{company.website || "-"}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPinIcon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                <div>
                  <p className="lwd-label">Location</p>
                  <p className="lwd-text">{company.location || "-"}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="lwd-title flex items-center gap-2">
                <DocumentTextIcon className="w-4 h-4" />
                About Company
              </h3>
              <p className="lwd-text mt-2">
                {company.description || "No description provided"}
              </p>
            </div>

            {/* Analytics */}
            <div className="mt-6">
              <CompanyAnalytics companyId={company.id} />
            </div>
          </div>
        )}

        {/* EDIT MODE */}
        {isEditing && (
          <div className="lwd-card">
            <h2 className="lwd-title mb-4">
              {company ? "Edit Company" : "Create Company"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="lwd-label">Company Name</label>
                <input
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="lwd-input"
                />
              </div>

              <div>
                <label className="lwd-label">Description</label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="lwd-input"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="website"
                  placeholder="Website"
                  value={formData.website}
                  onChange={handleChange}
                  className="lwd-input"
                />

                <input
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  className="lwd-input"
                />
              </div>

              <input
                name="logoUrl"
                placeholder="Logo URL"
                value={formData.logoUrl}
                onChange={handleChange}
                className="lwd-input"
              />

              {canEdit && (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="accent-blue-600"
                  />
                  <label className="lwd-text">Company Active</label>
                </div>
              )}

              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  className="lwd-btn-primary"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save"}
                </button>

                {company && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="lwd-btn-secondary"
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