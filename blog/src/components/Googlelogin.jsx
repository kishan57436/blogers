import React from 'react'
import { Button } from './ui/button'
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './helpers/firebase';
import { getEnv } from './helpers/getenv';
import { showtoast } from './helpers/showtoast';
import { useNavigate } from 'react-router-dom';
import { Routeindex } from './helpers/RouterName';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/user/userslice';

const Googlelogin = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handlelogin=async()=>
    {
        try{
            const googleresposne=await signInWithPopup(auth,provider);
            console.log("check kar rha hu google respose aa rha ha ya nhi",googleresposne);
            const user=googleresposne.user
            const bodydata={
                name:user.displayName,
                email:user.email,
                avatar:user?.photoURL
    
            }
            console.log("me user rint lkar rha hu",user)
            console.log(getEnv('VITE_API_BASE_URL'));
           
            const response=await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/google-login`,{
                method:'post',
                headers:{'Content-type':'application/json'},
                credentials:'include',
                body:JSON.stringify(bodydata)
    
            })
            const data=await response.json();
            console.log("data is printing the answer ",data)
            if(!response.ok)
                {
                    showtoast('error',data.message)
        
                }
         
          
            dispatch(setUser(data.user))
            showtoast('success',data.message)
            navigate(Routeindex);

        }
        catch(error)
        {
            showtoast('error',error.message)
        }
       
    }
  return (
    <div>
    <Button variant="outline" className="w-full text-black" onClick={handlelogin}>
    <FcGoogle />
    continue with Google

    </Button>
      
    </div>
  )
}

export default Googlelogin
