import { createContext, useContext, useState, useEffect } from "react";

// Create a context
const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Load token from localStorage on initial load
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const saveTokenInLocalStr = (token) => {
    setToken(token);
    localStorage.setItem("authToken", token);
  };

  const LogoutUser = () => {
    setToken(null);
    localStorage.removeItem("authToken");
  };

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider
      value={{ token, saveTokenInLocalStr, isLoggedIn, LogoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
