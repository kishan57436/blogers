import React, { useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import slugify from 'slugify'


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import Dropzone from 'react-dropzone'

// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

import { usefetch } from '@/hooks/usefetch'
import { getEnv } from '@/components/helpers/getenv'
import { showtoast } from '@/components/helpers/showtoast'
import Editor from '@/components/Editor'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RouteBlog } from '@/components/helpers/RouterName'
import { decode } from 'entities'
import Loading from '@/components/Loading'

const EditBlog = () => {
    const navigate = useNavigate()
    const {blogid}=useParams()
    console.log(blogid)
    const user = useSelector((state) => state.user)
  
    const { data: blogData, loading, error } = usefetch(`${getEnv('VITE_API_BASE_URL')}/blog/edit/${blogid}`, {
        method: 'get',
        credentials: 'include'
    }, [blogid])
   

    const { data: categoryData } = usefetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`, {
        method: 'get',
        credentials: 'include'
    })



    const [filePreview, setPreview] = useState()
    const [file, setFile] = useState()

    const formSchema = z.object({
        category: z.string().min(3, 'Category must be at least 3 character long.'),
        title: z.string().min(3, 'Title must be at least 3 character long.'),
        slug: z.string().min(3, 'Slug must be at least 3 character long.'),
        blogContent: z.string().min(3, 'Blog content must be at least 3 character long.'),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category: '',
            title: '',
            slug: '',
            blogContent: '',
        },
    })
    useEffect(() => {
        if (blogData) {
            setPreview(blogData.blog.featuredImage)
            form.setValue('category', blogData.blog.category._id)
            form.setValue('title', blogData.blog.title)
           
            form.setValue('slug', blogData.blog.slug)
            form.setValue('blogContent',decode(blogData.blog.blogContent))
        }
    }, [blogData])

      
    console.log( blogData?.blog?.blogContent)
  
    const handleEditorData = (event, editor) => {
        const data = editor.getData()
        console.log(data);
        form.setValue('blogContent', data)
    }


    const blogTitle = form.watch('title')

    useEffect(() => {
        if (blogTitle) {
            const slug = slugify(blogTitle, { lower: true })
            form.setValue('slug', slug)
        }
    }, [blogTitle])

    async function onSubmit(values) {
console.log(values)

        try {
          
            // if (!file) {
            //     showtoast('error', 'Feature image required.')
            // }

            const formData = new FormData()
            formData.append('file', file)

            // this way you do it without this problem you cnat do it we are trying to solved htis question  this way we doint not have to solved
            
            formData.append('data', JSON.stringify(values))

            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/blog/updates/${blogid}`, {
                method: 'put',
                credentials: 'include',
                body: formData
            })
            const data = await response.json()
            if (!response.ok) {
                return showtoast('error', data.message)
            }
            form.reset()
            setFile()
            setPreview()
            navigate(RouteBlog)
            showtoast('success', data.message)
        } catch (error) {
            showtoast('error', error.message)
        }
    }

    const handleFileSelection = (files) => {
        const file = files[0]
        const preview = URL.createObjectURL(file)
        setFile(file)
        setPreview(preview)
    }
if(loading)
{
    <Loading/>
}
    return (
        <div>
            <Card className="pt-5 mehu text-white">
                <CardContent>
                    <h1 className='text-2xl font-bold mb-4'>Edit Blog</h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}  >
                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (

                                        <FormItem>

                                            <FormLabel>Category</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger  >
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent className='mehu text-white'>
                                                    {categoryData && categoryData.category.length > 0 &&
                                                            categoryData.category.map(category => <SelectItem key={category._id} value={category._id}>{category.name}</SelectItem>)
                                                        }


                                                    </SelectContent>
                                                </Select>

                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter blog title" {...field} />
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
                            <div className='mb-3'>
                                <span className='mb-2 block'>Featured Image</span>
                                <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
                                    {({ getRootProps, getInputProps }) => (
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <div className='flex justify-center items-center w-36 h-28 border-2 border-dashed rounded'>
                                                <img src={filePreview} />
                                            </div>
                                        </div>
                                    )}
                                </Dropzone>
                            </div>
                            <div className='mb-3 mehu'>

                                <FormField
                                    control={form.control}
                                    name="blogContent"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Blog Content</FormLabel>
                                            <FormControl >
                                                <Editor  props={{ initialData: field.value, onChange: handleEditorData }} />
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

export default EditBlog