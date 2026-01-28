import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="hidden md:flex w-64 flex-col bg-black text-white p-6 border-r border-cyan-400">

      <h2 className="text-xl font-bold mb-8 text-cyan-300">
        Admin Panel
      </h2>

      <nav className="flex flex-col gap-4 text-sm flex-1">

        <Link to="/admin" className="hover:text-cyan-300">🏠 Dashboard</Link>
        <Link to="/admin/parties" className="hover:text-cyan-300">🏛️ Parties</Link>
        <Link to="/admin/candidates" className="hover:text-cyan-300">👤 Candidates</Link>
        <Link to="/admin/voters" className="hover:text-cyan-300">🧑‍🤝‍🧑 Voters</Link>

        {/* NEW SECTION */}
        <Link to="/admin/candidate-accounts" className="hover:text-cyan-300">
          🎯 Candidate Accounts
        </Link>

        <Link to="/admin/results" className="hover:text-cyan-300">📊 Results</Link>

      </nav>

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 px-4 py-2 rounded text-sm font-bold"
      >
        Logout
      </button>

    </aside>
  );
}
