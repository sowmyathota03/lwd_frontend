const RecruiterDetails = ({ profile }) => {
  if (!profile) {
    return (
      <div className="bg-gray-100 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-700">
          Recruiter Details
        </h3>
        <p className="text-gray-500 mt-2">
          Recruiter profile details will appear here.
        </p>
      </div>
    );
  }

  return null;
};

export default RecruiterDetails;

