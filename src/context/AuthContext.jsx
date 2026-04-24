import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axiosInstance from "../api/axiosInstance";

export const AuthContext = createContext();

const mapDecodedTokenToUser = (decoded) => {
  if (!decoded) return null;

  return {
    id: decoded.userId ?? null,
    userId: decoded.userId ?? null,

    email: decoded.sub ?? "",
    role: decoded.role ?? "",

    // 🔥 NEW FIELDS (must match JWT claims)
    status: decoded.status ?? null,
    emailVerified: decoded.emailVerified ?? false,
    companyId: decoded.companyId ?? null,

    // optional
    exp: decoded.exp ?? null,
    iat: decoded.iat ?? null,
  };
};


const isTokenExpired = (decoded) => {
  if (!decoded?.exp) return false;
  return decoded.exp * 1000 <= Date.now();
};

const clearAuthStorage = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("token"); // old key cleanup
  localStorage.removeItem("deviceId");
  localStorage.removeItem("user");
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const restoreUser = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      
      if (!accessToken) {
        clearAuthStorage();
        setUser(null);
        setLoading(false);
        return;
      }
      
      try {
        const decoded = jwtDecode(accessToken);

        if (!isTokenExpired(decoded)) {
          setUser(mapDecodedTokenToUser(decoded));
          setLoading(false);
          return;
        }

        if (!refreshToken) {
          clearAuthStorage();
          setUser(null);
          setLoading(false);
          return;
        }

        const response = await axiosInstance.post("/auth/refresh", {
          refreshToken,
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          response.data;

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        localStorage.removeItem("token");

        const refreshedDecoded = jwtDecode(newAccessToken);
        setUser(mapDecodedTokenToUser(refreshedDecoded));
      } catch (error) {
        console.error("Failed to restore auth session", error);
        clearAuthStorage();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreUser();
  }, []);

  const login = (authData) => {
    const { accessToken, refreshToken } = authData || {};

    if (!accessToken || !refreshToken) {
      console.error("Missing accessToken or refreshToken during login");
      clearAuthStorage();
      setUser(null);
      return;
    }

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.removeItem("token");

    try {
      const decoded = jwtDecode(accessToken);

      if (isTokenExpired(decoded)) {
        clearAuthStorage();
        setUser(null);
        return;
      }

      setUser(mapDecodedTokenToUser(decoded));
    } catch (error) {
      console.error("Invalid access token during login", error);
      clearAuthStorage();
      setUser(null);
    }
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      if (refreshToken) {
        await axiosInstance.post("/auth/logout", { refreshToken });
      }
    } catch (error) {
      console.error("Logout request failed", error);
    } finally {
      clearAuthStorage();
      setUser(null);
      navigate("/login", { replace: true });
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};