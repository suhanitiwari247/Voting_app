import { useData } from "../context/DataContext";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

export default function LiveChart() {
  const { data } = useData();

  const chartData = data.candidates.map(c => ({
    name: c.name,
    votes: c.votes
  }));

  return (
    <div className="grid md:grid-cols-2 gap-8 w-full">

      {/* ✅ BAR CHART */}
      <div className="bg-white/10 border border-cyan-400 p-4 rounded h-80">
        <h2 className="text-center mb-2 font-bold text-cyan-300">
          Vote Distribution (Bar)
        </h2>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Bar dataKey="votes" fill="#06b6d4" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ PIE CHART */}
      <div className="bg-white/10 border border-cyan-400 p-4 rounded h-80">
        <h2 className="text-center mb-2 font-bold text-cyan-300">
          Vote Share (Pie)
        </h2>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="votes"
              nameKey="name"
              outerRadius={110}
            >
              {chartData.map((_, i) => (
                <Cell
                  key={i}
                  fill={["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"][i % 4]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
