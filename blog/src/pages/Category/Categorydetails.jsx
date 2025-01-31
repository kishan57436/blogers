import { Routeaddcategory, Routeeditcategory } from '@/components/helpers/RouterName'
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
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { usefetch } from '@/hooks/usefetch'
import { getEnv } from '@/components/helpers/getenv'
import Loading from '@/components/Loading'
import { useState } from 'react'
import { deleteData } from '@/components/helpers/Handledelete.js'
import { showtoast } from '@/components/helpers/showtoast'







const Categorydetails = () => {

    const [refreshData, setRefreshData] = useState(false)

    const { data: categoryData, loading, error } = usefetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`, {
        method: 'get',
        credentials: 'include'
    }, [refreshData])

  

    const handleDelete = async(id) => {
        console.log("me andar aa gya hu")
        const response = await deleteData(`${getEnv('VITE_API_BASE_URL')}/category/delete/${id}`)
        if (response) {
            setRefreshData(!refreshData)
            showtoast('success', 'Data deleted.')
        } else {
            showtoast('error', 'Data not deleted.')
        }
    }

    if (loading) {
        <Loading />
    }




    return (
        <div>
            <Card className="mehu text-white">
                <CardHeader>
                    <div>
                        <Button asChild className="bg-red-500">
                            <Link to={Routeaddcategory}>
                                Add Category
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>

                        <TableHeader>
                            <TableRow>
                                <TableHead>Category </TableHead>
                                <TableHead>Slug </TableHead>

                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categoryData && categoryData.category.length > 0 ?

                                categoryData.category.map(category =>
                                    <TableRow key={category._id}>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>{category.slug}</TableCell>
                                        <TableCell className="flex gap-3">
                                            <Button variant="outline" className="hover:bg-black hover:text-white bg-red-500" asChild>
                                                <Link to={Routeeditcategory(category._id)}>
                                                    <FiEdit />
                                                </Link>
                                            </Button>
                                            <Button onClick={() => handleDelete(category._id)} variant="outline" className="hover:bg-black hover:text-white bg-red-500" >
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

export default Categorydetails
