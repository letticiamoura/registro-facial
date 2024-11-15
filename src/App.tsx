import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import HomeAdmin from "./pages/admin/HomeAdmin";
import Students from "./pages/admin/Students";
import Teacher from "./pages/admin/Teacher";
import StudentEdit from "./pages/admin/StudentEdit";
import StudentRegister from "./pages/admin/PersonRegister";
import Relatorio from "./pages/admin/Relatorios";
import Group from "./pages/admin/Group";

export default function App() {
  return (
      <BrowserRouter basename="/registro-facial">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/register" element={<Register />} />
          <Route path="/students" element={<Students />} />
          <Route path="/home" element={<HomeAdmin />} />
          <Route path="/edit/:id" element={<StudentEdit />} />
          <Route path="/cadastro" element={<StudentRegister name=""/>} />
          
          <Route path="/relatorio" element={<Relatorio />} />
          <Route path="/group" element={<Group />} />
          
          <Route path="/teacher/:id" element={<StudentEdit />} />
          <Route path="/cadastroteacher" element={<StudentRegister name="/"/>} />
        </Routes>
      </BrowserRouter>
  )
}
