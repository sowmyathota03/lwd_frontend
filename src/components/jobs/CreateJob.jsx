import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJobAsRecruiter } from "../../api/JobApi";

export default function CreateJob() {

  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    location: "",
    minSalary: "",
    maxSalary: "",
    industry: "",
    jobType: "",
    minExperience: "",
    maxExperience: "",
    roleCategory: "",
    department: "",
    workplaceType: "",
    education: "",
    skills: "",
    genderPreference: "",
    ageLimit: "",
    description: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...job,
      minSalary: job.minSalary ? Number(job.minSalary) : null,
      maxSalary: job.maxSalary ? Number(job.maxSalary) : null,
      minExperience: job.minExperience ? Number(job.minExperience) : null,
      maxExperience: job.maxExperience ? Number(job.maxExperience) : null,
    };

    try {
      await createJobAsRecruiter(payload);
      alert("Job created successfully");
      navigate("/recruiter/managejob");
    } catch (err) {
      console.error(err);
      alert("Failed to create job");
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 py-10 flex justify-center">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-6xl space-y-8"
      >

        <h1 className="text-2xl font-semibold text-gray-800">
          Create Job Posting
        </h1>


        {/* JOB DETAILS */}

        <div className="bg-white p-6 rounded-xl shadow-sm">

          <h2 className="text-lg font-semibold mb-5 text-gray-700">
            Job Details
          </h2>

          <div className="grid md:grid-cols-3 gap-5">

            <Input label="Job Title" name="title" value={job.title} handleChange={handleChange} />

            <Input label="Location" name="location" value={job.location} handleChange={handleChange} />

            <Select
              label="Job Type"
              name="jobType"
              value={job.jobType}
              handleChange={handleChange}
              options={["FULL_TIME","PART_TIME","INTERNSHIP","CONTRACT"]}
            />

            <Input label="Min Salary" name="minSalary" value={job.minSalary} handleChange={handleChange} type="number" />

            <Input label="Max Salary" name="maxSalary" value={job.maxSalary} handleChange={handleChange} type="number" />

            <Input label="Industry" name="industry" value={job.industry} handleChange={handleChange} />

            <Input label="Min Experience" name="minExperience" value={job.minExperience} handleChange={handleChange} type="number" />

            <Input label="Max Experience" name="maxExperience" value={job.maxExperience} handleChange={handleChange} type="number" />

            <Select
              label="Workplace Type"
              name="workplaceType"
              value={job.workplaceType}
              handleChange={handleChange}
              options={["Work From Office","Remote","Hybrid"]}
            />

          </div>
        </div>


        {/* CANDIDATE PREFERENCE */}

        <div className="bg-gray-50 p-6 rounded-xl shadow-sm">

          <h2 className="text-lg font-semibold mb-5 text-gray-700">
            Candidate Preference
          </h2>

          <div className="grid md:grid-cols-3 gap-5">

            <Input label="Education" name="education" value={job.education} handleChange={handleChange} />

            <Input label="Skills" name="skills" value={job.skills} handleChange={handleChange} />

            <Select
              label="Gender Preference"
              name="genderPreference"
              value={job.genderPreference}
              handleChange={handleChange}
              options={["Any","Male","Female"]}
            />

            <Input label="Age Limit" name="ageLimit" value={job.ageLimit} handleChange={handleChange} />

          </div>
        </div>


        {/* JOB DESCRIPTION */}

        <div className="bg-white p-6 rounded-xl shadow-sm">

          <h2 className="text-lg font-semibold mb-5 text-gray-700">
            Job Description
          </h2>

          <div className="space-y-4">

            <Textarea placeholder="Job Overview" name="description" value={job.description} handleChange={handleChange}/>

            <Textarea placeholder="Responsibilities" name="responsibilities" value={job.responsibilities} handleChange={handleChange}/>

            <Textarea placeholder="Requirements" name="requirements" value={job.requirements} handleChange={handleChange} />

            <Textarea placeholder="Benefits" name="benefits" value={job.benefits} handleChange={handleChange}
              />

          </div>
        </div>


        {/* BUTTON */}

        <div className="flex justify-end">

          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Publish Job
          </button>

        </div>

      </form>

    </div>
  );
}



/* INPUT */

function Input({ label, name, value, handleChange, type="text" }) {

  return (
    <div>

      <label className="text-sm text-gray-600">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />

    </div>
  );
}



/* SELECT */

function Select({ label, name, value, handleChange, options }) {

  return (
    <div>

      <label className="text-sm text-gray-600">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      >

        <option value="">Select</option>

        {options.map((opt, i) => (
          <option key={i}>{opt}</option>
        ))}

      </select>

    </div>
  );
}



/* TEXTAREA */

function Textarea({ placeholder, name, value, handleChange }) {

  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      rows="3"
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
    />
  );
}