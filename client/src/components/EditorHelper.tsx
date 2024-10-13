import { Clipboard, Code2, Download, Loader2, PencilLine, SaveIcon, Share2Icon } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { updateCurrentLanguage } from '@/redux/slices/compilerSlice'
import { RootState } from '@/redux/store'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { useEditCodeMutation, useSaveCodeMutation } from '@/redux/slices/apiSlice'
import { handleError } from '@/lib/utils'
import { useState } from 'react'
import { Input } from './ui/input'


function EditorHelper() {
    const dispatch = useDispatch()
    const currentLanguage = useSelector((state: RootState) => state.compilerSlice.currentLanguage)
    const isOwner = useSelector((state: RootState) => state.compilerSlice.isOwner)
    const code = useSelector((state: RootState) => state.compilerSlice.code)
    const navigator = useNavigate()
    const { id } = useParams()
    const [saveCode, { isLoading }] = useSaveCodeMutation()
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState<string>("My Code");
    const [editCode, { isLoading: editLoading }] = useEditCodeMutation()

    const handleCodeDownload = () => {
        setLoading(true)
        if (code.html === "" && code.css === "" && code.javascript === "") {
            toast.error("Code files are empty")
            return
        }

        const htmlCode = new Blob([code.html], { type: "text/html" })
        const cssCode = new Blob([code.css], { type: "text/css" })
        const javascriptCode = new Blob([code.javascript], { type: "text/javascript" })


        const htmlLink = document.createElement('a')
        const cssLink = document.createElement('a')
        const javascriptLink = document.createElement('a')

        htmlLink.href = URL.createObjectURL(htmlCode)
        htmlLink.download = "index.html"
        document.body.appendChild(htmlLink)


        cssLink.href = URL.createObjectURL(cssCode)
        cssLink.download = "style.css"
        document.body.appendChild(cssLink)


        javascriptLink.href = URL.createObjectURL(javascriptCode)
        javascriptLink.download = "script.js"
        document.body.appendChild(javascriptLink)


        if (code.html !== "") {
            htmlLink.click()
        }

        if (code.css !== "") {
            cssLink.click()
        }
        if (code.javascript !== "") {
            javascriptLink.click()
        }

        document.body.removeChild(htmlLink)
        document.body.removeChild(cssLink)
        document.body.removeChild(javascriptLink)
        setLoading(false)
        toast.success("Code downloaded successfully")
    }

    const handleSave = async () => {
        const body = { code: code, title: title }
        try {
            const response = await saveCode(body).unwrap()
            toast.success("Code saved successfully")
            navigator(`/compiler/${response.id}`, { replace: true })
        } catch (error: any) {
            handleError(error)
        }
    }

    const copyToClipboard = () => {
        window.navigator.clipboard.writeText(window.location.href)
        toast.success("Link copied successfully")
    }

    const handleEdit = async () => {
        try {
            if (!id) return
            const body = { id: id, body: code }
            await editCode(body).unwrap()
            toast.success("Code updated succesfully")
        } catch (error) {
            handleError(error)
        }

    }


    return (
        <div className='h-[50px] w-full flex justify-between p-2 bg-black text-white'>
            <div className='flex gap-2 items-center h-full'>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="icon" variant="ghost">
                            <SaveIcon />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className='flex items-center gap-2 justify-center'><Code2 />Give a title to your code</DialogTitle>
                            <DialogDescription />
                            <div className='flex w-full items-center gap-2 my-2'>
                                <Input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    placeholder='Enter your code title'
                                />
                                <Button
                                    onClick={handleSave}
                                    variant="ghost" size="icon">{isLoading ? <><Loader2 /></> :
                                        <><SaveIcon />
                                        </>}
                                </Button>
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <Button
                    disabled={loading}
                    onClick={handleCodeDownload}
                    variant="ghost"
                    size='icon'>{loading ? <Loader2 className=' animate-spin' /> : <Download />}</Button>
                {id &&
                    <>
                        {isOwner &&
                            <Button disabled={editLoading} onClick={handleEdit} size="icon" variant="ghost">
                                <PencilLine />
                            </Button>
                        }
                        <Dialog>
                            <DialogTrigger>
                                <Share2Icon
                                    className='hover:bg-accent p-2 rounded-md hover:text-accent-foreground'
                                    size={40} />
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className='flex items-center gap-2 justify-center'><Code2 />Share your code</DialogTitle>
                                    <DialogDescription />
                                    <div>
                                        <div className='flex w-full items-center gap-2 my-2'>
                                            <input
                                                disabled
                                                value={window.location.href}
                                                type="text"
                                                className='bg-slate-700 w-full rounded text-gray-300 p-2' />
                                            <Button variant="ghost" size="icon">
                                                <Clipboard
                                                    className='cursor-pointer'
                                                    onClick={copyToClipboard}
                                                />
                                            </Button>
                                        </div>
                                        Share this url with your friend
                                    </div>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </>
                }


            </div>
            <div className='flex items-center justify-center gap-2'>
                <small>Language:</small>
                <Select
                    defaultValue={currentLanguage}
                    onValueChange={(value) => dispatch(updateCurrentLanguage(value as ICompilerSliceState["currentLanguage"]))}>
                    <SelectTrigger className="w-[120px] h-8">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="html">HTML</SelectItem>
                        <SelectItem value="css">CSS</SelectItem>
                        <SelectItem value="javascript">Javascript</SelectItem>
                    </SelectContent>
                </Select>
            </div>

        </div >
    )
}

export default EditorHelper