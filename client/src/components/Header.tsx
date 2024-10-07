
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

function Header() {
    return (
        <div className='w-full h-[60px] flex items-center bg-gray-900 justify-between backdrop-blur-lg px-8 py-2'>
            <h3 className='text-2xl font-bold select-none'><Link to="/">CB</Link></h3>
            <ul className=' flex gap-3'>
                <Button variant="secondary">
                    <li>
                        <Link to="/compiler">Compiler</Link>
                    </li>
                </Button>
            </ul>
        </div>
    )
}

export default Header