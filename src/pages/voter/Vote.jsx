import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";

export default function Vote() {
  const { data, castVote } = useData();
  const { user } = useAuth();

  const voterId = user?.voterId;
  const voter = data.voters.find(v => v.id === voterId);

  if (data.electionStatus === "CLOSED") {
    return (
      <h1 className="text-center text-red-400 text-2xl mt-20">
        ⛔ Election is CLOSED
      </h1>
    );
  }

  if (voter?.voted) {
    return (
      <h1 className="text-center text-green-400 text-2xl mt-20">
        ✅ You have already voted
      </h1>
    );
  }

  return (
    <div className="p-6 grid md:grid-cols-3 gap-6">
      {data.candidates.map(c => (
        <div
          key={c.id}
          className="bg-white/10 border border-cyan-400 rounded-xl p-5 text-center"
        >
          <h3 className="font-bold">{c.name}</h3>
          <p className="text-cyan-300">{c.party}</p>

          <button
            onClick={() => {
              castVote(c.id, voterId);
              alert("✅ Vote Cast Successfully");
            }}
            className="mt-3 bg-cyan-400 text-black font-bold w-full py-2 rounded"
          >
            🗳️ Vote
          </button>
        </div>
      ))}
    </div>
  );
}
