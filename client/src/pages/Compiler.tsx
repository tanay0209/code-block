import CodeEditor from "@/components/CodeEditor"
import CodeView from "@/components/CodeView"
import EditorHelper from "@/components/EditorHelper"
import Loader from "@/components/Loader"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { handleError } from "@/lib/utils"
import { useGetCodeMutation } from "@/redux/slices/apiSlice"
import { updateCodeOwner, updateEntireCode } from "@/redux/slices/compilerSlice"
import { RootState } from "@/redux/store"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

function Compiler() {
    const { id } = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [getCode, { isLoading }] = useGetCodeMutation()
    const windowWidth = useSelector((state: RootState) => state.appSlice.windowWidth)
    const fetchCode = async () => {
        try {
            const response = await getCode(id!).unwrap()
            dispatch(updateEntireCode(response.code))
            dispatch(updateCodeOwner(response.isOwner))
        } catch (error: any) {
            handleError(error)
            navigate("/compiler")
        }
    }

    useEffect(() => {
        if (id) {
            fetchCode()
        }
    }, [id])

    {
        isLoading &&
            <div className="w-full h-[calc(100dvh-60px)] flex items-center justify-center bg-black">
                <Loader />
            </div>
    }

    return (
        <ResizablePanelGroup
            direction={windowWidth > 640 ? "horizontal" : "vertical"}
            className="w-full !h-[calc(100dvh-60px)]"
        >
            <ResizablePanel defaultSize={50} className="h-[calc(100dvh-60px)] min-w-[350px]" >
                <EditorHelper />
                <CodeEditor />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50} className="h-[calc(100dvh-60px)] min-w-[350px]" >
                <CodeView />
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default Compiler