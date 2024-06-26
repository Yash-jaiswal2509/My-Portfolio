import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import Hero from "./components/Hero";
import Register from "./pages/Register";
import Login from "./pages/Login";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import AdminPanel from "./components/AdminPanel.tsx";
import Unauthorized from "./components/Unauthorized.tsx";
import PersistLogin from "./components/PersistLogin.tsx";
import AuthProvider from "./lib/AuthProvider.tsx";
import ProtectedRoute from "./lib/Protected-Route.tsx";
import AddProject from "./pages/Add-project.tsx";
import ProjectById from "./pages/ProjectById.tsx";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Public Routes */}
              <Route path="/" element={<Hero />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:projectId" element={<ProjectById />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Private Routes */}
              <Route element={<PersistLogin />}>
                <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                  <Route path="/admin" element={<AdminPanel />} />
                  <Route path="/admin/add-project" element={<AddProject />} />
                </Route>
                {/* Individual project route to be added */}
              </Route>
            </Route>

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
