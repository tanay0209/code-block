import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Compiler from "./pages/Compiler"
import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from "sonner"
function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compiler" element={<Compiler />} />
          <Route path="/compiler/:id" element={<Compiler />} />
        </Routes>
        <Toaster />
      </ThemeProvider>
    </>
  )
}

export default App
