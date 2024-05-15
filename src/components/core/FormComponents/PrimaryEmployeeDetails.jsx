import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setStep } from '../../../slices/employeeSlice';
import { addEmployee } from '../../../services/operations/employeeAPI';


  

const PrimaryEmployeeDetails = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {AccessToken}=useSelector((state)=>state.auth)

    const onSubmit=async(data)=> {
        data.navigate = navigate;
        data.AccessToken=AccessToken
        console.log(data);
        dispatch(addEmployee(data));
        // dispatch(setStep(2))
    }
  return (
    <div className='flex flex-col items-center h-[420px]'>
      <form data-testid="create-employee-form" className="p-5 w-[60%]" onSubmit={handleSubmit(onSubmit)}>

          <div className="mt-4">
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
 
          <div className="mt-4">
                    <label htmlFor="role" className="block text-sm font-semibold text-slate-900">Role<sup className="text-red-900">*</sup></label>
                    <select id="role" {...register("role")} className="border border-slate-300 rounded px-3 py-2 mt-2 w-full" data-testid="role-select">
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                    </select>
          </div>
            <button type="submit" className="bg-slate-900 text-white font-semibold py-2 px-4 rounded hover:bg-slate-800 mt-5" data-testid="submit-button">Submit</button>

      </form>
    </div>
  )
}

export default PrimaryEmployeeDetails
