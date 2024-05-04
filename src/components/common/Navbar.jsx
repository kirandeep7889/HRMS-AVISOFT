import React from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom';
import LogBtn from '../core/Navbar/LogBtn';
import { NavbarLinks } from '../../data/NavbarLinks';
import { useSelector } from 'react-redux';
import ProfileDropDown from '../core/Navbar/ProfileDropDown';
import Logo from '../../assets/Images/logo.svg'

const NavBar = () => {
  const location=useLocation();
  const {token} = useSelector((state) => state.auth);


  const matchRoute = (route) => {
    return matchPath({path:route}, location.pathname);
}


  return (
    <div className={` fixed w-full z-[9999] border-b-[1px] shadow-lg   bg-white top-0`}>
    <div className='flex h-30 items-center justify-between '>
        <div className='m-2'>
          <Link to="/">
             <img data-testid="logo" src={Logo}/>
          </Link>
        </div>
        <ul className='flex items-center gap-x-6 '>
             {
              NavbarLinks.map((link,index)=> {
                return (
                  <li key={index}>
                    <Link to={link?.path}>
                        <p className={`${matchRoute(link?.path) ? "font-bold underline text-red-600" :  ""}`}>
                                {link.title}
                        </p>
                     </Link>
                  </li>
                )
              })
             }
        </ul>
        <div className='ml-10'>
        {
                        token === null && (
                            <div className=' flex gap-x-4'>
                                <LogBtn link={"/login"} text={"Log In"}/>
                            </div>
                        )
                    } 
                        <div data-testid="profile-dropdown">
                       { token !== null && <ProfileDropDown/> }
                        </div>
                     
        </div>
    </div>
    </div>

  )
}

export default NavBar
