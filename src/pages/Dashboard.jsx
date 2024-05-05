import React from 'react'

import { Outlet } from 'react-router-dom';
import NavBar from '../components/common/Navbar';
import Sidebar from '../components/core/dashboard/Sidebar';

function Dashboard() {
   

  return (
    <div>
      <div className=' relative'>
        <NavBar backgroundColor={1}/>
      </div>
      <div className='flex pt-[50px] mt-5'>
          <div className=' relative w-[15%]'>
            <Sidebar/>
          </div>
          <div className=' w-[85%] pt-[40px] relative'>
              <div className=' mx-auto w-11/12'>
                  <Outlet/>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Dashboard