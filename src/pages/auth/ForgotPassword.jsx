import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ForgotPassword() {
  const [userId, setUserId] = useState("");
  const [newPass, setNewPass] = useState("");
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  const handleReset = () => {
    if (!userId || !newPass) return alert("Fill all fields");
    forgotPassword(userId, newPass);
    alert("✅ Password Reset Successful");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass p-8 rounded w-full max-w-sm">

        <h1 className="text-center text-xl font-bold mb-6 text-cyan-300">
          Reset Password
        </h1>

        <input
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full p-3 mb-4 bg-black/40 rounded"
        />

        <input
          placeholder="Enter New Password"
          type="password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          className="w-full p-3 mb-4 bg-black/40 rounded"
        />

        <button
          onClick={handleReset}
          className="bg-green-600 w-full py-3 rounded font-bold"
        >
          Reset Password
        </button>

      </div>
    </div>
  );
}
