import { Card, CardContent } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import {
    Form,
    FormControl,
   
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { useForm } from 'react-hook-form'
import { getEnv } from '@/components/helpers/getenv'
import { showtoast } from '@/components/helpers/showtoast'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"
import { usefetch } from '@/hooks/usefetch'
import Loading from '@/components/loading'
import { IoCameraOutline } from "react-icons/io5";
import Dropzone from 'react-dropzone'
import { setUser } from '@/redux/user/userslice'
import { Routeindex } from '@/components/helpers/RouterName'
import {  useNavigate } from 'react-router-dom'


const Profile = () => {
    const navigate=useNavigate()
    const user=useSelector(state=>state.user)
    console.log("user ha profile me",user)
    const[filePreview,setPreview]=useState()
    const[file,setFile]=useState()
    const {data:userData,loading,error}=usefetch(`${getEnv('VITE_API_BASE_URL')}/user/get-user/${user?.user._id}`,{
        method:'get',credentials:'include'
    })
    console.log("USERDATA ha print ho rha ha",userData)
const dispatch=useDispatch()
    
        const formSchema = z.object({
             name:z.string().min(3,'Name must be at least 3 character long'),
            email: z.string().email(),
            bio:z.string().min(3,'bio must be atleast 3 character long'),
            
        })
    
        const form = useForm({
            resolver: zodResolver(formSchema),
            defaultValues: {
               name:"",
               bio:"",
                email: "",
                password: ""
            },
        })

        useEffect(() => {
            if (userData && userData.success) {
                form.reset({
                    name: userData.user.name,
                    email: userData.user.email,
                    bio: userData.user.bio,
                })
            }
        }, [userData])
    


     async function onSubmit(values) {
        try{
           const formData=new FormData();
           
           formData.append('file', file)
           formData.append('data', JSON.stringify(values))

            const response=await fetch(`${getEnv('VITE_API_BASE_URL')}/user/update-user/${userData?.user._id}`,{
                method:'put',
               
                credentials:'include',
                body:formData
            })
            
          

          
            if(!response.ok)
            {
                return showtoast('errror',data.message)
            }
            const data= await response.json()
            console.log("updated data",data)
            dispatch(setUser(data.user))
            showtoast('success','data updated successfuly')
            // navigate(Routeindex);
           
        }
        catch(error)
        {
            showtoast('error',error.message)

        }

       
    }


    const handleFileSelection = (files) => {
        const file = files[0]
        const preview = URL.createObjectURL(file)
        console.log(preview)
        setFile(file)
        setPreview(preview)
    }


    if(loading) return <div><Loading/></div>
  return (
 
     <Card className="max-w-screen-md mx-auto mehu text-white ">
        <CardContent>
        <div className='flex justify-center items-center'>

        <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Avatar className="w-28 h-28 relative group rounded-full">
                                    <AvatarImage src={filePreview ? filePreview : userData?.user?.avatar|| "https://github.com/shadcn.png"} className='w-28 h-28 rounded-full' />
                                    <div className='absolute z-50 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center bg-black bg-opacity-20 border-2 border-red-500 rounded-full group-hover:flex hidden cursor-pointer'>
                                        <IoCameraOutline color='#7c3aed' />
                                    </div>
                                </Avatar>
                            </div>
                        )}
                    </Dropzone>
        </div>

        <div>
            
           
        <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
                    <div className="mb-3">

<FormField
    control={form.control}
    name="name"
    render={({ field }) => (
        <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
                <Input placeholder="Enter your Name" {...field} />
            </FormControl>
            {/* <FormDescription>
This is your public display name.
</FormDescription> */}
            <FormMessage />
        </FormItem>
    )}
/>
</div>



                        <div className="mb-3">

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your Email Address" {...field} />
                                        </FormControl>
                                        {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="mb-3">

                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>BIO</FormLabel>
                                        <FormControl>
                                        <Textarea placeholder="Enter your bio" {...field} />
                                            
                                        </FormControl>
                                        {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>



                        <div className="mb-3">

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                        <Input placeholder="Enter your password" {...field} />
                                        </FormControl>
                                       
                                        
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit" className="w-full bg-red-500">Save changes</Button>



                        
                    </form>
                </Form>

        </div>
        </CardContent>
  
       

     </Card>
    
  )
}

export default Profile
