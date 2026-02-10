import React, { useState } from "react";

function SearchResumes() {
  const [search, setSearch] = useState("");

  // Dummy resumes data (later backend nundi teesukovachu)
  const resumes = [
    { id: 1, name: "Ravi Kumar", skills: "React, JavaScript", location: "Hyderabad" },
    { id: 2, name: "Sneha Reddy", skills: "Java, Spring Boot", location: "Bangalore" },
    { id: 3, name: "Arjun", skills: "Python, Django", location: "Chennai" }
  ];

  const filteredResumes = resumes.filter((resume) =>
    resume.name.toLowerCase().includes(search.toLowerCase()) ||
    resume.skills.toLowerCase().includes(search.toLowerCase()) ||
    resume.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Resumes</h2>

      <input
        type="text"
        placeholder="Search by name, skills, location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "300px",
          padding: "8px",
          marginBottom: "20px"
        }}
      />

      {filteredResumes.length > 0 ? (
        filteredResumes.map((res) => (
          <div
            key={res.id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "6px"
            }}
          >
            <h4>{res.name}</h4>
            <p><b>Skills:</b> {res.skills}</p>
            <p><b>Location:</b> {res.location}</p>
          </div>
        ))
      ) : (
        <p>No resumes found</p>
      )}
    </div>
  );
}

export default SearchResumes;
