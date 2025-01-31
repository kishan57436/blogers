


import React, { useEffect, useState } from 'react'
import { FaRegHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { FaHeart } from "react-icons/fa";

import { usefetch } from '@/hooks/usefetch';
import { showtoast } from './helpers/showtoast';
import { getEnv } from './helpers/getenv';
import { useNavigate } from 'react-router-dom';
import { RouteSign } from './helpers/RouterName';


const Likecount = ({ props }) => {
    const navigate=useNavigate()
    const [likeCount, setLikeCount] = useState(0)
    const [hasLiked, setHasLiked] = useState(false)
    const user = useSelector(state => state.user)

    const { data: blogLikeCount, loading, error } = usefetch(`${getEnv('VITE_API_BASE_URL')}/blog-like/get-like/${props.blogid}/${user && user.isloggedIn ? user.user._id : ''}`, {
        method: 'get',
        credentials: 'include',
    })

 
    useEffect(() => {
        if (blogLikeCount) {
            setLikeCount(blogLikeCount.likecount)
            setHasLiked(blogLikeCount.isUserliked)
        }
    }, [blogLikeCount])

    const handleLike = async () => {
        try {
            if (!user.isloggedIn) {
                //showtoast('error', 'Please login into your account.')
               return  navigate(RouteSign)
                

                
            }

            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/blog-like/do-like`, {
                method: 'post',
                credentials: 'include',
                headers: { 'Content-type': "application/json" },
                body: JSON.stringify({ user: user.user._id, blogid: props.blogid })
            })

            if (!response.ok) {
                showtoast('error', response.statusText)
            }
            const responseData = await response.json()
            setLikeCount(responseData.likecount)
            setHasLiked(!hasLiked)
        } catch (error) {
            showtoast('error', error.message)
        }
    }

    return (
        <button onClick={handleLike} type='button' className='flex justify-between items-center gap-1'>
            {!hasLiked ?
                <FaRegHeart />
                :
                <FaHeart fill='red' />
            }
            {likeCount}
        </button>
    )
}

export default Likecount