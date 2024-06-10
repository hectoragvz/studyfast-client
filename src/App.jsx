import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import { Toaster } from "sonner";

function Logout() {
  localStorage.clear();
  return <Navigate to="/" />;
}

function RegisterandLogout() {
  localStorage.clear();
  return <Register />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position="top-center" />
      <div className="">
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sessions/:id"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterandLogout />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
