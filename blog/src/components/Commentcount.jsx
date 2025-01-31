
import { usefetch } from '@/hooks/usefetch';

import React from 'react'
import { FaRegComment } from "react-icons/fa";
import { getEnv } from './helpers/getenv';
const Commentcount = ({ props }) => {
    const { data, loading, error } = usefetch(`${getEnv('VITE_API_BASE_URL')}/comment/get-count/${props.blogid}`, {
        method: 'get',
        credentials: 'include',
    })
console.log("comment data",data)
    return (
        <button type='button' className='flex justify-between items-center gap-1'>
            <FaRegComment />
            {data && data.commentCount
          
           }
        </button>
    )
}

export default Commentcount