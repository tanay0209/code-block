
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { handleError } from '@/lib/utils'
import { useLogoutMutation } from '@/redux/slices/apiSlice'
import { updateCurrentUser, updateIsLoggedIn } from '@/redux/slices/appSlice'
import { Loader2, Menu } from 'lucide-react'
import { updateCodeOwner } from '@/redux/slices/compilerSlice'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet'
import { useState } from 'react'
function Header() {
    const isLoggedIn = useSelector((state: RootState) => state.appSlice.isLoggedIn)
    const currentUser = useSelector((state: RootState) => state.appSlice.currentUser)
    const [logout, { isLoading }] = useLogoutMutation()
    const [sheetOpen, setSheetOpen] = useState<boolean>(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const windowWidth = useSelector((state: RootState) => state.appSlice.windowWidth)

    const handleLogout = async () => {
        try {
            await logout().unwrap()
            dispatch(updateCurrentUser({}))
            dispatch(updateIsLoggedIn(false))
            dispatch(updateCodeOwner(false))
            navigate("/")
        } catch (error) {
            handleError(error)
        }
    }

    const handleCloseSheet = () => {
        setSheetOpen(false)
    }

    return (
        <div className='w-full h-[60px] flex items-center bg-gray-900 justify-between backdrop-blur-lg px-8 py-2'>
            <h3 className='text-2xl font-bold select-none'><Link to="/">CB</Link></h3>
            {windowWidth > 640 ?
                <ul className=' flex gap-3'>
                    <li>
                        <Link to="/compiler">
                            <Button variant="secondary">
                                Compiler
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/codes">
                            <Button variant="secondary">
                                Codes
                            </Button>
                        </Link>
                    </li>

                    {!isLoggedIn &&
                        (<>

                            <li>
                                <Link to="/login">
                                    <Button variant="primary">
                                        Login
                                    </Button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/signup">
                                    <Button variant="outline">
                                        Signup
                                    </Button>
                                </Link>
                            </li>
                        </>)
                    }
                    {isLoggedIn && (
                        <>
                            <li>
                                <Link to="/user-codes">
                                    <Button variant="secondary">
                                        My Codes
                                    </Button>
                                </Link>
                            </li>
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
                </ul> :
                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="ghost">
                            <Menu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className='w-full '>
                        <SheetTitle />
                        <ul className='flex gap-3 flex-col w-full mt-4'>
                            <li>
                                <Link to="/compiler">
                                    <Button onClick={handleCloseSheet} className='w-full' variant="secondary">
                                        Compiler
                                    </Button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/codes">
                                    <Button onClick={handleCloseSheet} className='w-full' variant="secondary">
                                        Codes
                                    </Button>
                                </Link>
                            </li>

                            {!isLoggedIn &&
                                <>
                                    <li>
                                        <Link to="/login">
                                            <Button onClick={handleCloseSheet} className='w-full' variant="primary">
                                                Login
                                            </Button>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/signup">
                                            <Button onClick={handleCloseSheet} className='w-full' variant="outline">
                                                Signup
                                            </Button>
                                        </Link>
                                    </li>
                                </>
                            }
                            {isLoggedIn && (
                                <>
                                    <li>
                                        <Link to="/user-codes">
                                            <Button onClick={handleCloseSheet} className='w-full' variant="secondary">
                                                My Codes
                                            </Button>
                                        </Link>
                                    </li>
                                    <li>
                                        <Button className='w-full' disabled={isLoading} onClick={async () => {
                                            await handleLogout()
                                            handleCloseSheet()
                                        }} variant="ghost">
                                            {isLoading ? <Loader2 /> : <span>Logout</span>}
                                        </Button>
                                    </li>

                                </>
                            )}
                        </ul>
                    </SheetContent>
                </Sheet>
            }
        </div >
    )
}

export default Header