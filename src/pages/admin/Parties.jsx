import { useState } from "react";
import { useData } from "../../context/DataContext";

export default function Parties() {
  const { data, addParty, updateParty, deleteParty } = useData();

  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  // ✅ HANDLE IMAGE UPLOAD
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result);
    reader.readAsDataURL(file);
  };

  // ✅ ADD PARTY
  const handleAdd = () => {
    if (!name) return alert("Enter party name");
    addParty(name, logo);
    setName("");
    setLogo(null);
  };

  // ✅ UPDATE PARTY
  const handleUpdate = () => {
    updateParty(editId, editName);
    setEditId(null);
    setEditName("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-cyan-300 mb-6">
        ✅ Manage Parties (LIVE)
      </h1>

      {/* ================= ADD PARTY ================= */}
      <div className="bg-white/10 p-5 border border-cyan-400 rounded mb-8 grid md:grid-cols-3 gap-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Party Name"
          className="p-3 bg-black/40 rounded"
        />

        <input type="file" onChange={handleImage} />

        <button
          onClick={handleAdd}
          className="bg-cyan-400 text-black font-bold rounded"
        >
          ➕ Add Party
        </button>
      </div>

      {/* ================= PARTY LIST ================= */}
      <div className="grid md:grid-cols-3 gap-6">
        {data.parties.map((p) => (
          <div
            key={p.id}
            className="bg-white/10 p-4 border border-cyan-400 rounded text-center"
          >
            {p.logo && (
              <img
                src={p.logo}
                className="h-16 mx-auto mb-3 object-contain"
              />
            )}

            {/* ✅ EDIT MODE */}
            {editId === p.id ? (
              <>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="p-2 bg-black/40 rounded w-full mb-3"
                />

                <button
                  onClick={handleUpdate}
                  className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditId(null)}
                  className="bg-gray-600 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p className="font-bold mb-3">{p.name}</p>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setEditId(p.id);
                      setEditName(p.name);
                    }}
                    className="bg-yellow-500 text-black px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteParty(p.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
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
