import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // back to login
  };

  return (
    <header className="flex justify-between items-center px-5 py-4 bg-[var(--navy)] border-b border-cyan-400">
      <h1 className="font-bold text-cyan-300 tracking-wide">
        Online Voting System
      </h1>

      <div className="flex items-center gap-4">
        {user?.voterId && (
          <span className="text-sm text-green-400">
            Voter ID: {user.voterId}
          </span>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded text-sm font-bold hover:bg-red-500"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
