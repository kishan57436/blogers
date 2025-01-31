import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import React, { useState } from 'react'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import Loading from '@/components/Loading'

import { FaRegTrashAlt } from "react-icons/fa";


import usericon from '@/assests/images/user.png'
import moment from 'moment'
import { getEnv } from '@/components/helpers/getenv'
import { usefetch } from '@/hooks/usefetch'
import { showtoast } from '@/components/helpers/showtoast'
import { deleteData } from '@/components/helpers/Handledelete'
const User = () => {
    const [refreshData, setRefreshData] = useState(false)
    const { data, loading, error } = usefetch(`${getEnv('VITE_API_BASE_URL')}/user/get-all-user`, {
        method: 'get',
        credentials: 'include'
    }, [refreshData])

    const handleDelete = async (id) => {
        const response = await deleteData(`${getEnv('VITE_API_BASE_URL')}/user/delete/${id}`)
        if (response) {
            setRefreshData(!refreshData)
            showtoast('success', 'Data deleted.')
        } else {
            showtoast('error', 'Data not deleted.')
        }
    }

    console.log(data)


    if (loading) return <Loading />
    return (
        <div>
            <Card className="mehu text-white">

                <CardContent>
                    <Table>

                        <TableHeader>
                            <TableRow>
                                <TableHead>Role </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Avatar</TableHead>
                                <TableHead>Dated</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data && data.user.length > 0 ?

                                data.user.map(user =>
                                    <TableRow key={user._id}>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <img src={user.avatar || usericon} className='w-10' />
                                        </TableCell>
                                        <TableCell>{moment(user.createdAt).format('DD-MM-YYYY')}</TableCell>

                                        <TableCell className="flex gap-3">

                                            <Button onClick={() => handleDelete(user._id)} variant="outline" className="hover:bg-black hover:text-white bg-red-500" >
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

export default User