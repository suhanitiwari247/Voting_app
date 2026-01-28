import { useData } from "../../context/DataContext";

export default function Dashboard() {
  const { data } = useData();
  const myName = "Amit Sharma"; // simulate login

  const me = data.candidates.find(c => c.name === myName);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-cyan-300 mb-6">
        Candidate Live Dashboard
      </h1>

      <div className="bg-white/10 p-6 border border-cyan-400 rounded">
        <p>Your Live Votes</p>
        <p className="text-4xl text-green-400 font-bold mt-3">
          {me?.votes || 0}
        </p>
      </div>
    </div>
  );
}
