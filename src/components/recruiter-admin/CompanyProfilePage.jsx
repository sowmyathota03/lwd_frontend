import { useEffect, useState } from "react";
import {
  createCompany,
  updateCompany,
  getMyCompany,
} from "../../api/CompanyApi";
// import "./CompanyProfile.css";

export default function CompanyProfile() {
  const [company, setCompany] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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
  }, []);

  const loadCompany = async () => {
    try {
      setLoading(true);
      const data = await getMyCompany();

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
        setIsEditing(true); // create mode
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
if (loading) {
  return (
    <div className="flex justify-center items-center h-64">
      <p className="text-gray-600 text-lg animate-pulse">
        Loading company profile...
      </p>
    </div>
  );
}

return (
  <div className="max-w-4xl mx-auto p-6">

    {/* Alerts */}
    {error && (
      <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 border border-red-300">
        {error}
      </div>
    )}

    {success && (
      <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 border border-green-300">
        {success}
      </div>
    )}

    {/* ================= VIEW MODE ================= */}
    {!isEditing && company && (
      <div className="bg-white shadow-xl rounded-2xl p-8 space-y-6">

        {/* Header */}
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden text-2xl font-bold text-blue-600">
            {company.logoUrl ? (
              <img
                src={company.logoUrl}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              company.companyName?.charAt(0)
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {company.companyName}
            </h2>
            <span
              className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full ${
                company.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {company.isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="grid md:grid-cols-2 gap-4 text-gray-700">
          <p>
            <strong>Website:</strong> {company.website || "-"}
          </p>
          <p>
            <strong>Location:</strong> {company.location || "-"}
          </p>
          <p>
            <strong>Created:</strong>{" "}
            {company.createdAt
              ? new Date(company.createdAt).toLocaleDateString("en-IN")
              : "-"}
          </p>
          <p>
            <strong>Last Updated:</strong>{" "}
            {company.updatedAt
              ? new Date(company.updatedAt).toLocaleDateString("en-IN")
              : "-"}
          </p>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            About Company
          </h4>
          <p className="text-gray-600">
            {company.description || "No description available."}
          </p>
        </div>

        <button
          onClick={() => setIsEditing(true)}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md"
        >
          Edit Company
        </button>
      </div>
    )}

    {/* ================= EDIT / CREATE MODE ================= */}
    {isEditing && (
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 space-y-5"
      >
        <h2 className="text-2xl font-bold text-gray-800">
          {company ? "Edit Company" : "Create Company"}
        </h2>

        <input
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <textarea
          name="description"
          placeholder="Company description"
          rows={5}
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          name="website"
          placeholder="Website"
          value={formData.website}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          name="logoUrl"
          placeholder="Logo URL"
          value={formData.logoUrl}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <label className="flex items-center gap-2 text-gray-700">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="w-4 h-4"
          />
          Active
        </label>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>

          {company && (
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    )}
  </div>
);
}