import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import {
    Table,
    TableBody,
   
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"




import { useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import moment from 'moment'


import { showtoast } from '@/components/helpers/showtoast'
import { RouteBlogAdd, RouteBlogEdit } from '@/components/helpers/RouterName'
import Loading from '@/components/Loading'
import { usefetch } from '@/hooks/usefetch'
import { getEnv } from '@/components/helpers/getenv'
import { deleteData } from '@/components/helpers/Handledelete'
const BlogDetails = () => {
    const [refreshData, setRefreshData] = useState(false)
    const { data: blogData, loading, error } = usefetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-all`, {
        method: 'get',
        credentials: 'include'
    }, [refreshData])
    console.log(blogData);

    const handleDelete = async(id) => {
        console.log("andar aa gya hu");
        const response = await deleteData(`${getEnv('VITE_API_BASE_URL')}/blog/delete/${id}`)
        if (response) {
            setRefreshData(!refreshData)
            showtoast('success', 'Data deleted.')
        } else {
            showtoast('error', 'Data not deleted.')
        }
    }
 

    if (loading) return <Loading />
    return (
        <div >
            <Card className="mehu text-white">
                <CardHeader>
                    <div>
                        <Button asChild className='bg-red-500'>
                            <Link to={RouteBlogAdd}>
                                Add Blog
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>

                        <TableHeader>
                            <TableRow>
                                <TableHead>Author </TableHead>
                                <TableHead>Category </TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Dated</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {blogData && blogData.blog?.length > 0 ?

                                blogData.blog.map(blog =>
                                    <TableRow key={blog._id}>
                                        <TableCell>{blog?.author?.name}</TableCell>
                                        <TableCell>{blog?.category?.name}</TableCell>
                                        <TableCell>{blog?.title}</TableCell>
                                        <TableCell>{blog?.slug}</TableCell>
                                        <TableCell>{moment(blog?.createdAt).format('DD-MM-YYYY')}</TableCell>
                                     
                                        <TableCell className="flex gap-3">
                                            <Button variant="outline" className="hover:bg-black hover:text-white bg-red-500" asChild>
                                                <Link to={RouteBlogEdit(blog._id)}>
                                                    <FiEdit />
                                                </Link>
                                            </Button>
                                            <Button onClick={() => handleDelete(blog._id)} variant="outline" className="hover:bg-black hover:text-white bg-red-500" >
                                                <FaRegTrashAlt />
                                            </Button>
                                        </TableCell>
                                    </TableRow>

                                )

                                :

                                <TableRow className='text-white'>
                                    <TableCell colSpan="3">
                                        Data not found.
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>

                </CardContent>
            </Card>
        </div>
    )
}

export default BlogDetails
