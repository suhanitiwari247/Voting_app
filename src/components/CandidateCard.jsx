import { useState } from "react";
import { useData } from "../../context/DataContext";

export default function Candidates() {
  const { data, deleteCandidate, addCandidate } = useData();

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editParty, setEditParty] = useState("");
  const [editImage, setEditImage] = useState(null);

  // ✅ IMAGE UPDATE HANDLER
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setEditImage(reader.result);
    reader.readAsDataURL(file);
  };

  // ✅ UPDATE CANDIDATE (DELETE + READD METHOD)
  const handleUpdate = () => {
    if (!editName || !editParty) {
      alert("Fill all fields!");
      return;
    }

    // ✅ REMOVE OLD
    deleteCandidate(editId);

    // ✅ ADD UPDATED
    addCandidate(editName, editParty, editImage);

    setEditId(null);
    setEditName("");
    setEditParty("");
    setEditImage(null);
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold text-cyan-300 mb-6">
        👤 Manage Candidates (Update Only)
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {data.candidates.map(c => (
          <div
            key={c.id}
            className="bg-white/10 border border-cyan-400 rounded-xl p-5 text-center"
          >
            {c.image && (
              <img
                src={c.image}
                className="h-28 w-28 rounded-full mx-auto mb-3 object-cover"
              />
            )}

            {/* ✅ EDIT MODE */}
            {editId === c.id ? (
              <>
                <input
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full p-2 mb-2 bg-black/40 rounded"
                />

                <select
                  value={editParty}
                  onChange={e => setEditParty(e.target.value)}
                  className="w-full p-2 mb-2 bg-black/40 rounded"
                >
                  <option value="">Select Party</option>
                  {data.parties.map(p => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>

                <input
                  type="file"
                  onChange={handleImage}
                  className="w-full mb-3"
                />

                <button
                  onClick={handleUpdate}
                  className="bg-green-600 px-4 py-1 rounded mr-2"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditId(null)}
                  className="bg-gray-600 px-4 py-1 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h2 className="font-bold">{c.name}</h2>
                <p className="text-cyan-300">{c.party}</p>
                <p className="text-green-400 font-bold">
                  {c.votes} Votes
                </p>

                <div className="flex justify-center gap-3 mt-3">

                  <button
                    onClick={() => {
                      setEditId(c.id);
                      setEditName(c.name);
                      setEditParty(c.party);
                      setEditImage(c.image);
                    }}
                    className="bg-yellow-500 px-3 py-1 rounded text-black"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteCandidate(c.id)}
                    className="bg-red-600 px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </div>
              </>
            )}
          </div>
        ))}

      </div>
    </div>
  );
}
