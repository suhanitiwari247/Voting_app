import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ================= CONTEXT ================= */
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import ProtectedRoute from "./routes/ProtectedRoute";

/* ================= AUTH ================= */
import Login from "./pages/auth/Login";
import OTP from "./pages/auth/OTP";

/* ================= ADMIN ================= */
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import Parties from "./pages/admin/Parties";
import Candidates from "./pages/admin/Candidates";
import Voters from "./pages/admin/Voters";
import AdminResults from "./pages/admin/Results";
import SecurityLogs from "./pages/admin/SecurityLogs";
import CandidateAccounts from "./pages/admin/CandidateAccounts";

/* ================= VOTER ================= */
import VoterLayout from "./layout/VoterLayout";
import VoterDashboard from "./pages/voter/Dashboard";
import Vote from "./pages/voter/Vote";
import VoterResults from "./pages/voter/Results";

/* ================= CANDIDATE ================= */
import CandidateLayout from "./layout/CandidateLayout";
import CandidateDashboard from "./pages/candidate/Dashboard";
import Analytics from "./pages/candidate/Analytics";

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        {/* GLOBAL BACKGROUND FOR ALL ROUTES */}
        <div
          style={{
            backgroundImage: "url('/image.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
          }}
        >
          <BrowserRouter>
            <Routes>

              {/* ================= PUBLIC ROUTES ================= */}
              <Route path="/" element={<Login />} />
              <Route path="/otp" element={<OTP />} />

              {/* ================= ADMIN ROUTES ================= */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute role="admin">
                    <AdminLayout>
                      <AdminDashboard />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/parties"
                element={
                  <ProtectedRoute role="admin">
                    <AdminLayout>
                      <Parties />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/candidates"
                element={
                  <ProtectedRoute role="admin">
                    <AdminLayout>
                      <Candidates />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/candidate-accounts"
                element={
                  <ProtectedRoute role="admin">
                    <AdminLayout>
                      <CandidateAccounts />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/voters"
                element={
                  <ProtectedRoute role="admin">
                    <AdminLayout>
                      <Voters />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/results"
                element={
                  <ProtectedRoute role="admin">
                    <AdminLayout>
                      <AdminResults />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/security"
                element={
                  <ProtectedRoute role="admin">
                    <AdminLayout>
                      <SecurityLogs />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              {/* ================= VOTER ROUTES ================= */}
              <Route
                path="/voter"
                element={
                  <ProtectedRoute role="voter">
                    <VoterLayout>
                      <VoterDashboard />
                    </VoterLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/voter/vote"
                element={
                  <ProtectedRoute role="voter">
                    <VoterLayout>
                      <Vote />
                    </VoterLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/voter/results"
                element={
                  <ProtectedRoute role="voter">
                    <VoterLayout>
                      <VoterResults />
                    </VoterLayout>
                  </ProtectedRoute>
                }
              />

              {/* ================= CANDIDATE ROUTES ================= */}
              <Route
                path="/candidate"
                element={
                  <ProtectedRoute role="candidate">
                    <CandidateLayout>
                      <CandidateDashboard />
                    </CandidateLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/candidate/analytics"
                element={
                  <ProtectedRoute role="candidate">
                    <CandidateLayout>
                      <Analytics />
                    </CandidateLayout>
                  </ProtectedRoute>
                }
              />

            </Routes>
          </BrowserRouter>
        </div>
      </DataProvider>
    </AuthProvider>
  );
}
