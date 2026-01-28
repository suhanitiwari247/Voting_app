import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const defaultUsers = [
  {
    role: "admin",
    userId: "ADMIN001",
    password: "admin123",
    name: "Main Admin"
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // ✅ LOAD FROM LOCALSTORAGE
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("authUsers")) || defaultUsers;
  });

  // ✅ ALWAYS SYNC TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("authUsers", JSON.stringify(users));
  }, [users]);

  // ✅ LOGIN
  const login = (role, userId = null, password = null) => {
    if (role === "voter") {
      setUser({ role, voterId: userId });
      return true;
    }

    const found = users.find(
      u => u.role === role && u.userId === userId && u.password === password
    );

    if (!found) return false;

    setUser({ ...found });
    return true;
  };

  // ✅ FORGOT PASSWORD
  const forgotPassword = (userId, newPassword) => {
    setUsers(prev =>
      prev.map(u =>
        u.userId === userId ? { ...u, password: newPassword } : u
      )
    );
  };

  // ✅ ✅ ✅ ADMIN → GENERATE CANDIDATE (PROPERLY SAVED)
  const generateCandidate = (name, password) => {
    const newCandidate = {
      role: "candidate",
      name,
      userId: "CAND" + Math.floor(1000 + Math.random() * 9000),
      password
    };

    setUsers(prev => [...prev, newCandidate]); // ✅ AUTO SAVED BY useEffect
    return newCandidate;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        login,
        logout,
        forgotPassword,
        generateCandidate
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
