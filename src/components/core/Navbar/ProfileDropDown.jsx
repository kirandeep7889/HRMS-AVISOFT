import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import ConfirmationModal from '../../common/ConfirmationModal';
import useOnClickOutside from '../../../Hooks/useOnClickOutside';
import { logout } from '../../../services/operations/authAPI';


const ProfileDropDown = () => {
        const {user}=useSelector((state)=>state.profile)
        const [ open,setOpen ] = useState(false)
        const ref = useRef(null)
        const [confirmationModal, setConfirmationModal] = useState(null)
        const dispatch=useDispatch();
        const navigate=useNavigate();
      
        useOnClickOutside(ref, () => setOpen(false))
      
        if(!user) return null

        console.log(user)

  return (
    <div  className='ml-10 hover:cursor-pointer mr-10 p-2'>
    <div className='relative flex items-center gap-x-2' onClick={()=>setOpen(true)}>
        <div className="mt-2">
        <img className='rounded-full aspect-square w-[30px] h-[30px] object-cover' src={user?.image} alt={`${user.firstName}`}/>
        </div>
        <div className=' flex flex-col  justify-center '>
            <div className='flex gap-1'>
            <span>{user.firstName}</span>
            <span>{user.lastName}</span>
            </div>
          <span className="account-position">{user.roles[0].role}</span>
        </div>  
        {
        open && (
          <div onClick={(e) => e.stopPropagation()} ref={ref} className='absolute left-[50%] top-[50%] z-[1000] flex w-[50px] translate-x-[-50%] translate-y-[2em] flex-col rounded-lg bg-slate-100 p-1 text-slate-900 transition-all duration-150 lg:w-[150px]'>
            <div className="absolute left-[35%] top-0 -z-10 h-6 w-6 translate-x-[50%] translate-y-[-40%] rotate-45 select-none rounded bg-slate-100"></div>
            <div>
              <Link to={'/'}>
                  <p className='rounded-lg text-black bg-transparent py-2 pl-2 hover:bg-slate-200 flex place-items-center gap-2' onClick={() => setOpen(false)}>
                    <VscDashboard className="text-lg"/>
                    Dashboard
                  </p>
              </Link>
              <div className='rounded-lg text-black bg-transparent py-2 pl-2 hover:bg-slate-200 flex place-items-center gap-2' onClick={() => { setConfirmationModal({
                                                                                                text1: "Are You Sure?",
                                                                                                text2: "You Will be Logged Out of Your Account",
                                                                                                btn1Text : "Logout",
                                                                                                btn2Text : "Cancel",
                                                                                                btn1Handler : () => dispatch(logout(navigate)),
                                                                                                btn2Handler : () => setConfirmationModal(null),
                                                                                            })}}>
                  <div className=' flex items-center gap-x-2'>
                    <VscSignOut className="text-lg"/>
                    <span>Logout</span>
                  </div>
              </div>
            </div>
          </div>
        )
      }   
    </div>
    {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}


    </div>
  )
}

export default ProfileDropDown