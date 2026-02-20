import { useEffect, useState } from "react";
import {
  createCompany,
  updateCompany,
  getMyCompany,
} from "../../api/CompanyApi";

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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-600 animate-pulse">
          Loading company profile...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 md:py-6">

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700">
          {success}
        </div>
      )}

      {!isEditing && company && (
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 space-y-6">

          <div className="flex flex-col md:flex-row md:items-center gap-6">
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
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                {company.companyName}
              </h2>
              <span className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${
                company.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}>
                {company.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <p><strong>Website:</strong> {company.website || "-"}</p>
            <p><strong>Location:</strong> {company.location || "-"}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">About Company</h4>
            <p className="text-gray-600">
              {company.description || "No description available."}
            </p>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Edit Company
          </button>
        </div>
      )}

      {isEditing && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-6 md:p-8 space-y-4"
        >
          <h2 className="text-xl md:text-2xl font-bold">
            {company ? "Edit Company" : "Create Company"}
          </h2>

          <input
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
          />

          <textarea
            name="description"
            rows={4}
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            name="website"
            placeholder="Website"
            value={formData.website}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />

          <div className="flex gap-4 flex-wrap">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              {saving ? "Saving..." : "Save"}
            </button>

            {company && (
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-200 px-6 py-2 rounded-lg"
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