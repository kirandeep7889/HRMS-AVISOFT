import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import ConfirmationModal from "../../../../common/ConfirmationModal.jsx";
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDepartment, Departmentlist } from '../../../../../services/operations/departmentAPI.js';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const { AccessToken } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployeesList = async () => {
            try {
                const res = await dispatch(Departmentlist(AccessToken));
                setDepartments(res?.data);
            } catch (error) {
                console.error("Error fetching departments", error);
            }
        };

        fetchEmployeesList();
    }, [dispatch, AccessToken]);

    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <div className='pb-9 bg-slate-100 rounded h-screen'>
            {/* section 1 */}
            <div className='p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between'>
                <div className='text-xl text-slate-600 font-semibold mb-2 lg:mb-0'>
                    Department List
                </div>
                <div>
                    <p className='text-slate-950 text-xl font-semibold'>
                        Home / Dashboard /
                        <span className='text-yellow-700'> Department List</span>
                    </p>
                </div>
            </div>
            {/* section 2 */}
            <div className='m-5 flex flex-col lg:flex-row items-start lg:items-center justify-between rounded p-5'>
                <div className='flex items-center text-white gap-x-1 bg-red-600 w-fit p-2 rounded-lg mb-3 lg:mb-0'>
                    <span><HiOutlinePlusCircle /></span>
                    <button onClick={() => navigate("/department/department-create-update", { state: { isEditing: false } })}>
                        Add Department
                    </button>
                </div>
            </div>
            {/* section 3 */}
            <div className='p-5'>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-black uppercase bg-slate-200">
                            <tr>
                                <th scope="col" className="px-6 py-3" data-testid="Department-Name-header">
                                    Department Name
                                </th>
                                <th scope="col" className="px-6 py-3" data-testid="Department-Manager-header">
                                    Department Manager
                                </th>
                                <th scope="col" className="px-6 py-3" data-testid="Department-Description-header">
                                    Department Description
                                </th>
                                <th scope="col" className="px-6 py-3" data-testid="action-header">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map((department, index) => (
                                <tr key={department.departmentId} className={index % 2 === 0 ? 'bg-white text-black' : 'bg-gray-100 text-black'}>
                                    <td className="px-6 py-4">
                                        {department.department}
                                    </td>
                                    <td className="px-6 py-4">
                                        {department.manager ? `${department.manager.firstName} ${department.manager.lastName}` : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {department.description}
                                    </td>
                                    <td className="px-6 py-4 flex gap-x-2">
                                        <button
                                            className="text-lg text-blue-600 dark:text-blue-500 hover:underline"
                                            onClick={() => navigate(`/department/department-create-update`, { state: { isEditing: true, department } })}
                                        >
                                            <FaRegEdit />
                                        </button>
                                        <Link
                                            onClick={() => setConfirmationModal({
                                                text1: "Are You Sure?",
                                                text2: "You want to Delete this Department. This Department may contain important Information. Deleting this department will remove all the details associated with it.",
                                                btn1Text: "Delete Department",
                                                btn2Text: "Cancel",
                                                btn1Handler: async () => { await dispatch(deleteDepartment(AccessToken, department.departmentId)), refreshPage() },
                                                btn2Handler: () => setConfirmationModal(null),
                                            })}
                                            className="text-red-600 text-lg"
                                        >
                                            <RiDeleteBin6Line />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    );
}

export default DepartmentList;
