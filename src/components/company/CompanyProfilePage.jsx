import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  EnvelopeIcon,
  PhoneIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

const emptyCompanyForm = {
  companyName: "",
  description: "",
  industry: "",
  website: "",
  logoUrl: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  country: "",
  postalCode: "",
  companySize: "",
  foundedYear: "",
  companyType: "",
};

const getStatusLabel = (status) => {
  switch (status) {
    case "ACTIVE":
      return "Active";
    case "PENDING":
      return "Pending Approval";
    case "REJECTED":
      return "Rejected";
    case "SUSPENDED":
      return "Suspended";
    default:
      return "Unknown";
  }
};

const getStatusStyles = (status) => {
  switch (status) {
    case "ACTIVE":
      return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
    case "PENDING":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
    case "REJECTED":
      return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
    case "SUSPENDED":
      return "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    default:
      return "bg-gray-100 text-gray-500";
  }
};

export default function CompanyProfile({ forceCreateMode = false }) {
  const [company, setCompany] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useContext(AuthContext);
  const { companyId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(emptyCompanyForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (forceCreateMode) {
      setCompany(null);
      setFormData(emptyCompanyForm);
      setIsEditing(true);
      setLoading(false);
      return;
    }

    loadCompany();
  }, [companyId, forceCreateMode]);

  const loadCompany = async () => {
    try {
      setLoading(true);
      setError("");

      const data = companyId
        ? await getCompanyById(companyId)
        : await getMyCompany();

      setCompany(data);
      setFormData({
        companyName: data.companyName || "",
        description: data.description || "",
        industry: data.industry || "",
        website: data.website || "",
        logoUrl: data.logoUrl || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        city: data.city || "",
        state: data.state || "",
        country: data.country || "",
        postalCode: data.postalCode || "",
        companySize: data.companySize || "",
        foundedYear: data.foundedYear || "",
        companyType: data.companyType || "",
      });

      setIsEditing(false);
    } catch (err) {
      if (err?.response?.status === 404) {
        setCompany(null);
        setFormData(emptyCompanyForm);
        setIsEditing(true);
      } else {
        setError("Failed to load company profile");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setSaving(true);

      const payload = {
        companyName: formData.companyName?.trim(),
        description: formData.description?.trim(),
        industry: formData.industry?.trim(),
        website: formData.website?.trim(),
        logoUrl: formData.logoUrl?.trim(),
        email: formData.email?.trim(),
        phone: formData.phone?.trim(),
        address: formData.address?.trim(),
        city: formData.city?.trim(),
        state: formData.state?.trim(),
        country: formData.country?.trim(),
        postalCode: formData.postalCode?.trim(),
        companySize: formData.companySize?.trim(),
        foundedYear: formData.foundedYear?.trim(),
        companyType: formData.companyType?.trim(),
      };

      if (company?.id) {
        await updateCompany(company.id, payload);
        setSuccess("Company updated successfully ✅");
        await loadCompany();
      } else {
        await createCompany(payload);
        setSuccess("Company created successfully 🎉");
        navigate("/company/pending", { replace: true });
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const canEdit = user?.role === "ADMIN" || user?.role === "COMPANY_ADMIN";

  const fullAddress = [
    company?.address,
    company?.city,
    company?.state,
    company?.country,
    company?.postalCode,
  ]
    .filter(Boolean)
    .join(", ");

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
      <div className="lwd-container max-w-6xl space-y-6">
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

        {!forceCreateMode && !isEditing && company && (
          <div className="lwd-card lwd-card-hover">
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
                  <h1 className="lwd-title text-xl">{company.companyName}</h1>

                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    {company.industry && (
                      <span className="px-2 py-1 text-xs rounded-md bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-medium">
                        {company.industry}
                      </span>
                    )}

                    {company.companyType && (
                      <span className="px-2 py-1 text-xs rounded-md bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 font-medium">
                        {company.companyType}
                      </span>
                    )}

                    <span
                      className={`px-2 py-1 text-xs rounded-md font-semibold ${getStatusStyles(
                        company.status
                      )}`}
                    >
                      {getStatusLabel(company.status)}
                    </span>
                  </div>
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

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <GlobeAltIcon className="w-5 h-5 text-gray-500 dark:text-gray-300 mt-1" />
                <div>
                  <p className="lwd-label">Website</p>
                  <p className="lwd-text break-all">{company.website || "-"}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <EnvelopeIcon className="w-5 h-5 text-gray-500 dark:text-gray-300 mt-1" />
                <div>
                  <p className="lwd-label">Email</p>
                  <p className="lwd-text">{company.email || "-"}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <PhoneIcon className="w-5 h-5 text-gray-500 dark:text-gray-300 mt-1" />
                <div>
                  <p className="lwd-label">Phone</p>
                  <p className="lwd-text">{company.phone || "-"}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <BriefcaseIcon className="w-5 h-5 text-gray-500 dark:text-gray-300 mt-1" />
                <div>
                  <p className="lwd-label">Company Size</p>
                  <p className="lwd-text">{company.companySize || "-"}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <BuildingOfficeIcon className="w-5 h-5 text-gray-500 dark:text-gray-300 mt-1" />
                <div>
                  <p className="lwd-label">Founded Year</p>
                  <p className="lwd-text">{company.foundedYear || "-"}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPinIcon className="w-5 h-5 text-gray-500 dark:text-gray-300 mt-1" />
                <div>
                  <p className="lwd-label">Address</p>
                  <p className="lwd-text">{fullAddress || "-"}</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="lwd-title flex items-center gap-2">
                <DocumentTextIcon className="w-4 h-4" />
                About Company
              </h3>
              <p className="lwd-text mt-2">
                {company.description || "No description provided"}
              </p>
            </div>

            {company.status === "ACTIVE" && (
              <div className="mt-6">
                <CompanyAnalytics companyId={company.id} />
              </div>
            )}
          </div>
        )}

        {(isEditing || forceCreateMode) && (
          <div className="lwd-card">
            <h2 className="lwd-title mb-2">
              {company ? "Edit Company" : "Create Company"}
            </h2>
            <p className="lwd-text mb-4">
              {company
                ? "Update your company details."
                : "Complete your company profile to submit it for review."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="lwd-label">Company Name *</label>
                  <input
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="lwd-input"
                    placeholder="Enter company name"
                  />
                </div>

                <div>
                  <label className="lwd-label">Industry</label>
                  <input
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="lwd-input"
                    placeholder="IT Services, FinTech, Healthcare..."
                  />
                </div>
              </div>

              <div>
                <label className="lwd-label">Description</label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="lwd-input"
                  placeholder="Write a short company description"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="lwd-label">Website</label>
                  <input
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="lwd-input"
                    placeholder="https://company.com"
                  />
                </div>

                <div>
                  <label className="lwd-label">Logo URL</label>
                  <input
                    name="logoUrl"
                    value={formData.logoUrl}
                    onChange={handleChange}
                    className="lwd-input"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="lwd-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="lwd-input"
                    placeholder="company@email.com"
                  />
                </div>

                <div>
                  <label className="lwd-label">Phone</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="lwd-input"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>

              <div>
                <label className="lwd-label">Address</label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="lwd-input"
                  placeholder="Street address"
                />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="lwd-label">City</label>
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="lwd-input"
                    placeholder="City"
                  />
                </div>

                <div>
                  <label className="lwd-label">State</label>
                  <input
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="lwd-input"
                    placeholder="State"
                  />
                </div>

                <div>
                  <label className="lwd-label">Country</label>
                  <input
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="lwd-input"
                    placeholder="Country"
                  />
                </div>

                <div>
                  <label className="lwd-label">Postal Code</label>
                  <input
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="lwd-input"
                    placeholder="Postal code"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="lwd-label">Company Size</label>
                  <select
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                    className="lwd-input"
                  >
                    <option value="">Select size</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="501-1000">501-1000</option>
                    <option value="1000+">1000+</option>
                  </select>
                </div>

                <div>
                  <label className="lwd-label">Founded Year</label>
                  <input
                    name="foundedYear"
                    value={formData.foundedYear}
                    onChange={handleChange}
                    className="lwd-input"
                    placeholder="2020"
                    maxLength={4}
                  />
                </div>

                <div>
                  <label className="lwd-label">Company Type</label>
                  <select
                    name="companyType"
                    value={formData.companyType}
                    onChange={handleChange}
                    className="lwd-input"
                  >
                    <option value="">Select type</option>
                    <option value="Product">Product</option>
                    <option value="Service">Service</option>
                    <option value="Startup">Startup</option>
                    <option value="Agency">Agency</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  className="lwd-btn-primary"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : company
                    ? "Update Company"
                    : "Submit Company for Review"}
                </button>

                {company && !forceCreateMode && (
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