import loadingicon from '@/assests/images/loading.svg'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-screen h-screen top-0 left-0 mx-auto  z-50 flex justify-center  items-center'>
        <img src={loadingicon} width={100} className='mx-auto  top-36'></img>
      
    </div>
  )
}

export default Loading
