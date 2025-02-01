import Appsidebar from '@/components/Appsidebar'
import Footer from '@/components/Footer'
import Topbar from '@/components/Topbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='mehu'>
            
        <SidebarProvider>
           <Topbar />
           
<Appsidebar/>
        <main className='w-full'>
          
            <div className='w-full min-h[calc(100vh-45px)] py-28 px-10'> 
            <Outlet/>
            </div>
            {/* //fotter */}
            <Footer/>
        </main>
        </SidebarProvider>
      
    </div>
  )
}

export default Layout
