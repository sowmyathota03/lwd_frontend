import { useState } from "react";

function CompanyLogo({ editable }) {
    const [logo, setLogo] = useState(null);

    const handleUpload = (e) => {
        setLogo(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <div className="bg-white dark:bg-slate-800 shadow-md rounded-2xl p-6 flex flex-col items-center space-y-4 transition-colors">

            {/* Header */}
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100">
                Company Logo
            </h2>

            {/* Logo Preview */}
            {logo ? (
                <img
                    src={logo}
                    alt="Company Logo"
                    className="h-24 w-24 object-contain rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm"
                />
            ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                    No logo uploaded
                </p>
            )}

            {/* Upload Button */}
            {editable && (
                <label className="cursor-pointer">
                    <input
                        type="file"
                        onChange={handleUpload}
                        className="hidden"
                    />
                    <span className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors">
                        {logo ? "Change Logo" : "Upload Logo"}
                    </span>
                </label>
            )}
        </div>
    );
}

export default CompanyLogo;