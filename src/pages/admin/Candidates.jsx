import { useState } from "react";
import { useData } from "../../context/DataContext";

export default function Candidates() {
  const { data, addCandidate, deleteCandidate } = useData();
  const [name, setName] = useState("");
  const [party, setParty] = useState("");
  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(e.target.files[0]);
    };

  return (
    <div>
      <h1 className="text-2xl font-bold text-cyan-300 mb-6">
        Manage Candidates (Live)
      </h1>

      <div className="bg-white/10 p-5 border border-cyan-400 rounded mb-6 grid md:grid-cols-4 gap-4">
        <input
          placeholder="Candidate Name"
          onChange={e => setName(e.target.value)}
          className="p-3 bg-black/40 rounded"
        />

        <select
          onChange={e => setParty(e.target.value)}
          className="p-3 bg-black/40 rounded"
        >
          <option>Select Party</option>
          {data.parties.map(p => (
            <option key={p.id}>{p.name}</option>
          ))}
        </select>

        <input type="file" onChange={handleImage} />

        <button
          onClick={() => {
            addCandidate(name, party, image);
            setName("");
            setParty("");
            setImage(null);
          }}
          className="bg-cyan-400 text-black font-bold rounded"
        >
          Add Candidate
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {data.candidates.map(c => (
          <div
            key={c.id}
            className="bg-white/10 p-4 border border-cyan-400 rounded text-center"
          >
            {c.image && (
              <img src={c.image} className="h-20 w-20 mx-auto rounded-full mb-3" />
            )}

            <p className="font-bold">{c.name}</p>
            <p className="text-cyan-300">{c.party}</p>

            <button
              onClick={() => deleteCandidate(c.id)}
              className="mt-3 bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
