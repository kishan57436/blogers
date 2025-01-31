
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RouteSign } from './helpers/RouterName'

const OnlyAdminAllowed = () => {
    const user = useSelector(state => state.user)
    if (user && user.isloggedIn && user.user.role === 'admin') {
        return (
            <Outlet />
        )
    } else {
        return <Navigate to={RouteSign} />
    }

}

export default OnlyAdminAllowed