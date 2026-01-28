import * as XLSX from "xlsx";
import { useData } from "../../context/DataContext";

export default function Results() {
  const { data } = useData();

  const exportToExcel = () => {
    const excelData = data.candidates.map(c => ({
      Candidate: c.name,
      Party: c.party,
      Votes: c.votes
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Election Results");

    XLSX.writeFile(workbook, "Election_Results.xlsx");
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold text-cyan-300 mb-6">
        📊 Live Election Results
      </h1>

      <div className="bg-white/10 border border-cyan-400 rounded p-6 mb-6">
        {data.candidates.map((c) => (
          <div
            key={c.id}
            className="flex justify-between border-b border-cyan-400 py-2"
          >
            <span>{c.name} ({c.party})</span>
            <span className="text-green-400 font-bold">
              {c.votes} Votes
            </span>
          </div>
        ))}
      </div>

      {/* ✅ EXCEL EXPORT BUTTON */}
      <button
        onClick={exportToExcel}
        className="bg-green-600 px-6 py-3 rounded font-bold"
      >
        ⬇️ Download Excel Report
      </button>

    </div>
  );
}
