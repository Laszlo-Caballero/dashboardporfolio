import { Route, Routes } from "react-router";
import "./index.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ProtecterRoute from "./Components/Shared/ProtecterRoute/ProtecterRoute";
import Login from "./Pages/Login/Login";
function App() {
  return (
    <div className="flex min-h-screen w-full">
      <Routes>
        <Route
          path="/*"
          element={
            <ProtecterRoute>
              <Dashboard />
            </ProtecterRoute>
          }
        />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
