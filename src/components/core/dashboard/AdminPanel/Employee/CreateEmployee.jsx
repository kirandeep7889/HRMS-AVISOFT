import React from 'react'
import { useForm } from 'react-hook-form';
import defaultLogo from '../../../../../assets/Images/placeholder.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee } from '../../../../../services/operations/employeeAPI';
import { useNavigate } from 'react-router-dom';


const CreateEmployee = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {AccessToken}=useSelector((state)=>state.auth)

    const onSubmit=async(data)=> {
        data.navigate = navigate;
        data.AccessToken=AccessToken
         dispatch(addEmployee(data))
    }
  return (
    <div className='pb-9 bg-slate-100 rounded h-screen'>
      <div className='p-5 flex items-center justify-between'>
        <div className='text-xl text-slate-600 font-semibold'>
           Create Employee
        </div>
        <div>
          <p className='text-slate-950 text-xl left-6 font-semibold'>Home / Dashboard /  
            <span className='text-yellow-700'>
              Create Employee
           </span>
          </p>
        </div> 
      </div>
      <div className='ml-10'>
         <img   className='h-20 w-20 rounded-full' src={defaultLogo} />
      </div>

      <form data-testid="create-employee-form" className="p-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <label>
                <p className="text-[0.875rem] text-slate-900 mb-1 leading-[1.375rem] font-semibold">First Name<sup className="text-red-900">*</sup></p>
                <input className="bg-richblack-800 rounded-[0.5rem]  w-full p-[12px] border-b-[1px] border-slate-800" required type="text" name="firstName" {...register("firstName")} placeholder="Enter Your First Name" data-testid="first-name-input" />
            </label>
            <div className="h-4 sm:hidden"></div>
            <label>
                <p className="text-[0.875rem] text-slate-900 mb-1 leading-[1.375rem] font-semibold">Last Name<sup className="text-red-900">*</sup></p>
                <input className="bg-richblack-800 rounded-[0.5rem]  w-full p-[12px] border-b-[1px] border-slate-800" required type="text" name="lastName" {...register("lastName")} placeholder="Enter Your Last Name" data-testid="last-name-input" />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
              <div className='mt-4'>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-900">
                      Email Address<sup className="text-red-900">*</sup>
                    </label>
                    <input
                      id="email"
                      {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                      className="border border-slate-300 rounded px-3 py-2 mt-2 w-full"
                      placeholder="Enter Your Email Address"
                      data-testid="email-input"
                    />
                    {errors.email && <span className="text-red-500" data-testid="email-error">Please enter a valid email address</span>}
              </div>
              <div className="mt-4">
                <label htmlFor="password" className="block text-sm font-semibold text-slate-900">
                  Password<sup className="text-red-900">*</sup>
                </label>
                <input
                  id="password"
                  {...register("password", { required: true, minLength: 6 })}
                  type="password"
                  className="border border-slate-300 rounded px-3 py-2 mt-2 w-full"
                  placeholder="Enter Your Password"
                  data-testid="password-input" 
                />
                {errors.password && errors.password.type === "required" && <span className="text-red-500" data-testid="password-required-error">Password is required</span>}
                {errors.password && errors.password.type === "minLength" && <span className="text-red-500" data-testid="password-length-error">Password must have at least 6 characters</span>}
              </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
                <div className="mt-4">
                    <label htmlFor="salary" className="block text-sm font-semibold text-slate-900">Salary<sup className="text-red-900">*</sup></label>
                    <input id="salary" {...register("salary")} type="number" className="border border-slate-300 rounded px-3 py-2 mt-2 w-full" placeholder="Enter The Salary" data-testid="salary-input" />
                </div>

                <div className="mt-4">
                    <label htmlFor="position" className="block text-sm font-semibold text-slate-900">Position<sup className="text-red-900">*</sup></label>
                    <select id="position" {...register("position")} className="border border-slate-300 rounded px-3 py-2 mt-2 w-full" data-testid="position-select">
                        <option value="DEVELOPER">Developer</option>
                        <option value="TESTER">Tester</option>
                        <option value="HR">HR</option>
                    </select>
                </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className="mt-4">
                <label htmlFor="joinDate" className="block text-sm font-semibold text-slate-900">Join Date<sup className="text-red-900">*</sup></label>
                <input id="joinDate" {...register("joinDate")} type="date" className="border border-slate-300 rounded px-3 py-2 mt-2 w-full" data-testid="join-date-input" />
            </div>
            <div className="mt-4">
                <label htmlFor="gender" className="block text-sm font-semibold text-slate-900">Gender<sup className="text-red-900">*</sup></label>
                <select id="gender" {...register("gender")} className="border border-slate-300 rounded px-3 py-2 mt-2 w-full" data-testid="gender-select">
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                    <option value="other">Other</option>
                </select>
            </div>
           </div>
            <div className='grid grid-cols-2 gap-4'>
                <div className="mt-4">
                    <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-slate-900">Date of Birth<sup className="text-red-900">*</sup></label>
                    <input id="dob" {...register("dateOfBirth")} type="date" className="border border-slate-300 rounded px-3 py-2 mt-2 w-full" data-testid="date-of-birth-input" />
                </div>
                <div className="mt-4">
                    <label htmlFor="role" className="block text-sm font-semibold text-slate-900">Role<sup className="text-red-900">*</sup></label>
                    <select id="role" {...register("role")} className="border border-slate-300 rounded px-3 py-2 mt-2 w-full" data-testid="role-select">
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
            </div>
            <button type="submit" className="bg-slate-900 text-white font-semibold py-2 px-4 rounded hover:bg-slate-800 mt-10" data-testid="submit-button">Submit</button>

      </form>
    </div>
  )
}

export default CreateEmployee
