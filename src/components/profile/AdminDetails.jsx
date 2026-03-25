import React from "react";

const AdminDetails = () => {
  return (
    <div className="lwd-card lwd-card-hover space-y-4">

      {/* Header */}
      <div>
        <h3 className="lwd-title">
          Admin Information
        </h3>
        <p className="lwd-text mt-1">
          Admin specific information can be displayed here.
        </p>
      </div>

      {/* Content Section */}
      <div className="space-y-2">
        <p className="lwd-text">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Role:
          </span>{" "}
          Administrator
        </p>

        <p className="lwd-text">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Access Level:
          </span>{" "}
          Full Access
        </p>

        <p className="lwd-text">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Permissions:
          </span>{" "}
          Manage Users, Jobs, Reports
        </p>
      </div>

    </div>
  );
};

export default AdminDetails;