import { useState, useEffect } from "react";
import { createCertification, updateCertification } from "../../../api/CertificationApi";

/**
 * CertificationForm component - Modal for adding/editing a certification
 * 
 * @param {Object} props
 * @param {Object} [props.certification] - Existing certification data (for edit mode)
 * @param {Function} props.onClose - Function to close the modal
 * @param {Function} props.onSave - Callback with saved certification data
 */
function CertificationForm({ certification, onClose, onSave }) {
  const isEdit = Boolean(certification?.id);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    certificateName: "",
    issuingOrganization: "",
    issueDate: "",
    expiryDate: "",
    credentialId: "",
    credentialUrl: "",
    skillTag: "",
    certificateFile: "",
  });

  // Load data for edit mode
  useEffect(() => {
    if (certification) {
      setFormData({
        certificateName: certification.certificateName || "",
        issuingOrganization: certification.issuingOrganization || "",
        issueDate: certification.issueDate || "",
        expiryDate: certification.expiryDate || "",
        credentialId: certification.credentialId || "",
        credentialUrl: certification.credentialUrl || "",
        skillTag: certification.skillTag || "",
        certificateFile: certification.certificateFile || "",
      });
    }
  }, [certification]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let saved;
      if (isEdit) {
        saved = await updateCertification(certification.id, formData);
      } else {
        saved = await createCertification(formData);
      }
      onSave(saved);
      onClose();
    } catch (error) {
      console.error("Error saving certification", error);
      // Optionally show user-friendly error message
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
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEdit ? "Edit Certification" : "Add Certification"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {isEdit ? "Update the details of your certification." : "Add a new certification to your profile."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Certificate Name (required) */}
          <div>
            <label htmlFor="certificateName" className="block text-sm font-medium text-gray-700 mb-1">
              Certificate Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="certificateName"
              name="certificateName"
              value={formData.certificateName}
              onChange={handleChange}
              required
              placeholder="e.g. AWS Certified Solutions Architect"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
              disabled={loading}
            />
          </div>

          {/* Issuing Organization */}
          <div>
            <label htmlFor="issuingOrganization" className="block text-sm font-medium text-gray-700 mb-1">
              Issuing Organization
            </label>
            <input
              type="text"
              id="issuingOrganization"
              name="issuingOrganization"
              value={formData.issuingOrganization}
              onChange={handleChange}
              placeholder="e.g. Amazon Web Services"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
              disabled={loading}
            />
          </div>

          {/* Issue Date & Expiry Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700 mb-1">
                Issue Date
              </label>
              <input
                type="date"
                id="issueDate"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
                disabled={loading}
              />
            </div>
          </div>

          {/* Credential ID */}
          <div>
            <label htmlFor="credentialId" className="block text-sm font-medium text-gray-700 mb-1">
              Credential ID
            </label>
            <input
              type="text"
              id="credentialId"
              name="credentialId"
              value={formData.credentialId}
              onChange={handleChange}
              placeholder="e.g. ABC123XYZ"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
              disabled={loading}
            />
          </div>

          {/* Credential URL */}
          <div>
            <label htmlFor="credentialUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Credential URL
            </label>
            <input
              type="url"
              id="credentialUrl"
              name="credentialUrl"
              value={formData.credentialUrl}
              onChange={handleChange}
              placeholder="https://example.com/certificate"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
              disabled={loading}
            />
          </div>

          {/* Skill Tag */}
          <div>
            <label htmlFor="skillTag" className="block text-sm font-medium text-gray-700 mb-1">
              Skill Tag
            </label>
            <input
              type="text"
              id="skillTag"
              name="skillTag"
              value={formData.skillTag}
              onChange={handleChange}
              placeholder="e.g. Cloud Computing, AWS"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
              disabled={loading}
            />
          </div>

          {/* Certificate File (text field, could be replaced with file upload later) */}
          <div>
            <label htmlFor="certificateFile" className="block text-sm font-medium text-gray-700 mb-1">
              Certificate File (URL or path)
            </label>
            <input
              type="text"
              id="certificateFile"
              name="certificateFile"
              value={formData.certificateFile}
              onChange={handleChange}
              placeholder="URL or file path"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
              disabled={loading}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t sticky bottom-0 bg-white py-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-20 justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isEdit ? "Updating..." : "Saving..."}
                </>
              ) : (
                isEdit ? "Update" : "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CertificationForm;