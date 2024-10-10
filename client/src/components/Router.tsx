import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loader from './Loader'
const Home = lazy(() => import("@/pages/Home"))
const Login = lazy(() => import("@/pages/Login"))
const Signup = lazy(() => import("@/pages/Signup"))
const Compiler = lazy(() => import("@/pages/Compiler"))
const Codes = lazy(() => import("@/pages/Codes"))
const UserCodes = lazy(() => import("@/pages/UserCodes"))


function Router() {
    return (
        <Suspense fallback={
            <div className='w-full h-[calc(100dvh-60px)] flex justify-center items-center'>
                <Loader />
            </div>
        }>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/compiler/:id?" element={<Compiler />} />
                <Route path="/codes" element={<Codes />} />
                <Route path="/user-codes" element={<UserCodes />} />
            </Routes>
        </Suspense>
    )
}

export default Router