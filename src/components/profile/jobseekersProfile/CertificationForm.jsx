import { useState, useEffect } from "react";
import { createCertification, updateCertification } from "../../../api/CertificationApi";

function CertificationForm({ certification, onClose, onSave }) {
  const isEdit = !!certification?.id;

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

  /* ================= LOAD DATA FOR EDIT ================= */
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

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ================= HANDLE SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let saved;
      if (isEdit) {
        saved = await updateCertification(certification.id, formData);
      } else {
        saved = await createCertification(formData);
      }
      onSave(saved); // update parent instantly
      onClose();
    } catch (error) {
      console.error("Error saving certification", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-125">
        <h2 className="text-xl font-semibold mb-4">
          {isEdit ? "Edit Certification" : "Add Certification"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="certificateName"
            placeholder="Certificate Name"
            value={formData.certificateName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="text"
            name="issuingOrganization"
            placeholder="Issuing Organization"
            value={formData.issuingOrganization}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <div className="flex gap-2">
            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <input
            type="text"
            name="credentialId"
            placeholder="Credential ID"
            value={formData.credentialId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="url"
            name="credentialUrl"
            placeholder="Credential URL"
            value={formData.credentialUrl}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="skillTag"
            placeholder="Skill Tag"
            value={formData.skillTag}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="certificateFile"
            placeholder="Certificate File"
            value={formData.certificateFile}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-3">
            <button type="button" onClick={onClose} className="px-3 py-1 border rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-1 bg-blue-500 text-white rounded">
              {isEdit ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CertificationForm;
