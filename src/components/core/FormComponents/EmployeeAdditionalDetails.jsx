import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlus } from "react-icons/fa";
import { setStep } from '../../../slices/employeeSlice';
import { addEmployeeAddressDetails, addEmployeeBankDetails, addEmployeeEmergencyContactDetails } from '../../../services/operations/employeeAPI';


const EmployeeAdditionalDetails = () => {
    const { register: registerEmergency, handleSubmit: handleSubmitEmergency, formState: { errors: errorsEmergency } } = useForm();
    const { register: registerAddress, handleSubmit: handleSubmitAddress, formState: { errors: errorsAddress } } = useForm();
    const { register: registerBank, handleSubmit: handleSubmitBank, formState: { errors: errorsBank } } = useForm();
    const {AccessToken}=useSelector((state)=>state.auth);
    const {employees}=useSelector((state)=>state.employee);


    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const emergencyContactDetailsSubmit = (data) => {
        const employeeId=employees[0];
        console.log("Emergency Contact Details Submitted:", data);
        dispatch(addEmployeeEmergencyContactDetails(employeeId,data,AccessToken))
    }

    const onSubmitAddress = (data) => {
        console.log("Address Details Submitted:", data);
        const employeeId=employees[0];
        dispatch(addEmployeeAddressDetails(employeeId,data,AccessToken));
    };

    const onSubmitBank = (data) => {
        console.log("Bank Details Submitted:", data);
        const employeeId=employees[0];
        dispatch(addEmployeeBankDetails(employeeId,data,AccessToken));
    };


    const bankNames = ["Jammu and kashmir Bank","State Bank of India","Axis Bank", "HDFC Bank"];
    const addressTypes = ["TEMPORARY", "PERMANENT"];

    return (
        <div>
        {/* Emergency Contact Details Div */}
          <div>
                <h2 className='text-lg  text-center text-slate-600 font-semibold mt-8'>Emergency Contact Details<sup className="text-red-900 font-extrabold">*</sup></h2>

                <form data-testid="additional-details-form" className="p-5" onSubmit={handleSubmitEmergency(emergencyContactDetailsSubmit)}>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className="mt-2">
                            <label htmlFor="contact" className="block text-sm font-semibold text-slate-900">Contact<sup className="text-red-900">*</sup></label>
                            <input required id="contact" {...registerEmergency("contact", { required: true })} type="number" className="border border-slate-300 rounded px-3 py-2 mt-2 w-full" placeholder="Enter Contact Number" data-testid="contact-input" />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="relationship" className="block text-sm font-semibold text-slate-900">Relationship<sup className="text-red-900">*</sup></label>
                            <input required id="relationship" {...registerEmergency("relationship", { required: true })} type="text" className="border border-slate-300 rounded px-3 py-2 mt-2 w-full" placeholder="Enter Relationship Detail.." data-testid="relationship-input" />
                        </div>
                    </div>
                    <div className='flex  items-center gap-x-3 mt-4'>
                        <button type="submit" className={`text-center text-sm md:text-base font-medium rounded-md leading-6 hover:scale-95 transition-all duration-200 ${
                        loading ? 'bg-slate-900 text-white' : 'bg-yellow-500 text-black'
                        } py-1 px-5 flex items-center`}>
                            Add <FaPlus className="ml-2"/>
                        </button>
                    </div>                
                </form>
            </div>

          {/* Address Details Div */}
          <div>
                <h2 className='text-lg  text-center text-slate-600 font-semibold'>Employee Address Details<sup className="text-red-900 font-extrabold">*</sup></h2>
                <form data-testid="address-details-form" className="p-5" onSubmit={handleSubmitAddress(onSubmitAddress)}>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className="mt-2">
                            <label htmlFor="addressType" className="block text-sm font-semibold text-slate-900">Address Type<sup className="text-red-900">*</sup></label>
                            <select id="addressType" {...registerAddress("addressType", { required: true })} className="border border-slate-300 rounded px-3 py-2 mt-2 w-full">
                                <option value="">Select Address Type</option>
                                {addressTypes.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mt-2">
                            <label htmlFor="propertyNumber" className="block text-sm font-semibold text-slate-900">Property Number<sup className="text-red-900">*</sup></label>
                            <input  required id="propertyNumber" {...registerAddress("propertyNumber", { required: true })} type="number" className="border border-slate-300 rounded px-3 py-2 mt-2 w-full" placeholder="Enter Property Number" />
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className="mt-2">
                            <label htmlFor="city" className="block text-sm font-semibold text-slate-900">City<sup className="text-red-900">*</sup></label>
                            <input  required id="city" {...registerAddress("city", { required: true })} type="text" className="border border-slate-300 rounded px-3 py-2 mt-2 w-full" placeholder="Enter City" />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="zipCode" className="block text-sm font-semibold text-slate-900">Zip Code<sup className="text-red-900">*</sup></label>
                            <input  required id="zipCode" {...registerAddress("zipCode", { required: true })} type="text" className="border border-slate-300 rounded px-3 py-2 mt-2 w-full" placeholder="Enter Zip Code" />
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className="mt-2">
                            <label htmlFor="state" className="block text-sm font-semibold text-slate-900">State<sup className="text-red-900">*</sup></label>
                            <input  required id="state" {...registerAddress("state", { required: true })} type="text" className="border border-slate-300 rounded px-3 py-2 mt-2 w-full" placeholder="Enter State" />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="country" className="block text-sm font-semibold text-slate-900">Country<sup className="text-red-900">*</sup></label>
                            <input  required id="country" {...registerAddress("country", { required: true })} type="text" className="border border-slate-300 rounded px-3 py-2 mt-2 w-full" placeholder="Enter Country" />
                        </div>
                    </div>
                    <div className='flex  items-center gap-x-3 mt-4'>
                        <button type="submit" className={`text-center text-sm md:text-base font-medium rounded-md leading-6 hover:scale-95 transition-all duration-200 ${
                            loading ? 'bg-slate-900 text-white' : 'bg-yellow-500 text-black'
                            } py-1 px-5 flex items-center`}>
                            Add <FaPlus className="ml-2" />
                        </button>
                    </div>
            </form>
          </div>
         {/* Bank info div */}
          <div>
            <h2 className='text-lg text-center text-slate-600 font-semibold'>Employee Bank Details<sup className="text-red-900 font-extrabold">*</sup></h2>
            <div className="p-5">
                <form data-testid="bank-details-form" onSubmit={handleSubmitBank(onSubmitBank)}>
                    <div className="mt-2">
                        <label htmlFor="bankName" className="block text-sm font-semibold text-slate-900">Bank Name<sup className="text-red-900">*</sup></label>
                        <select required id="bankName" {...registerBank("bankName", { required: true })} className="border border-slate-300 rounded px-3 py-2 mt-2 w-full">
                            <option value="">Select Bank</option>
                            {bankNames.map((bank, index) => (
                                <option key={index} value={bank}>{bank}</option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="mt-2">
                            <label htmlFor="accountNumber" className="block text-sm font-semibold text-slate-900">Account Number<sup className="text-red-900">*</sup></label>
                            <input required id="accountNumber" {...registerBank("accountNumber", { required: true })} type="text" className="border border-slate-300 rounded px-3 py-2 mt-2 w-full" placeholder="Enter Account Number" />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="ifsc" className="block text-sm font-semibold text-slate-900">IFSC Code<sup className="text-red-900">*</sup></label>
                            <input required id="ifsc" {...registerBank("ifsc", { required: true })} type="text" className="border border-slate-300 rounded px-3 py-2 mt-2 w-full" placeholder="Enter IFSC Code" />
                        </div>
                    </div>
                    <div className="mt-2">
                        <label htmlFor="branch" className="block text-sm font-semibold text-slate-900">Branch<sup className="text-red-900">*</sup></label>
                        <input required id="branch" {...registerBank("branch", { required: true })} type="text" className="border border-slate-300 rounded px-3 py-2 mt-2 w-full" placeholder="Enter Branch" />
                    </div>
                    <div className='flex  items-center gap-x-3 mt-4'>
                        <button type="submit" className={`text-center text-sm md:text-base font-medium rounded-md leading-6 hover:scale-95 transition-all duration-200 ${
                        loading ? 'bg-slate-900 text-white' : 'bg-yellow-500 text-black'
                        } py-1 px-5 flex items-center`}>
                            Add <FaPlus className="ml-2"/>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div className='flex flex-col items-center justify-center px-72  w-full'>
                <button onClick={()=> dispatch(setStep(2))}   className={`text-center w-full text-sm md:text-base font-medium rounded-md leading-6 hover:scale-95 transition-all duration-200 ${
                    loading ? 'bg-slate-900 text-white' : 'bg-yellow-500 text-black'
              } py-1 px-5`}>Previous Step</button>
            </div>
        </div>

    );
};

export default EmployeeAdditionalDetails;
