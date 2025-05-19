import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Clients from "./pages/Clients";
import Tickets from "./pages/Tickets";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter key={token || "no-token"}>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/clients"
          element={
            <PrivateRoute>
              <Clients />
            </PrivateRoute>
          }
        />

        <Route
          path="/tickets"
          element={
            <PrivateRoute>
              <Tickets />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
