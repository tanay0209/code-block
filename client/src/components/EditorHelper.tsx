import { Clipboard, Code2, Loader2, SaveIcon, Share2Icon } from 'lucide-react'
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
import { useSaveCodeMutation } from '@/redux/slices/apiSlice'
import { handleError } from '@/lib/utils'

function EditorHelper() {
    const dispatch = useDispatch()
    const currentLanguage = useSelector((state: RootState) => state.compilerSlice.currentLanguage)
    const code = useSelector((state: RootState) => state.compilerSlice.code)
    const navigator = useNavigate()
    const { id } = useParams()
    const [saveCode, { isLoading }] = useSaveCodeMutation()

    const handleSave = async () => {
        try {
            const response = await saveCode(code).unwrap()
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


    return (
        <div className='h-[50px] w-full flex justify-between p-2 bg-black text-white'>
            <div className='flex gap-2 items-center h-full'>
                <Button
                    disabled={isLoading}
                    onClick={handleSave}
                    variant="ghost"
                    size='icon'>{isLoading ? <Loader2 className=' animate-spin' /> : <SaveIcon />}</Button>
                {id && <Dialog>
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
                </Dialog>}


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