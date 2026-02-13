function JobSkeleton() {
  return (
    <div
      style={{
        width: "280px",
        padding: "20px",
        borderRadius: "8px",
        background: "#f5f5f5",
        animation: "pulse 1.5s infinite",
      }}
    >
      <div style={{ height: "20px", background: "#ddd", marginBottom: "10px" }} />
      <div style={{ height: "15px", background: "#ddd", marginBottom: "10px" }} />
      <div style={{ height: "15px", background: "#ddd", width: "60%" }} />
    </div>
  );
}

export default JobSkeleton;
