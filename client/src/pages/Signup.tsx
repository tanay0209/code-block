import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link } from "react-router-dom"


const LoginFormSchema = z.object({
    username: z.string(),
    password: z.string(),
    email: z.string().email()
})
function Signup() {
    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            username: "",
            password: "",
            email: ""
        }
    })

    const onSubmit = (values: z.infer<typeof LoginFormSchema>) => {
        console.log(values);

    }
    return (
        <div className='w-full h-[calc(100dvh-60px)] flex flex-col items-center justify-center'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 flex flex-col max-w-3xl w-1/3 backdrop-blur-md p-4 shadow-sm shadow-white rounded-md'>
                    <h3 className="text-3xl text-center font-bold">Signup</h3>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        className="w-full active:border-none" placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        className="w-full active:border-none" placeholder="Username" {...field} />
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
                                    <Input className="w-full" placeholder="Password" type='password' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="hover:text-white hover:bg-blue-500" type='submit'>Submit</Button>
                    <span className="text-center">Already have an account? <Link className="hover:underline" to="/login">Login</Link></span>
                </form>
            </Form>
        </div>
    )
}

export default Signup