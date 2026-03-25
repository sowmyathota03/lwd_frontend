import { useState, useEffect } from "react";
import { createCertification, updateCertification } from "../../../api/CertificationApi";

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
        className="lwd-card w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="lwd-section-header sticky top-0 bg-inherit z-10">
          <h2 className="lwd-title">
            {isEdit ? "Edit Certification" : "Add Certification"}
          </h2>
          <p className="lwd-text mt-1">
            {isEdit
              ? "Update the details of your certification."
              : "Add a new certification to your profile."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Certificate Name */}
          <div>
            <label className="lwd-label">
              Certificate Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="certificateName"
              value={formData.certificateName}
              onChange={handleChange}
              required
              placeholder="e.g. AWS Certified"
              className="lwd-input"
              disabled={loading}
            />
          </div>

          {/* Organization */}
          <div>
            <label className="lwd-label">Issuing Organization</label>
            <input
              type="text"
              name="issuingOrganization"
              value={formData.issuingOrganization}
              onChange={handleChange}
              className="lwd-input"
              disabled={loading}
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              className="lwd-input"
              disabled={loading}
            />
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="lwd-input"
              disabled={loading}
            />
          </div>

          {/* Credential ID */}
          <input
            type="text"
            name="credentialId"
            value={formData.credentialId}
            onChange={handleChange}
            placeholder="Credential ID"
            className="lwd-input"
            disabled={loading}
          />

          {/* URL */}
          <input
            type="url"
            name="credentialUrl"
            value={formData.credentialUrl}
            onChange={handleChange}
            placeholder="Credential URL"
            className="lwd-input"
            disabled={loading}
          />

          {/* Skill */}
          <input
            type="text"
            name="skillTag"
            value={formData.skillTag}
            onChange={handleChange}
            placeholder="Skill Tag"
            className="lwd-input"
            disabled={loading}
          />

          {/* File */}
          <input
            type="text"
            name="certificateFile"
            value={formData.certificateFile}
            onChange={handleChange}
            placeholder="File URL"
            className="lwd-input"
            disabled={loading}
          />

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="lwd-btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="lwd-btn-primary flex items-center gap-2"
              disabled={loading}
            >
              {loading ? "Saving..." : isEdit ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div> 
  );
}

export default CertificationForm;