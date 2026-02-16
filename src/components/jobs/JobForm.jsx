// JobForm.jsx
import { useState } from "react";

export default function JobForm({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    location: initialData.location || "",
    salary: initialData.salary || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}>
      <input name="title" value={form.title} onChange={handleChange} />
      <textarea name="description" value={form.description} onChange={handleChange} />
      <input name="location" value={form.location} onChange={handleChange} />
      <input name="salary" value={form.salary} onChange={handleChange} />

      <button type="submit">Save</button>
    </form>
  );
}
