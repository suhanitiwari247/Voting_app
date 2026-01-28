export default function OTP() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white/10 p-8 rounded border border-cyan-400 w-full max-w-sm">
        <h2 className="text-center text-lg mb-4">OTP Verification</h2>
        <input className="w-full p-3 bg-black/40 rounded mb-4" placeholder="Enter OTP" />
        <button className="bg-green-600 w-full py-3 rounded font-bold">
          Verify OTP
        </button>
      </div>
    </div>
  );
}
