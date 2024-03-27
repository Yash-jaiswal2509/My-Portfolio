import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import Hero from "./components/Hero";
import Register from "./pages/Register";
import Login from "./pages/Login";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import AuthProvider from "./AuthProvider.tsx";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Hero />
                </Layout>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/about"
              element={
                <Layout>
                  <About />
                </Layout>
              }
            />
            <Route
              path="/projects"
              element={
                <Layout>
                  <AuthProvider>
                    <Projects />
                  </AuthProvider>
                </Layout>
              }
            />
            <Route
              path="/contact"
              element={
                <Layout>
                  <Contact />
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
