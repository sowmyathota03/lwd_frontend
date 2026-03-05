import { useState, useEffect } from "react";
import {
  getMyInternships,
  getInternshipsByUserId,
  createInternship,
  updateInternship
} from "../../api/InternshipApi";

import { Section, Grid, Input, Buttons } from "./Helpers";

const Internship = ({ userId, editable }) => {

  const [internshipList, setInternshipList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(false);
  const [forms, setForms] = useState([]);

  const initialForm = {
    role: "",
    companyName: "",
    startDate: "",
    endDate: "",
    description: ""
  };

  /* LOAD DATA */

  useEffect(() => {
    const loadInternships = async () => {
      try {

        const res = !userId
          ? await getMyInternships()
          : await getInternshipsByUserId(userId);

        setInternshipList(res || []);

      } catch (err) {
        console.error("Internship load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadInternships();
  }, [userId]);

  /* EDIT ALL */

  const handleEditAll = () => {

    const allForms = internshipList.map((intern) => ({
      id: intern.id,
      data: { ...intern }
    }));

    setForms(allForms);
    setEditing(true);
  };

  /* ADD FORM */

  const handleAddForm = () => {

    setForms([
      ...forms,
      { id: Date.now(), data: initialForm }
    ]);

    setEditing(true);
  };

  /* INPUT CHANGE */

  const handleChange = (id, e) => {

    setForms(
      forms.map((f) =>
        f.id === id
          ? { ...f, data: { ...f.data, [e.target.name]: e.target.value } }
          : f
      )
    );
  };

  /* SAVE */

  const handleSave = async (id) => {

    const form = forms.find((f) => f.id === id);
    if (!form) return;

    try {

      const exists = internshipList.find((intern) => intern.id === id);

      if (exists) {

        await updateInternship(id, form.data);

        setInternshipList(
          internshipList.map((intern) =>
            intern.id === id ? { ...intern, ...form.data } : intern
          )
        );

      } else {

        const res = await createInternship(form.data);

        setInternshipList([
          ...internshipList,
          res
        ]);
      }

      const remainingForms = forms.filter((f) => f.id !== id);
      setForms(remainingForms);

      if (remainingForms.length === 0) {
        setEditing(false);
      }

    } catch (err) {
      console.error("Save internship error:", err);
    }
  };

  /* CANCEL */

  const handleCancel = (id) => {

    const remainingForms = forms.filter((f) => f.id !== id);
    setForms(remainingForms);

    if (remainingForms.length === 0) {
      setEditing(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-gray-500">Loading internships...</div>;
  }

  return (
    <Section
      title="Internship Experience"
      editable={editable}
      editing={editing}
      onEdit={handleEditAll}
    >

      {editable && (
        <button
          onClick={handleAddForm}
          className="mb-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
        >
          + Add Internship
        </button>
      )}

      <div className="space-y-4">

        {/* FORMS */}

        {forms.map((f) => (

          <div key={f.id} className="p-4 border rounded-lg bg-gray-50">

            <Grid mdCols={2} lgCols={2} className="gap-4">

              <Input
                label="Role"
                name="role"
                value={f.data.role}
                onChange={(e) => handleChange(f.id, e)}
              />

              <Input
                label="Company Name"
                name="companyName"
                value={f.data.companyName}
                onChange={(e) => handleChange(f.id, e)}
              />

              <Input
                label="Start Date"
                name="startDate"
                type="date"
                value={f.data.startDate}
                onChange={(e) => handleChange(f.id, e)}
              />

              <Input
                label="End Date"
                name="endDate"
                type="date"
                value={f.data.endDate}
                onChange={(e) => handleChange(f.id, e)}
              />

            </Grid>

            <div className="mt-3">
              <Input
                label="Description"
                name="description"
                value={f.data.description}
                onChange={(e) => handleChange(f.id, e)}
              />
            </div>

            <Buttons
              onCancel={() => handleCancel(f.id)}
              onSave={() => handleSave(f.id)}
              loading={false}
            />

          </div>
        ))}

        {/* CARDS */}

        {internshipList
          .filter((intern) => !forms.some((f) => f.id === intern.id))
          .map((intern) => (

            <div
              key={intern.id}
              className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition"
            >

              <h3 className="text-lg font-semibold text-gray-800">
                {intern.role}
              </h3>

              <p className="text-indigo-600 font-medium">
                {intern.companyName}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {intern.startDate} - {intern.endDate || "Present"}
              </p>

              {intern.description && (
                <p className="text-sm text-gray-500 mt-2">
                  {intern.description}
                </p>
              )}

            </div>
          ))}

      </div>

      {internshipList.length === 0 && forms.length === 0 && (
        <p className="text-gray-500 text-sm">
          No internship details added.
        </p>
      )}

    </Section>
  );
};

export default Internship;