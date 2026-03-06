import { useState, useEffect } from "react";
import { createInternship, updateInternship } from "../../api/InternshipApi";

function InternshipForm({ internship, onClose, onSave }) {
  const isEdit = !!internship?.id;

  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    startDate: "",
    endDate: "",
    description: "",
    location: "",
    skills: "",
    stipend: "",
    employmentType: "",
  });

  useEffect(() => {
    if (internship) {
      setFormData({
        companyName: internship.companyName || "",
        role: internship.role || "",
        startDate: internship.startDate || "",
        endDate: internship.endDate || "",
        description: internship.description || "",
        location: internship.location || "",
        skills: internship.skills || "",
        stipend: internship.stipend || "",
        employmentType: internship.employmentType || "",
      });
    }
  }, [internship]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let saved;
      if (isEdit) {
        saved = await updateInternship(internship.id, formData);
      } else {
        saved = await createInternship(formData);
      }
      onSave(saved); // update parent instantly
      onClose();
    } catch (error) {
      console.error("Error saving internship", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-125">
        <h2 className="text-xl font-semibold mb-4">
          {isEdit ? "Edit Internship" : "Add Internship"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input type="text" name="role" placeholder="Role" value={formData.role} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input type="text" name="employmentType" placeholder="Employment Type" value={formData.employmentType} onChange={handleChange} className="w-full border p-2 rounded" />
          <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full border p-2 rounded" />
          <div className="flex gap-2">
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full border p-2 rounded" />
            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded" />
          <input type="text" name="skills" placeholder="Skills (comma separated)" value={formData.skills} onChange={handleChange} className="w-full border p-2 rounded" />
          <input type="number" name="stipend" placeholder="Stipend" value={formData.stipend} onChange={handleChange} className="w-full border p-2 rounded" />
          <div className="flex justify-end gap-2 pt-3">
            <button type="button" onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
            <button type="submit" className="px-4 py-1 bg-blue-500 text-white rounded">{isEdit ? "Update" : "Save"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InternshipForm;
