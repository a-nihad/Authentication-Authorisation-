import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AuthLayout from "./components/AuthLayout";
import AppLayout from "./components/AppLayout";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                !isAuthenticated ? <Login /> : <Navigate to="/dashboard" />
              }
            />
          </Route>

          <Route element={<AppLayout />}>
            <Route
              path="/dashboard"
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
