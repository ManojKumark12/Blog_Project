import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import {z} from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card } from "./ui/card";
import { Googlelogin } from "./Googlelogin";
import { useDispatch } from "react-redux";
import { addUser } from "@/redux/user/user.Slice";
export const Signin=()=>{
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const formSchema=z.object({
    email:z.string().email(),
    password:z.string().min(7,"Password Must be 7 Characters!!")
  })
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:""
    },
  })
 async function onSubmit(values) {
  const response=await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/auth/login`,{
    method:'post',
    headers:{'Content-type':'application/json'},
    credentials:'include',
    body:JSON.stringify(values)
  });
  const body=await response.json();
   if(!response.ok){
   alert(body.message); 
   return;
    }
    dispatch(addUser(body.user));
   navigate('/');
   alert(body.message);
  
  return;
  }
  return(
    <div className="flex justify-center items-center h-screen w-screen ">
      <Card className="w-[25vw] h-[55vh]">
        <h1 className="text-2xl font-bold text-center">LogIn into Account</h1>

        <div className="w-full">
          
                          <Googlelogin />
                      <div>
                        OR
                      </div>
             </div>
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="p-2 space-y-2">
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
              <Input placeholder="Enter your password" {...field} />
            </FormControl>
            <FormDescription>
              We wont share your password with anyone.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" className="w-full">Submit</Button>
      <div className="text-center">
              Dont Have an account?<Link to="/signup" className="underline text-blue-400">Signup</Link>
        </div>
    </form>
  </Form>
  </Card>
  </div>
  )
}