import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlinePlusCircle } from "react-icons/hi";
import { GrDocumentCsv } from "react-icons/gr";
import { SiMicrosoftexcel } from "react-icons/si";
import { useDispatch } from 'react-redux';
import { EmployeesList } from '../../../../../services/operations/employeeAPI';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import ExportDataJSON from '../../../../../utils/ExportFromJson';

const EmployeeList = () => {
    const dispatch = useDispatch();
    const [employees, setEmployees] = useState([{
            // avatar: 'mock_avatar_url',
            // name: 'kirandeep singh',
            // email: 'kirandeep@gmail.com',
            // empId: '1',
            // role: 'Employee',
            // address: 'Jammu'
    }]);

    useEffect(() => {
        const fetchEmployeesList = async () => {
            try {
                const res = await dispatch(EmployeesList());
                setEmployees(res.data); 
            } catch (error) {
                // Handle error
            }
        };
  
        fetchEmployeesList();
    }, []);

    console.log(employees)
    return (
        <div className='pb-9 bg-slate-100 rounded'>
            {/* section 1 */}
            <div className='p-5'>
                <p className='text-slate-950 text-xl left-6 font-semibold'>Home / Dashboard /  
                    <span className='text-yellow-700'> Employee List</span>
                </p>
            </div>
            {/* section 2 */}
            <div className='m-5 flex items-center justify-between rounded p-5'>
                <div className='flex items-center text-white gap-x-1 bg-red-600 w-fit p-2 rounded-lg'>
                    <span><HiOutlinePlusCircle/></span>
                    <button><Link to="/employee/employee-create-update">New Employee</Link></button>
                </div>
                <div className='flex items-center gap-x-7'>
                    <div className='gap-x-2 bg-slate-200 p-2 rounded-md'>
                        <button
                            onClick={() => ExportDataJSON(employees, "Employee", "xls")}
                            data-testid="export-excel-button"
                        >
                            <div className='flex items-center gap-x-1'>
                                <SiMicrosoftexcel/>
                                <span>Export</span>
                            </div>
                        </button>
                    </div>
                    <div
                        onClick={() => ExportDataJSON(employees, "Employee", "csv")}
                        className='flex items-center gap-x-2 bg-slate-300 p-2 rounded-md'
                        data-testid="export-csv-button"
                    >
                        <button><GrDocumentCsv/></button>
                        <span>Export</span>
                    </div>
                </div>
            </div>
            {/* section 3 */}
            <div className='p-5'>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    {employees.length > 0 ? (
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-black uppercase bg-slate-200 ">
                                <tr>
                                    <th scope="col" className="px-6 py-3" data-testid="avatar-header">
                                        Avatar
                                    </th>
                                    <th scope="col" className="px-6 py-3" data-testid="name-header">
                                        Employee Name
                                    </th>
                                    <th scope="col" className="px-6 py-3" data-testid="email-header">
                                        Employee Email
                                    </th>
                                    <th scope="col" className="px-6 py-3" data-testid="address-header">
                                        Employee Address
                                    </th>
                                    <th scope="col" className="px-6 py-3" data-testid="role-header">
                                        Employee Role
                                    </th>
                                    <th scope="col" className="px-6 py-3" data-testid="action-header">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee) => (
                                    <tr key={employee.empId} className="bg-white text-black">
                                        <td scope="row" className="px-6 py-4 w-10">
                                            <div className='flex justify-start'>
                                                <img className='rounded-full aspect-square w-[30px] h-[30px] object-cover' src={employee.avatar} alt={`${employee.name}`}/>
                                            </div>
                                        </td>
                                        <td scope="row" className="px-6 py-4">
                                            {employee.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {employee.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {employee.address}
                                        </td>
                                        <td className="px-6 py-4">
                                            {employee.role}
                                        </td>
                                        <td className="px-6 py-4 flex gap-x-2">
                                            <Link
                                                to={`/employee/${employee.empId}/edit`}
                                                className="text-lg text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                <FaRegEdit/>
                                            </Link>
                                            <Link
                                                className="text-red-600 text-lg"
                                            >
                                                <RiDeleteBin6Line/>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p data-testid="no-employee-found" className="text-center">No employees found</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EmployeeList;
