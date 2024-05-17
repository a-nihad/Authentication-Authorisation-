import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Get data from LocalStorage
  const storedData = JSON.parse(localStorage.getItem("user_data"));

  useEffect(() => {
    if (storedData) {
      const { userToken, user } = storedData;

      setToken(userToken);
      setUserData(user);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (newToken, newDAta) => {
    localStorage.setItem(
      "user_data",
      JSON.stringify({ userToken: newToken, user: newDAta })
    );

    setToken(newToken);
    setUserData(newDAta);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("user_data");

    setToken(null);
    setUserData(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, token, userData, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
