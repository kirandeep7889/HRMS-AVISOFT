import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import LogBtn from '../core/Navbar/LogBtn';
import { useSelector } from 'react-redux';
import ProfileDropDown from '../core/Navbar/ProfileDropDown';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

const NavBar = () => {
  const { AccessToken } = useSelector((state) => state.auth);
  const { register, handleSubmit } = useForm();
  const [userData, setUserData] = useState(null);
  const navigate=useNavigate();


  const onSubmit = async (data) => {
    const searchQuery = data.searchQuery.trim();
    try {
      if (searchQuery) {
        navigate(`/employee-info/${searchQuery}`);
      }
      else {
        toast.error("Enter Valid search query")
      }
    } catch (error) {
        toast.error("Error fetching user data");
    }
  };
    console.log(userData)
  return (
    <div className={`fixed w-full z-[9999] border-b-[1px] shadow-lg bg-white top-0`}>
      <div className='flex h-30 items-center justify-between'>
        <div className='m-2'>
          <Link to="/">
            <img src='https://avisoft.io/logo.svg' alt="Logo"/>
          </Link>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='ml-10 flex items-center'>
          <div className="flex items-center border-[2px] rounded-md">
            <span className="text-gray-500 size-10 p-3"><FaSearch /></span>
            <input
              type="text"
              placeholder="Search Employee.."
              className="px-4 py-2 pl-0 rounded-lg border border-gray-300 focus:outline-none border-none bg-white"
              {...register("searchQuery")}
            />
          </div>
          <button type='submit' className='p-2 bg-blue-600 rounded hover:cursor-pointer text-white'>
            Search
          </button>
        </form>
        <div>
          {
            AccessToken === null ? (
              <div className='flex gap-x-4 mr-10'  >
                <LogBtn link={"/login"} text={"Log In"} />
              </div>
            ) : (
              <div data-testid="profile-dropdown">
                <ProfileDropDown />
              </div>
            )
          }
        </div>
      </div>

    </div>
  );
};

export default NavBar;