import Navbar from "../components/Navbar";

export default function CandidateLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900">
      <Navbar />
      <main className="p-5">{children}</main>
    </div>
  );
}
