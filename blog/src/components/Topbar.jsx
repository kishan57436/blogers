import React, { useState } from 'react'
import viteLogo from '/vite.svg'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { AiOutlineLogin } from "react-icons/ai";
import Searchbox from './Searchbox';
import { RouteBlogAdd, Routeindex, RouteSign } from './helpers/RouterName';
import { useDispatch, useSelector } from 'react-redux';
import { CiUser } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { IoIosLogOut } from "react-icons/io";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getEnv } from './helpers/getenv';
import { showtoast } from './helpers/showtoast';
import { removeUser } from '@/redux/user/userslice';
import logos from '@/assests/images/logo-white.png'

import { IoMdSearch } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { useSidebar } from './ui/sidebar';

const Topbar = () => {
  const { toggleSidebar } = useSidebar()
  const dispatch=useDispatch();
 
  const logo="https://github.com/shadcn.png"
  const navigate=useNavigate();
  const [showSearch, setShowSearch] = useState(false)

  const toggleSearch = () => {
    setShowSearch(!showSearch)
}
  async  function handlelogout()
  {
    try{
      const response=await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/logout`,{
        method:'get',
       
        credentials:'include'
        
      })
      const data=await response.json()
      if(!response.ok)
      {
        return showtoast('error',data.message)
      }
      dispatch(removeUser())
      showtoast('success',data.message)
      navigate(Routeindex);

    }
    catch(error)
    {
      showtoast('error',error.message)

    }

  }
  const user=useSelector((state)=>state.user)
  console.log("topbar me user print ho rha ",user)
 
  return (
    <div className='flex justify-between items-center h-16 fixed w-full z-20 mehu1'>
   
   <div  className='flex justify-center items-center gap-2'>
   <button onClick={toggleSidebar} className='md:hidden' type='button'>
                    <AiOutlineMenu  className='text-white'/>
                </button>
    <Link to={Routeindex}>
    <img src={logos} className='w-48 ml-7 md:w-auto '></img>
    </Link>
    
   </div>
   <div className='w-[500px]'>
   <div className={`md:relative md:block absolute mehu left-0 w-full md:top-0 top-16 md:p-0 p-5 ${showSearch ? 'block' : 'hidden'}`}>
                   <Searchbox/>
                </div>
   </div>
   <div className='flex items-center gap-5'>
   <button onClick={toggleSearch} type='button' className='md:hidden block'>
                    <IoMdSearch size={25} className='text-white' />
                </button>
    { !user.isloggedIn?
      <Button className="rounded-full mr-2 items-center bg-red-500">
      <AiOutlineLogin />
        <Link  to={RouteSign}>
        sign
        </Link>
       
      </Button>:
      <DropdownMenu className=''>
      <DropdownMenuTrigger className='text-white bg-red-500 rounded'>
      <Avatar>
  <AvatarImage   src= { user?.user?.avatar||logos}/>

</Avatar>

      </DropdownMenuTrigger>
      <DropdownMenuContent className='mehu text-white'>
        <DropdownMenuLabel>
          <p>{user?.user?.name}</p>
          <p className='text-sm'>{user?.user?.email}</p>

        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile">
          <CiUser />
          Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
        <Link to={RouteBlogAdd}>
          < GoPlus/>
          Create Blog
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />


        <DropdownMenuItem  onClick={handlelogout}>
        
          < IoIosLogOut color='red' />
          Logout
         
        </DropdownMenuItem>
       
      </DropdownMenuContent>
    </DropdownMenu>
    
        
      
    }
  
   </div>




    </div>
  )
}

export default Topbar

