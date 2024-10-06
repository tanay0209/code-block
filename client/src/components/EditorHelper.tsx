import { SaveIcon, Share2Icon } from 'lucide-react'
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
import { CompilerSliceStateType } from '@/Types'

function EditorHelper() {
    const dispatch = useDispatch()
    const currentLanguage = useSelector((state: RootState) => state.compilerSlice.currentLanguage)
    return (
        <div className='h-[50px] w-full flex justify-between p-2 bg-black text-white'>
            <div className='flex gap-2 items-center h-full'>
                <Button variant="ghost" size='icon'><SaveIcon /></Button>
                <Button variant="ghost" size='icon'><Share2Icon /></Button>
            </div>
            <div className='flex items-center justify-center gap-2'>
                <small>Language:</small>
                <Select
                    defaultValue={currentLanguage}
                    onValueChange={(value) => dispatch(updateCurrentLanguage(value as CompilerSliceStateType["currentLanguage"]))}>
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