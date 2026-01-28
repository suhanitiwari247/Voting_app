export default function SecurityLogs() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-cyan-300 mb-6">
        System Security Logs
      </h1>

      {[1, 2, 3, 4].map(log => (
        <div
          key={log}
          className="bg-white/10 p-4 border border-cyan-400 rounded mb-3"
        >
          User GOV-{log} logged in at 12:{log}2 PM ✅
        </div>
      ))}
    </div>
  );
}
