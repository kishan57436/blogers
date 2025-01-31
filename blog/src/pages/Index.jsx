import Blogcard from '@/components/Blogcard'
import { getEnv } from '@/components/helpers/getenv'
import Loading from '@/components/Loading'
import { usefetch } from '@/hooks/usefetch'


import React from 'react'

const Index = () => {
    const { data: blogData, loading, error } = usefetch(`${getEnv('VITE_API_BASE_URL')}/blog/blogs`, {
        method: 'get',
        credentials: 'include'
    })
    console.log(blogData)
   
    if (loading) return <Loading />
    return (
        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
            {blogData && blogData.blog.length > 0
                ?
                blogData.blog.map(blog => <Blogcard key={blog._id} props={blog} />)
                :
                <div className='text-white'>Data Not Found.</div>
            }
        </div>
    )
}

export default Index