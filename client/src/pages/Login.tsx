import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from "react-router-dom"
import { useLoginMutation } from "@/redux/slices/apiSlice"
import { handleError } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { useDispatch } from "react-redux"
import { updateCurrentUser, updateIsLoggedIn } from "@/redux/slices/appSlice"

const LoginFormSchema = z.object({
    userId: z.string(),
    password: z.string()
})

function Login() {
    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            userId: "",
            password: ""
        }
    })


    const onLogin = async (values: z.infer<typeof LoginFormSchema>) => {
        try {
            const response = await login(values).unwrap()
            dispatch(updateCurrentUser(response))
            dispatch(updateIsLoggedIn(true))
            navigate("/")
        } catch (error) {
            handleError(error)
        }

    }

    return (
        <div className='w-full h-[calc(100dvh-60px)] flex items-center justify-center'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onLogin)} className='space-y-4 flex flex-col p-2 mx-3 w-full sm:w-1/2 backdrop-blur-md  shadow-sm shadow-white rounded-md'>
                    <h3 className="text-3xl text-center font-bold">Login</h3>
                    <FormField
                        control={form.control}
                        name="userId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username/Email</FormLabel>
                                <FormControl>
                                    <Input
                                        required
                                        className="w-full active:border-none" placeholder="username/email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        required
                                        className="w-full" placeholder="Password" type='password' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="hover:text-white hover:bg-blue-500" type='submit'>{isLoading ? <><Loader2 /></> : <span>Submit</span>}</Button>
                    <span className="text-center">New User? <Link className="hover:underline" to="/signup">Signup</Link></span>
                </form>
            </Form>
        </div>
    )
}

export default Login