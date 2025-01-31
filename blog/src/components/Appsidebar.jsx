import React from 'react'
import viteLogo from '/vite.svg'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { Link } from 'react-router-dom'
import { CiHome } from "react-icons/ci";
import { BiCategory } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { LiaBlogSolid } from "react-icons/lia";
import { GoDot } from "react-icons/go";

import { RouteBlog, RouteBlogbycategory, Routecategorydetails, RouteCommentDetails, Routeindex, RouteUser } from './helpers/RouterName';
import { usefetch } from '@/hooks/usefetch';
import { getEnv } from './helpers/getenv';
import { useSelector } from 'react-redux';
const Appsidebar = () => {
   

const user=useSelector(state=>state.user)
     const { data: categoryData } = usefetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`, {
            method: 'get',
            credentials: 'include'
        })

        console.log("app side bar me",categoryData)

  return (
    <div  className='border-4 '>
        <Sidebar className='mt-10'>
      <SidebarHeader  className=" bg-white "/>
 {/* <img src={logo} className='w-[40px] ml-7'></img> */}
      <SidebarContent className="bg-white mehu1 text-white">
       <SidebarGroup>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton>
                <CiHome />
                    <Link to={Routeindex}>Home</Link>
                </SidebarMenuButton>

             
            </SidebarMenuItem>
{/* 
            //////// */}
            {user && user.isloggedIn
                            ? <>
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <LiaBlogSolid />
                                        <Link to={RouteBlog}>Blogs</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <FaRegComment  />
                                        <Link to={RouteCommentDetails}>Comments</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </>
                            :
                            <></>
                        }
                        {user && user?.isloggedIn && user?.user?.role === 'admin'
                            ? <>
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <BiCategory  />
                                        <Link to={Routecategorydetails}>Categories</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <FaRegUser />
                                        <Link to={RouteUser}>Users</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </>
                            :
                            <></>
                        }

                    </SidebarMenu>
                </SidebarGroup>

{/* //////// */}
       <SidebarGroup>
        <SidebarGroupLabel className="text-white">
            Categories
        </SidebarGroupLabel>
        <SidebarMenu>
           
        {
                categoryData&& categoryData.category.length>0 && categoryData.category.map(category=>
                    <SidebarMenuItem key={category._id}>
                <SidebarMenuButton>
                <GoDot />
                    <Link to={RouteBlogbycategory(category.slug)}> {category.name}</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
                )
            }
           
        </SidebarMenu>
       </SidebarGroup>
       
      </SidebarContent>
      
    </Sidebar>
      
    </div>
  )
}

export default Appsidebar
