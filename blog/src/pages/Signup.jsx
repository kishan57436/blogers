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
import React from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Link, useNavigate } from "react-router-dom"
import { RouteSign} from "@/components/helpers/RouterName"
import { getEnv } from "@/components/helpers/getenv"
import { showtoast } from "@/components/helpers/showtoast"
import Googlelogin from "@/components/Googlelogin"



const Signup= () => {


const navigate=useNavigate();

    const formSchema = z.object({

        name:z.string().min(3,'Name must be at least 3 charcter long.'),
        email: z.string().email(),
        password: z.string().min(8, 'password must be at least 8 charcter long'),
        confirmpassword:z.string().refine(data=>data.password===data.confirmpassword,'password should be same')
    })
   

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmpassword:"",
            name:""
        },
    })
  

    async function onSubmit(values) {

        try{
            

         
     
            
const response=await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/register`,{

    method:'post',
    headers:{'Content-type':'application/json'},
    // body:JSON.stringify(values)
    
    body: JSON.stringify(values)
})
console.log(response);
const data=await response.json();
if(!response.ok)
{
     return showtoast('error',data.message)

}
navigate(RouteSign);
showtoast('success',data.message)
        }
        catch(error)
        {
showtoast('error',error.message)
        }

       
    }
    return (
        <div className='flex justify-center items-center h-screen w-screen mehu1'>

            <Card className="w-[400px] p-5 mehu  text-white">
                <h1 className="text-2xl font bold text-center mb-5">Register into Account</h1>
                <div>
                    <Googlelogin/>
                    <div className="border my-5 flex justify-center items-center">
                        <span className="absolute  bg-white text-black">Or</span>
                    </div>
                </div>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">


                    <div className="mb-3">

<FormField
    control={form.control}
    name="name"
    render={({ field }) => (
        <FormItem>
            <FormLabel>Name</FormLabel>
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
                                            <Input  placeholder="Enter your Email Address" {...field} />
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
                                            <Input type="password" placeholder="Enter your password" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            please try to use special character ,number and character.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="mb-3">

<FormField
    control={form.control}
    name="confirmpassword"
    render={({ field }) => (
        <FormItem>
            <FormLabel>Confirmpassword</FormLabel>
            <FormControl>
                <Input type="password" placeholder="Enter your confirm password" {...field} />
            </FormControl>
            <FormDescription>
                please try to use special character ,number and character.
            </FormDescription>
            <FormMessage />
        </FormItem>
    )}
/>
</div>

<div className="mt-5">
<Button type="submit" className="w-full bg-red-500">Signup</Button>
<div className="mt-5 mb-5  flex justify-center items-center gap-2">
    <p>Already  have Account ?</p>
    <Link className="text-blue-500 hover:underline" to={RouteSign}>Signin</Link>
   
</div>

</div>



                        
                    </form>
                </Form>
            </Card>

        </div>
    )
}

export default Signup
