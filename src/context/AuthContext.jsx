import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

const mapDecodedTokenToUser = (decoded) => {
  if (!decoded) return null;

  return {
    id: decoded.userId ?? null,
    userId: decoded.userId ?? null,
    email: decoded.sub ?? "",
    role: decoded.role ?? "",
    exp: decoded.exp ?? null,
    iat: decoded.iat ?? null,
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const mappedUser = mapDecodedTokenToUser(decoded);

        console.log("Decoded token:", decoded);
        console.log("Mapped auth user:", mappedUser);

        setUser(mappedUser);
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);

    try {
      const decoded = jwtDecode(token);
      const mappedUser = mapDecodedTokenToUser(decoded);

      console.log("Login decoded token:", decoded);
      console.log("Login mapped user:", mappedUser);

      setUser(mappedUser);
    } catch (error) {
      console.error("Invalid token during login", error);
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};