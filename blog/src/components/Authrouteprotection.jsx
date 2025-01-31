

import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RouteSign } from './helpers/RouterName'

const AuthRouteProtechtion = () => {
    const user = useSelector(state => state.user)
    if (user && user.isloggedIn) {
        return (
            <Outlet />
        )
    } else {
        return <Navigate to={RouteSign} />
    }

}

export default AuthRouteProtechtion