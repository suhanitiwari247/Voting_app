import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";

export default function CandidateAccounts() {
  const { generateCandidate, users } = useAuth();
  const { data, addCandidate, deleteCandidate } = useData();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [party, setParty] = useState("");
  const [search, setSearch] = useState("");

  const handleGenerate = () => {
    if (!name || !password || !party) {
      alert("Fill all fields!");
      return;
    }

    generateCandidate(name, password);
    addCandidate(name, party, null);

    setName("");
    setPassword("");
    setParty("");
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  const exportToCSV = () => {
    const rows = users
      .filter(u => u.role === "candidate")
      .map(u => `${u.name},${u.userId},${u.password}`);

    const csv = "Name,UserID,Password\n" + rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "candidate-credentials.csv";
    link.click();
  };

  const handleDelete = (userId, name) => {
    if (!window.confirm("Delete this candidate?")) return;

    // Delete from Auth Users
    const updated = users.filter(u => u.userId !== userId);
    localStorage.setItem("authUsers", JSON.stringify(updated));

    // Delete from Voting Candidates (DataContext)
    const cand = data.candidates.find(c => c.name === name);
    if (cand) deleteCandidate(cand.id);

    window.location.reload();
  };

  // 🚀 CRASH-PROOF FILTERING
  const filtered = users
    .filter(u => u.role === "candidate")
    .filter(u =>
      (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.userId || "").toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="p-8">
      <h1 className="text-3xl text-cyan-300 font-bold mb-6">
        🎯 Candidate Accounts (Pro Panel)
      </h1>

      {/* Add Candidate Form */}
      <div className="bg-white/10 border border-cyan-400 rounded-xl p-6 mb-8 grid md:grid-cols-4 gap-4">
        <input
          className="p-3 bg-black/40 text-white rounded"
          placeholder="Candidate Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <select
          className="p-3 bg-black/40 text-white rounded"
          value={party}
          onChange={e => setParty(e.target.value)}
        >
          <option value="">Select Party</option>
          {data.parties.map(p => (
            <option key={p.id}>{p.name}</option>
          ))}
        </select>

        <input
          className="p-3 bg-black/40 text-white rounded"
          placeholder="Set Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={handleGenerate}
          className="bg-green-600 rounded font-bold hover:bg-green-700"
        >
          Generate
        </button>
      </div>

      {/* Search + Export */}
      <div className="flex justify-between mb-4">
        <input
          className="p-2 bg-black/40 text-white rounded w-64"
          placeholder="Search name or ID"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <button
          onClick={exportToCSV}
          className="bg-cyan-500 px-4 py-2 rounded font-bold text-black"
        >
          Export Excel
        </button>
      </div>

      {/* List */}
      <div className="bg-white/10 border border-cyan-400 rounded-xl p-4">

        <div className="grid grid-cols-4 font-bold text-cyan-300 border-b border-cyan-400 pb-2">
          <span>Name</span>
          <span>User ID</span>
          <span>Password</span>
          <span>Action</span>
        </div>

        {filtered.map(c => (
          <div
            key={c.userId}
            className="grid grid-cols-4 py-2 border-b border-cyan-400/30 text-white"
          >
            <span>{c.name}</span>

            <span
              className="cursor-pointer text-yellow-300"
              onClick={() => copyText(c.userId)}
            >
              {c.userId} 📋
            </span>

            <span
              className="cursor-pointer text-green-400"
              onClick={() => copyText(c.password)}
            >
              {c.password} 📋
            </span>

            <button
              onClick={() => handleDelete(c.userId, c.name)}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
            >
              Delete
              </button>
            </div>
        ))}
      </div>
    </div>
  );
}
