import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [page, setPage] = useState(
    localStorage.getItem("token") ? "dashboard" : "login"
  );

  const logout = () => {
    localStorage.removeItem("token");
    setPage("login");
  };

  if (page === "dashboard" && localStorage.getItem("token")) {
    return (
      <div>
        <Dashboard />
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    );
  }

  if (page === "register") {
    return (
      <div>
        <Register />

        <p style={{ textAlign: "center" }}>
          Already have an account?{" "}
          <button onClick={() => setPage("login")}>
            Login
          </button>
        </p>
      </div>
    );
  }

  return (
    <div>
      <Login />

      <p style={{ textAlign: "center" }}>
        Don't have an account?{" "}
        <button onClick={() => setPage("register")}>
          Register
        </button>
      </p>
    </div>
  );
}

export default App; 