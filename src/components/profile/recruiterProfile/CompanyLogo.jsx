import { useState } from "react";

function CompanyLogo({ editable }) {

    const [logo, setLogo] = useState(null);

    const handleUpload = (e) => {
        setLogo(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <div className="bg-gray-100 shadow-sm rounded-lg p-4">

            <h2 className="text-lg font-semibold mb-3">Company Logo</h2>

            {logo ? (
                <img src={logo} alt="logo" className="h-24 mb-3 rounded" />
            ) : (
                <p className="text-gray-500">No logo uploaded</p>
            )}

            {editable && (
                <input type="file" onChange={handleUpload} />
            )}
        </div>
    );
}

export default CompanyLogo;