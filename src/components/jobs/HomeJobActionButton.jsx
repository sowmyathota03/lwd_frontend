import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function JobActionButton() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
       navigate("/jobs");
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 0);
    } else {
      navigate("/register");
    }
  };

  return (
    <button onClick={handleClick} className="btn btn-primary">
      {user ? "Apply for Job" : "Create Profile"}
    </button>
  );
}

export default JobActionButton;
