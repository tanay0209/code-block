import { useGetAllCodesQuery } from "@/redux/slices/apiSlice"
import CodeItem from "./CodeItem"

function Codes() {
    const { data } = useGetAllCodesQuery()
    return (
        <>
            {data?.codes.length !== 0 ? <>
                <div className='p-3 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4'>
                    {data?.codes.map(currCode => <CodeItem
                        key={currCode._id}
                        codeSection={true}
                        title={currCode.title} author={currCode.username} id={currCode._id} />)}
                </div>
            </> : <p className='font-mono text-center text-3xl'>No codes to see, try again later!</p>}
        </>
    )
}

export default Codes
