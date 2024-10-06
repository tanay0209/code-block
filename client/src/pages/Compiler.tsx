import CodeEditor from "@/components/CodeEditor"
import CodeView from "@/components/CodeView"
import EditorHelper from "@/components/EditorHelper"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

function Compiler() {
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