import React from 'react'

import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar'

export default function Layout() {

  
  return (
    <div>
        <div className='flex h-[100vh]'>
            <div><Sidebar/>
            </div>
            <Outlet/>
        </div>
    </div>
  )
}
