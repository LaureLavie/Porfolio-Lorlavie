import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import Accueil from "./pages/Accueil";
import Projets from "./pages/Projets";
import Experiences from "./pages/Experiences";
import Formations from "./pages/Formations";
import Loisirs from "./pages/Loisirs";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/accueil" element={<Accueil />} />
          <Route path="/projets" element={<Projets />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/formations" element={<Formations />} />
          <Route path="/loisirs" element={<Loisirs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
