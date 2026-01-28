import Navbar from "../components/Navbar";

export default function VoterLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-[var(--navy)]">
      <Navbar />
      <main className="p-5">{children}</main>
    </div>
  );
}
