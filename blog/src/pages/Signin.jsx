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
import { Routeindex, RouteSignup } from "@/components/helpers/RouterName"
import { getEnv } from "@/components/helpers/getenv"
import { showtoast } from "@/components/helpers/showtoast"
import Googlelogin from "@/components/Googlelogin"
import { useDispatch } from "react-redux"
import { setUser } from "@/redux/user/userslice"
import logo from '@/assests/images/logo-white.png'


const Signin = () => {
    const dispatch=useDispatch();

    const navigate=useNavigate();



    const formSchema = z.object({

        email: z.string().email(),
        password: z.string().min(8, 'password must be at least 8 charcter long')
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {

            email: "",
            password: ""
        },
    })
     async function onSubmit(values) {
        try{
            console.log(values)
           console.log("me andar aa gya huy");

            const response=await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/login`,{
                method:'post',
                headers:{'Content-type':'application/json'},
                credentials:'include',
                body:JSON.stringify(values)
            })
            
            const data= await response.json()
            console.log("data only print ho rha login me",data);
            console.log("let me print data",data.user)
            if(!response.ok)
            {
                return showtoast('error',data.message)
            }
            dispatch(setUser(data.user))
            showtoast('success','login successful')
            navigate(Routeindex);
           
        }
        catch(error)
        {
            showtoast('error',error.message)

        }

       
    }
    return (
        <div className='flex justify-center items-center h-screen w-screen mehu1 text-white'>

            <Card className="w-[400px] p-5  mehu text-white">
                <div className="flex justify-center items-center mb-2">
                <Link to={Routeindex}>
                <img src={logo}></img>
                </Link>
                </div>
               
                <h1 className="text-2xl font bold text-center mb-5">Login into Account</h1>
                <div>
                    <Googlelogin/>
                    <div className="border my-5 flex justify-center items-center">
                        <span className="absolute  bg-white text-black">Or</span>
                    </div>
                </div>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  text-white">
                        <div className="mb-3">

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your Email Address" className="text-white" {...field} />
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
                                        <FormDescription>
                                            please try to use special character ,number and character.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

<div className="mt-5">
<Button type="submit" className="w-full bg-red-500">Signin</Button>
<div className="mt-5 mb-5  flex justify-center items-center gap-2">
    <p>Dont have Account ?</p>
    <Link className="text-blue-500 hover:underline" to={RouteSignup}>Signup</Link>
</div>

</div>



                        
                    </form>
                </Form>
            </Card>

        </div>
    )
}

export default Signin
