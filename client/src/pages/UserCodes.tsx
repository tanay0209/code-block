import { useGetUserCodeQuery } from '@/redux/slices/apiSlice'
import CodeItem from './CodeItem'

function UserCodes() {
    const { data } = useGetUserCodeQuery()

    return (
        <>
            {data?.codes.length !== 0 ? <>
                <div className='p-3 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4'>
                    {data?.codes.map(currCode => <CodeItem
                        key={currCode._id}
                        codeSection={false}
                        title={currCode.title} id={currCode._id} />)}
                </div>
            </> : <p className='font-mono text-center text-3xl py-3'>You dont have any saved codes</p>}
        </>
    )
}

export default UserCodes