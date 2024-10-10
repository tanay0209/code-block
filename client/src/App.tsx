import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Compiler from "./pages/Compiler"
import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from "sonner"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import { useGetUserDetailsQuery } from "./redux/slices/apiSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { updateCurrentUser, updateIsLoggedIn } from "./redux/slices/appSlice"
function App() {
  const { data, error } = useGetUserDetailsQuery()
  const dispatch = useDispatch()
  useEffect(() => {
    if (data) {
      dispatch(updateCurrentUser(data))
      dispatch(updateIsLoggedIn(true))
    } else if (error) {
      dispatch(updateCurrentUser({}))
      dispatch(updateIsLoggedIn(false))
    }
  }, [data, error])
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/compiler/:id?" element={<Compiler />} />
        </Routes>
        <Toaster />
      </ThemeProvider>
    </>
  )
}

export default App
