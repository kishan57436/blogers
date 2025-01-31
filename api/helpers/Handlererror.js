
// export const handleerror=(statuscode,message)=>
// {
//     const error =new Error
//    error.statuscode=statuscode
//    error.message=message
//    return
    
// }

export const handleError = (statusCode, message) => {
    const error = new Error
    error.statusCode = statusCode
    error.message = message
    return error
}

