import LiveChart from "../../components/LiveChart";

export default function Analytics() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-cyan-300 mb-6">
        Performance Analytics
      </h1>

      <div className="bg-white/10 p-6 border border-cyan-400 rounded">
        <LiveChart />
      </div>
    </div>
  );
}
