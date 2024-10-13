import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useDeleteCodeMutation } from '@/redux/slices/apiSlice'
import { handleError } from '@/lib/utils'
import { toast } from 'sonner'

interface CodeItemProps {
    title: string,
    id: string,
    author?: string,
    codeSection: boolean
}

function CodeItem({ title, id, author, codeSection }: CodeItemProps) {
    const [deleteCode, { isLoading }] = useDeleteCodeMutation()

    const handleDelete = async () => {
        try {
            await deleteCode(id).unwrap()
            toast.success("Code deleted")
        } catch (error) {
            handleError(error)
        }
    }

    return (
        <div
            className='p-3 rounded bg-slate-900 flex flex-col gap-2'>
            <div className='flex flex-col gap-2'>
                <p className='font-mono font-bold text-lg'>{title}</p>
                {codeSection && <p className='text-sm text-foreground'>Author: {author}</p>}
            </div>
            <Separator />
            <div className='flex gap-2 items-center'>
                <Link
                    target='_blank'
                    to={`/compiler/${id}`}>
                    <Button
                        variant="secondary"
                    >
                        Open Code
                    </Button>
                </Link>
                {!codeSection &&
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button size="icon" variant="ghost">
                                <Trash2 />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    disabled={isLoading}
                                    onClick={handleDelete}>Confirm</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                }
            </div>
        </div>
    )
}

export default CodeItem