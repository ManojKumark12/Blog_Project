import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card } from "./ui/card";
import { Googlelogin } from "./Googlelogin";
export const Signup = () => {
const navigate=useNavigate();
    const formSchema = z.object({
        name:z.string().min(5,"Name Should be min 5 characters"),
        email: z.string().email(),
        password: z.string().min(7, "Password Must be 7 Characters!!"),
        confirmpassword:z.string().refine((data)=>data.password===data.confirmpassword,"Passwords donot match")
    })
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name:"",
            email: "",
            password: "",
            confirmpassword:""
        },
    })
    async function onSubmit(values) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        try{
        const response=await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/auth/register`,
            {
                method:'post',
                headers:{'Content-type':'application/json'},
                body:JSON.stringify(values)
            }
        )
        const data=await response.json();
        if(!response.ok){
        return alert(data.message);
        }
        navigate('/signin');
        alert('success');

    }
        catch(error){

        }
    }
    return (
        <div className="flex justify-center items-center h-screen w-screen ">
            <Card className="w-[25vw] h-[70vh]">
                <h1 className="text-2xl font-bold text-center">Create Your Account</h1>
                <div>
                    <Googlelogin />
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="p-2  space-y-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your email" {...field} />
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
                                        <Input type="password" placeholder="Enter your password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmpassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password"placeholder="Confirm Your Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full m-0.5">Submit</Button>
                        <div className="text-center">
                            Already Have An account?<Link to="/signin" className="underline text-blue-400">Signin</Link>
                        </div>
                    </form>
                </Form>
            </Card>
        </div>
    )
}