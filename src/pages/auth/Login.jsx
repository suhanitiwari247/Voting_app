import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";

export default function Login() {
  const [role, setRole] = useState("voter");
  const [voterId, setVoterId] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const { data } = useData();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (role === "voter") {
      const valid = data.voters.find(v => v.id === voterId);
      if (!valid) return alert("❌ Invalid Voter ID");
      login("voter", voterId);
      navigate("/voter");
      return;
    }

    const success = login(role, userId, password);
    if (!success) return alert("❌ Wrong ID or Password");

    navigate(`/${role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass p-8 rounded w-full max-w-sm">

        <h1 className="text-center text-xl font-bold mb-6 text-cyan-300">
          Secure Login
        </h1>

        <select
          onChange={(e) => setRole(e.target.value)}
          className="w-full mb-4 p-3 bg-black/40 rounded"
        >
          <option value="voter">Voter</option>
          <option value="admin">Admin</option>
          <option value="candidate">Candidate</option>
        </select>

        {role === "voter" ? (
          <input
            placeholder="Enter Voter ID"
            value={voterId}
            onChange={(e) => setVoterId(e.target.value)}
            className="w-full p-3 mb-4 bg-black/40 rounded"
          />
        ) : (
          <>
            <input
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full p-3 mb-3 bg-black/40 rounded"
            />

            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-3 bg-black/40 rounded"
            />

            <button
              onClick={() => navigate("/forgot")}
              className="text-sm text-cyan-300 mb-3"
            >
              ❓ Forgot Password?
            </button>
          </>
        )}

        <button
          onClick={handleLogin}
          className="bg-cyan-400 w-full py-3 text-black font-bold rounded"
        >
          Login
        </button>

      </div>
    </div>
  );
}
