export default function PartyCard({ name = "Party Name", logo = "/logo.png" }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-cyan-400 rounded-2xl p-5 shadow-xl hover:shadow-cyan-400/40 transition">
      <img src={logo} className="h-16 mx-auto" />
      
      <h3 className="text-center mt-4 font-bold text-lg">
        {name}
      </h3>

      <button className="mt-5 w-full bg-cyan-400 text-black font-bold py-3 rounded hover:scale-105 transition">
        🔐 Cast Vote
      </button>
    </div>
  );
}
