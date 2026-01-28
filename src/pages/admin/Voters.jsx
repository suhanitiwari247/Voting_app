import { useState } from "react";
import { useData } from "../../context/DataContext";

export default function Voters() {
  const { data, addVoter } = useData();
  const [name, setName] = useState("");
  const [createdId, setCreatedId] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-cyan-300 mb-6">
        ✅ Voter Registration
      </h1>

      {/* ✅ ADD VOTER */}
      <div className="bg-white/10 border border-cyan-400 p-5 rounded mb-6">
        <input
          placeholder="Enter Voter Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 bg-black/40 rounded w-full mb-3"
        />

        <button
          onClick={() => {
            if (!name.trim()) return alert("Enter name first!");
            const id = addVoter(name);
            setCreatedId(id);
            setName("");
          }}
          className="bg-cyan-400 text-black font-bold px-6 py-2 rounded"
        >
          ➕ Register Voter
        </button>

        {createdId && (
          <p className="mt-3 text-green-400 font-bold">
            ✅ New Voter ID: {createdId}
          </p>
        )}
      </div>

      {/* ✅ VOTER LIST */}
      <h2 className="text-xl font-bold mb-3">Registered Voters</h2>

      {data.voters.length === 0 && (
        <p className="text-gray-400">No voters registered yet.</p>
      )}

      {data.voters.map(v => (
        <div
          key={v.id}
          className="bg-white/10 p-4 border border-cyan-400 rounded mb-3 flex justify-between"
        >
          <div>
            <p className="font-bold">{v.name}</p>
            <p className="text-sm">Voter ID: {v.id}</p>
          </div>

          <span className={`font-bold ${v.voted ? "text-red-400" : "text-green-400"}`}>
            {v.voted ? "Voted" : "Not Voted"}
          </span>
        </div>
      ))}
    </div>
  );
}
