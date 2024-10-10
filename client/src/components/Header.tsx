
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { handleError } from '@/lib/utils'
import { useLogoutMutation } from '@/redux/slices/apiSlice'
import { updateCurrentUser, updateIsLoggedIn } from '@/redux/slices/appSlice'
import { Loader2 } from 'lucide-react'
function Header() {
    const isLoggedIn = useSelector((state: RootState) => state.appSlice.isLoggedIn)
    const currentUser = useSelector((state: RootState) => state.appSlice.currentUser)
    const [logout, { isLoading }] = useLogoutMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const handleLogout = async () => {
        try {
            await logout().unwrap()
            dispatch(updateCurrentUser({}))
            dispatch(updateIsLoggedIn(false))
            navigate("/")
        } catch (error) {
            handleError(error)
        }
    }

    return (
        <div className='w-full h-[60px] flex items-center bg-gray-900 justify-between backdrop-blur-lg px-8 py-2'>
            <h3 className='text-2xl font-bold select-none'><Link to="/">CB</Link></h3>
            <ul className=' flex gap-3'>
                <li>
                    <Button variant="secondary">
                        <Link to="/compiler">Compiler</Link>
                    </Button>
                </li>
                {!isLoggedIn &&
                    (<div className='flex gap-2 items-center'>
                        <li>
                            <Button variant="primary">
                                <Link to="/login">Login</Link>
                            </Button>
                        </li>
                        <li>
                            <Button variant="outline">
                                <Link to="/signup">Signup</Link>
                            </Button>
                        </li>
                    </div>)
                }
                {isLoggedIn && (
                    <>
                        <li>
                            <Button disabled={isLoading} onClick={handleLogout} variant="ghost">
                                {isLoading ? <Loader2 /> : <span>Logout</span>}
                            </Button>
                        </li>
                        <li className=''>
                            <div className='h-full capitalize cursor-pointer items-center flex justify-center font-bold rounded-full bg-white text-black w-10'>{currentUser.username?.slice(0, 2)}</div>
                        </li>
                    </>
                )}
            </ul>
        </div>
    )
}

export default Header