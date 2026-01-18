import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, login, logout, signup } from "../services/auth.service";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const signIn = async (data) => {
    await login(data);
    const user = await getCurrentUser();
    setUser(user);
  };

  const signUp = async (data) => {
    await signup(data); // auto login inside service
    const user = await getCurrentUser();
    setUser(user);
  };

  const signOut = async () => {
    await logout();
    setUser(null);
    toast.success("Logout successful!");
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
