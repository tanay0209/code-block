import CodeEditor from "@/components/CodeEditor"
import CodeView from "@/components/CodeView"
import EditorHelper from "@/components/EditorHelper"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { updateEntireCode } from "@/redux/slices/compilerSlice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

function Compiler() {
    const { id } = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const fetchCode = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/compiler/get-code/${id}`)
            if (response.status != 200) {
                toast.error(response.data.message)
                navigate("/compiler")
                return
            }
            dispatch(updateEntireCode(response.data.code))
        } catch (error) {
            console.log("Error while fetching", error);
            navigate("/compiler")
            toast.error("Incorrect URL, switched to default editor")
        }
    }


    useEffect(() => {
        if (id) {
            fetchCode()
        }
    }, [id])
    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="w-full"
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