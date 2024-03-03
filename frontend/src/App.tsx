import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layout/layout"
import Hero from "./components/Hero"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Hero /></Layout>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
