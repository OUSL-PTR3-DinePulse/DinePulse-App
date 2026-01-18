import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const AdminAuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("adminAccess") === "true"
  );

  const loginAdmin = (password) => {
    if (password === import.meta.env.VITE_ADMIN_SECRET) {
      setIsAdmin(true);
      localStorage.setItem("adminAccess", "true");
      toast.success("Login successful!");
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem("adminAccess");
    toast.success("Logout successful!");
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin, loginAdmin, logoutAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
