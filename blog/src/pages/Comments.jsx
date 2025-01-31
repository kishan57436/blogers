import { Button } from '@/components/ui/button'
import { Card, CardContent} from '@/components/ui/card'
 
import React, { useState } from 'react'

import {
    Table,
    TableBody,

    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import Loading from '@/components/Loading'

import { FaRegTrashAlt } from "react-icons/fa";


import { getEnv } from '@/components/helpers/getenv'
import { usefetch } from '@/hooks/usefetch'
import { showtoast } from '@/components/helpers/showtoast'
import { deleteData } from '@/components/helpers/Handledelete'

const Comments = () => {
    const [refreshData, setRefreshData] = useState(false)
    const { data, loading, error } = usefetch(`${getEnv('VITE_API_BASE_URL')}/comment/get-all-comment`, {
        method: 'get',
        credentials: 'include'
    }, [refreshData])
    console.log("kya ha data",data);

    const handleDelete = async (id) => {
        const response = await deleteData(`${getEnv('VITE_API_BASE_URL')}/comment/delete/${id}`)
        if (response) {
            setRefreshData(!refreshData)
            showtoast('success', 'Data deleted.')
        } else {
            showtoast('error', 'Data not deleted.')
        }
    }



    if (loading) return <Loading />
    return (
        <div>
          
            <Card className="mehu text-white">

                <CardContent>
                    <Table>


                        <TableHeader>
                            <TableRow>
                                <TableHead>Blog </TableHead>
                                <TableHead>Comented By</TableHead>
                                <TableHead>Comment</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data && data?.comments?.length > 0 ?

                                data.comments.map(comment =>
                                    <TableRow key={comment._id}>
                                        <TableCell>{comment?.blogid?.title}</TableCell>
                                        <TableCell>{comment?.user?.name}</TableCell>
                                        <TableCell>{comment?.comment}</TableCell>

                                        <TableCell className="flex gap-3">

                                            <Button onClick={() => handleDelete(comment._id)} variant="outline" className="hover:bg-black hover:text-white bg-red-500" >
                                                <FaRegTrashAlt />
                                            </Button>
                                        </TableCell>
                                    </TableRow>

                                )

                                :

                                <TableRow className="text-white">
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

export default Comments