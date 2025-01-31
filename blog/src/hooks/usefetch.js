import { useEffect, useState } from "react"

export const usefetch=(url,options={},dependency=[])=>
{
    const[data,setdata]=useState()
    const[loading,setloading]=useState(false)
    const [error,seterror]=useState()
   
    useEffect(()=>
    {
        setloading(true)
        const fetchdata=async()=>
        {
            try{

                const response=await fetch(url,options)
                const responseddata=await response.json()
                setdata(responseddata)
                if(!response.ok)
                {
                    throw new Error(`Error:${response.statusText},${response.status}`)
                }
            }
            catch(error)
            {
        
            }finally{
                setloading(false)
            }
        }
        fetchdata();
       
    },dependency)
   return {data,loading,error}



}