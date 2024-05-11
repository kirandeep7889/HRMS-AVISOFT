import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { formattedDate } from '../../../utils/dateFormatter';

const EmployeeAdditionalInfo = ({user}) => {
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth);

    const additionalDetails = [
        {
          name: 'Department',
          value: user?.department?.department,
        },
        {
          name: 'Position',
          value: user.position,
        },
        {
          name: 'Employee Code',
          value: user?.employeeCode,
        },
        {
          name: 'Role',
          value:  user?.roles[0].role ?  user?.roles[0].role : <p className='text-pink-600'>Add Role</p>,
        },
        {
          name: 'Join Date',
          value: user.joinDate ? formattedDate(user.joinDate) : <p className='text-pink-600'>Add Join Date</p>,
        },
    
        {
          name: 'Aadhar Number',
          value: user.adhaarNumber ? user.adhaarNumber : <p className='text-pink-600'>Add Aadhar Number</p>,
        },
        {
          name: 'PAN Number',
          value: user.panNumber ? user?.panNumber : <p className='text-pink-600'>Add EAN Number</p>,
        },
        {
          name: 'UAN Number',
          value: user.uanNumber ? user.uanNumber : <p className='text-pink-600'>Add UAN Number</p>,
        },
        {
          name: 'Salary',
          value: user.salary ? user.salary : <p className='text-pink-600'>Add Salary</p>,
        },
      ];
  return (
    <div className='flex items-center justify-center flex-col gap-5 w-[75%] mx-auto'>
        {/* Additional Details Section*/}
        <div className='flex gap-6 w-full flex-col p-8 rounded-lg'>
          <div className='flex justify-between items-center'>
            <p className='text-xl text-red-950 font-semibold'>Additional Details</p>
            <div className='flex items-center gap-x-3'>
              <button
                type='submit'
                className={`text-center text-sm md:text-base font-medium rounded-md leading-6 hover:scale-95 transition-all duration-200 ${
                  loading ? 'bg-slate-900 text-white' : 'bg-yellow-500 text-black'
                } py-1 px-5 flex items-center`}
              >
                Edit <FiEdit className='ml-2' />
              </button>
            </div>
          </div>
          <div className='grid grid-cols-2 place-content-between gap-4'>
            {additionalDetails.map((element, index) => (
              <div key={index} className='flex flex-col gap-1'>
                <p className='text-xs text-zinc-700 font-bold'>
                  {element.name}
                  <sup className='text-red-600'>*</sup>
                </p>
                <div className='text-black'>{element.value}</div>
              </div>
            ))}
          </div>
        </div>        
    </div>
  )
}

export default EmployeeAdditionalInfo
