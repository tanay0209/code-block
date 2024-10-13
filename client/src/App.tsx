import Header from "./components/Header"
import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from "sonner"
import { useGetUserDetailsQuery } from "./redux/slices/apiSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { updateCurrentUser, updateIsLoggedIn, updateWindowWidth } from "./redux/slices/appSlice"
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
  }, [data, error, dispatch])

  useEffect(() => {
    const handleResize = () => {
      dispatch(updateWindowWidth(window.innerWidth))
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [dispatch])

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
