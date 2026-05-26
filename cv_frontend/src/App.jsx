import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
/*import Register from "./pages/Register";*/
import Contact from "./pages/Contact";
import Accueil from "./pages/Accueil";
import Projets from "./pages/Projets";
import Experiences from "./pages/Experiences";
import Formations from "./pages/Formations";
import Loisirs from "./pages/Loisirs";

// --- COMPOSANT DE PROTECTION DES ROUTES ---
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Vérifie si l'admin est connecté
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Routes Publiques */}
        <Route path="/" element={<Accueil />} />
          <Route path="/accueil" element={<Accueil />} />
          <Route path="/projets" element={<Projets />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/formations" element={<Formations />} />
          <Route path="/loisirs" element={<Loisirs />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/login" element={<Login />} />   
             {/* Route Admin Protégée */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Redirection si route inconnue */}
          <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
