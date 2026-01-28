import React from "react";
import LiveChart from "../../components/LiveChart";
import { useData } from "../../context/DataContext";

/**
 * Admin Dashboard (Admin Control Center)
 * - Shows dynamic stats (voters, candidates)
 * - Start / Stop election controls (wired to DataContext)
 * - Live charts (bar + pie) via LiveChart component
 * - Buttons: Export Excel (delegated to Results page) + Share on WhatsApp
 *
 * Ensure DataContext provides:
 *   data, startElection, stopElection
 */

export default function Dashboard() {
  const { data, startElection, stopElection } = useData();

  const shareOnWhatsApp = () => {
    if (!data || !data.candidates) return;
    const summary = data.candidates
      .map((c) => `${c.name} (${c.party}) → ${c.votes} votes`)
      .join("\n");
    const message = `🗳️ Election Update\n\n${summary}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-cyan-300">
          Election Control Center
        </h1>

        <div className="flex items-center gap-3">
          <button
            onClick={startElection}
            className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:brightness-110"
          >
            ✅ Start Election
          </button>

          <button
            onClick={stopElection}
            className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:brightness-110"
          >
            ⛔ Stop Election
          </button>

          <button
            onClick={shareOnWhatsApp}
            className="bg-cyan-400 text-black px-4 py-2 rounded-md font-semibold hover:brightness-105"
          >
            📤 Share Results (WhatsApp)
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="glass p-6 rounded-lg border border-cyan-400">
          <h3 className="text-sm text-gray-300">Total Voters</h3>
          <p className="text-3xl font-bold text-cyan-300">{data?.voters?.length ?? 0}</p>
        </div>

        <div className="glass p-6 rounded-lg border border-cyan-400">
          <h3 className="text-sm text-gray-300">Total Candidates</h3>
          <p className="text-3xl font-bold text-cyan-300">{data?.candidates?.length ?? 0}</p>
        </div>

        <div className="glass p-6 rounded-lg border border-cyan-400">
          <h3 className="text-sm text-gray-300">Election Status</h3>
          <p
            className={`text-2xl font-bold ${
              data?.electionStatus === "LIVE" ? "text-green-400" : "text-red-400"
            }`}
          >
            {data?.electionStatus ?? "UNKNOWN"}
          </p>
        </div>
      </div>

      {/* Control Panel + Charts */}
      <div className="glass p-6 rounded-lg border border-cyan-400">
        <div className="mb-6">
          <p className="text-gray-300">
            Use the controls above to manage the election. Charts below show live results updated
            in real-time as votes are cast.
          </p>
        </div>

        <div className="mt-4">
          <LiveChart />
        </div>
      </div>
    </div>
  );
}
