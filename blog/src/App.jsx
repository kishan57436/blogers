



import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Routeaddcategory, RouteBlog, RouteBlogAdd, RouteBlogbycategory, RouteBlogDetails, RouteBlogEdit, Routecategorydetails, RouteCommentDetails, Routeeditcategory, Routeindex, Routeprofile, Routesearch, RouteSign, RouteSignup, RouteUser } from './components/helpers/RouterName'
import Index from './pages/Index'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Editcategory from './pages/Category/Editcategory'
import Addcategory from './pages/Category/Addcategory'


import Categorydetails from './pages/Category/categorydetails'
import Addblog from './pages/Blog/addblog'
import Editblog from './pages/Blog/Editblog'
import Blogdetails from './pages/Blog/Blogdetails'
import Singleblogdetails from './pages/Singleblogdetails'
import Blogbycategory from './pages/Blog/Blogbycategory'
import Searchresult from './pages/Searchresult'
import Comments from './pages/Comments'
import User from './pages/User'
import AuthRouteProtechtion from './components/Authrouteprotection'
import OnlyAdminAllowed from './components/Onlyadminallowed'
import Layout from './Layout/Layout'



function App() {

  // now it is working herew so easily without helping htis way we could our answer so easily wihtout having any other this wazy
  

  return (
    <>
    

 <BrowserRouter>
 <Routes>
  <Route path={Routeindex} element={<Layout/>}>
  <Route  index element={<Index/>}/>
  

  {/* category rotues */}
 

    {/* // now i am going to wirte the  blog rotue so easily wihtout having any problme */}

 
 
  
  <Route path={RouteBlogDetails()} element={<Singleblogdetails/>}/>
  <Route path={RouteBlogbycategory()} element={<Blogbycategory/>}/>
  <Route path={Routesearch()} element={<Searchresult/>}/>
 
 

{/* // this are only without login no one access */}

  <Route element={<AuthRouteProtechtion/>}>

  <Route path={RouteBlogAdd} element={<Addblog/>}/>
  <Route path={RouteBlogEdit()} element={<Editblog/>}/>
  <Route path={RouteBlog} element={<Blogdetails/>}/>
  <Route path={RouteCommentDetails} element={<Comments/>}/>
  <Route  path={Routeprofile} element={<Profile/>}/>

  </Route>

  {/* // only adminallwedd */}
<Route element={<OnlyAdminAllowed/>}>

<Route  path={Routeaddcategory} element={<Addcategory/>}/>
  <Route  path={Routecategorydetails} element={<Categorydetails/>}/>
  <Route path={Routeeditcategory()} element={<Editcategory/>}></Route>
  <Route path={RouteUser} element={<User/>}/>

</Route>



  </Route>

  <Route path={RouteSign} element={<Signin/>}></Route>
  <Route path={RouteSignup} element={<Signup/>}/>
  
 
  
 </Routes>
 </BrowserRouter>

    </>
  )
}

export default App
