import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      fetch(`http://localhost:8080/api/auth/verify-email?token=${token}`)
        .then(res => res.json())
        .then(data => {
          setMessage("Email Verified Successfully ✅");
        })
        .catch(() => {
          setMessage("Verification Failed ❌");
        });
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <h2 className="text-xl font-semibold">{message}</h2>
    </div>
  );
}

export default VerifyEmail;