import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data } = useData();

  const voter = data.voters.find(v => v.id === user?.voterId);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-cyan-300 mb-6">
        🗳️ Voter Dashboard
      </h1>

      <div className="bg-white/10 border border-cyan-400 rounded p-5 mb-6">
        <p>Voter ID: <span className="text-green-400">{user?.voterId}</span></p>
        <p className="mt-2">
          Status:{" "}
          {voter?.voted ? (
            <span className="text-red-400 font-bold">Already Voted</span>
          ) : (
            <span className="text-green-400 font-bold">Not Voted</span>
          )}
        </p>
      </div>

      {!voter?.voted && (
        <button
          onClick={() => navigate("/voter/vote")}
          className="bg-cyan-400 text-black font-bold px-6 py-3 rounded"
        >
          ✅ Go to Voting Panel
        </button>
      )}

      {voter?.voted && (
        <button
          onClick={() => navigate("/voter/results")}
          className="mt-4 bg-green-600 text-white font-bold px-6 py-3 rounded"
        >
          📊 View Results
        </button>
      )}
    </div>
  );
}
