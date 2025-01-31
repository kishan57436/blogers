import { getEnv } from '@/components/helpers/getenv'
import { showtoast } from '@/components/helpers/showtoast'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'
import { z } from 'zod'

const Addcategory = () => {

    const formSchema = z.object({
        name: z.string().min(3, 'Name must be at least 3 character long.'),
        slug: z.string().min(3, 'Slug must be at least 3 character long.'),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            slug: '',
        },
    })

    const categoryName = form.watch('name')

    useEffect(() => {
        if (categoryName) {
            const slug = slugify(categoryName, { lower: true })
            form.setValue('slug', slug)
        }
    }, [categoryName])


     async function onSubmit(values) {
    
            try{
                
    
             
         
                
    const response=await fetch(`${getEnv('VITE_API_BASE_URL')}/category/add`,{
    
        method:'post',
        credentials:'include',
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
   // navigate(RouteSign);
   form.reset();
    showtoast('success',data.message)
            }
            catch(error)
            {
    showtoast('error',error.message)
            }
    
           
        }


  return (
    <div>
            <Card className="pt-5 max-w-screen-md mx-auto mehu text-white">
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}  >
                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="slug"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Slug</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Slug" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button type="submit" className="w-full bg-red-500">Submit</Button>
                        </form>
                    </Form>

                </CardContent>
            </Card>

        </div>
  )
}

export default Addcategory
