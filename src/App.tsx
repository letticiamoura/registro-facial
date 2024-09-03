import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import HomeAdmin from "./pages/admin/HomeAdmin";

export default function App() {
  return (
      <BrowserRouter basename="/registro-facial">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomeAdmin />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
  )
}
