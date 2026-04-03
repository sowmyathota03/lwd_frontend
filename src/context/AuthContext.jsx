import { createContext, useEffect, useState } from "react";
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

const isTokenExpired = (decoded) => {
  if (!decoded?.exp) return false;
  return decoded.exp * 1000 <= Date.now();
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const restoreUser = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);

        if (isTokenExpired(decoded)) {
          localStorage.removeItem("token");
          setUser(null);
        } else {
          const mappedUser = mapDecodedTokenToUser(decoded);
          setUser(mappedUser);
        }
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreUser();
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);

    try {
      const decoded = jwtDecode(token);

      if (isTokenExpired(decoded)) {
        localStorage.removeItem("token");
        setUser(null);
        return;
      }

      const mappedUser = mapDecodedTokenToUser(decoded);
      setUser(mappedUser);
    } catch (error) {
      console.error("Invalid token during login", error);
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};