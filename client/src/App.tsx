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
import Router from "./components/Router"
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
        <Router />
        <Toaster />
      </ThemeProvider>
    </>
  )
}

export default App
