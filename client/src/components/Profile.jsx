import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { IoCameraOutline } from "react-icons/io5";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSelector } from "react-redux"
import { useFetch } from "@/hooks/useFetch"
import { useEffect, useState } from "react"
import Dropzone from "react-dropzone";
import { addUser } from "@/redux/user/user.Slice";
// import from 
export const Profile = () => {
  const [filePreview, setPreview] = useState();
  const [file, setFile] = useState();
  const user = useSelector((state) => state.user);
  const { data: userData, loading, error } = useFetch(`${import.meta.env.VITE_API_BACKEND_URL}/user/get-user/${user.user._id}`, {
    method: 'get',
    credentials: 'include'
  });

  const formSchema = z.object({
    name: z.string().min(5, "Name Should be min 5 characters"),
    bio: z.string(),
    email: z.string().email(),

  })
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      bio: "",
      email: "",
      password: "",
    },
  })
  useEffect(() => {
    if (userData && userData.success) {
      form.reset(
        {
          name: userData.user.name,
          email: userData.user.email,
          bio: userData.user.bio,
        }
      )
    }

  }, [userData]);
  async function onSubmit(values) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('data', JSON.stringify(values));

      const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/user/update-user/${userData.user._id}`, {
        method: 'put',
        credentials: 'include',
        body: formData
      })
      const data = await response.json()
      if (!response.ok) {
        return alert('error', error.message);
      }
      if (data?.user?.avatar) {
        setPreview(data.user.avatar); // Cloudinary URL or static path
      }
      // dispatch(addUser(data.user))
      alert('success');
    } catch (error) {
      // showToast('error', error.message)
      return alert('error', error.message);
    }
  }
  if (!userData) {
    return (
      <div>Loading....</div>
    )
  }
  
  const handleSubmittedfile = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setPreview(preview);
  }
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card className="w-[50%]  flex flex-col justify-center content-center p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <Dropzone onDrop={acceptedFiles => handleSubmittedfile(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (

                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Avatar className="w-20 h-20 relative group overflow-hidden rounded-full">
                    <AvatarImage
                      src={filePreview || userData?.user?.avatar}
                      className="w-full h-full object-cover"
                    />
                    <AvatarFallback>
                      {userData?.user?.name?.[0] || "?"}
                    </AvatarFallback>
                    <div className="absolute z-50 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center bg-black bg-opacity-20 border-2 border-violet-500 rounded-full group-hover:flex hidden cursor-pointer">
                      <IoCameraOutline color="#7c3aed" />
                    </div>
                  </Avatar>

                </div>

              )}
            </Dropzone>



            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
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
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
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
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>


      </Card>

    </div>
  )
}