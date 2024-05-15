import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiUpload } from 'react-icons/fi';
import defaultImage from '../../../../../assets/Images/placeholder.jpg'
import { uploadEmployeeImage } from '../../../../../services/operations/employeeAPI';

const UploadEmployeeImage = () => {
    const { user } = useSelector((state) => state.profile);
    const { AccessToken } = useSelector((state) => state.auth);
    const {employees}=useSelector((state)=>state.employee)


    console.log(employees)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const inputRef = useRef(null);

    const handleFileChange = (e) => {
        e.preventDefault();
        if (!e.target.files[0]) return;
        setSelectedImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedImage) {
            if(!selectedImage) {toast.error(<>Please Select an Image</>); return}        }
        try {
            setLoading(true);
            const formData = new FormData();
            console.log(selectedImage)
            formData.append('file', selectedImage);
            const employeeId=employees[0];
            console.log(formData)
             dispatch(uploadEmployeeImage(employeeId, AccessToken,formData));
            setLoading(false);
        } catch (err) {
            console.log("Error:", err.message);
            setLoading(false);
        }
    };


    return (
        <div className='p-5'>
            <div className='flex gap-5 w-full items-center justify-start rounded-lg'>
                <img
                    src={selectedImage ? URL.createObjectURL(selectedImage) : defaultImage}
                    alt={`profile-${user.firstName}`}
                    className='aspect-square rounded-full object-cover h-20'
                />
                <div className='w-[80%] flex gap-4 flex-col'>
                    <p className='font-normal text-lg text-zinc-800'>Upload Employee Profile Picture</p>
                    <div className='flex gap-4'>
                        {!loading && (
                            <div>
                                <input
                                    className='hidden'
                                    ref={inputRef}
                                    type='file'
                                    accept='image/*'
                                    onChange={handleFileChange}
                                />
                                <button
                                    onClick={() => inputRef.current.click()}
                                    className='text-center text-sm md:text-base font-medium rounded-md leading-6 hover:scale-95 transition-all duration-200 bg-gray-900 text-white py-1 px-5'
                                    disabled={loading}
                                >
                                    Select
                                </button>
                            </div>
                        )}
                        <div
                            className={`text-center text-sm md:text-base font-medium rounded-md leading-6 hover:scale-95 transition-all duration-200 ${
                                loading ? 'bg-slate-900 text-white' : 'bg-yellow-500 text-black'
                            } py-1 px-5`}
                            onClick={handleSubmit}
                            style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
                        >
                            <button type='submit' className='flex place-items-center gap-2' disabled={loading}>
                                {loading ? <>Uploading...</> : <>Upload<FiUpload /></>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadEmployeeImage;
