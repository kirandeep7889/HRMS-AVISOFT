import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlinePlusCircle } from "react-icons/hi";
import { GrDocumentCsv } from "react-icons/gr";
import { SiMicrosoftexcel } from "react-icons/si";
import { useDispatch, useSelector } from 'react-redux';
import { EmployeesList } from '../../../../../services/operations/employeeAPI';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import ExportDataJSON from '../../../../../utils/ExportFromJson';
import Spinner from '../../../../common/Spinner';

const EmployeeList = () => {
    const dispatch = useDispatch();
    const { AccessToken } = useSelector((state) => state.auth);
    const [employees, setEmployees] = useState([]);
    const [loading,setLoading]=useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 5;

    useEffect(() => {
        const fetchEmployeesList = async () => {
            try {
                setLoading(true);
                const res = await dispatch(EmployeesList(AccessToken));
                console.log(res);
                setEmployees(res?.data?.Employees);
            } catch (error) {
                console.error("Error fetching employees", error);
            }
            setLoading(false);
        };

        fetchEmployeesList();
    }, [dispatch]);

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    console.log(employees);
    return (
        <div className='pb-9 bg-slate-100 rounded h-screen'>
            {
               loading &&   <div className=' absolute grid place-content-center h-screen w-[85%]'><Spinner/></div>
            }      
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
                    <button><Link to="/employee/create-Employee">New Employee</Link></button>
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
                    {currentEmployees.length > 0 ? (
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
                                        Employee Code
                                    </th>
                                    <th scope="col" className="px-6 py-3" data-testid="role-header">
                                        Employee Position
                                    </th>
                                    <th scope="col" className="px-6 py-3" data-testid="action-header">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentEmployees.map((employee, index) => (
                                    <tr key={employee?.employeeId} className={index % 2 === 0 ? 'bg-white text-black' : 'bg-gray-100 text-black'}>
                                        <td scope="row" className="px-6 py-4 w-10">
                                            <div className='flex justify-start'>
                                                <img className='rounded-full aspect-square w-[30px] h-[30px] object-cover' src={employee?.profileImage} alt={`${employee?.firstName}`}/>
                                            </div>
                                        </td>
                                        <Link to={`/employee-info/${employee?.firstName}`}>
                                            <td scope="row" className="px-6 py-4">
                                                {`${employee?.firstName} ${employee.lastName}`}
                                            </td>
                                        </Link>
                                        <td className="px-6 py-4">
                                            {employee?.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {employee?.employeeCode}
                                        </td>
                                        <td className="px-6 py-4">
                                            {employee?.position ? employee?.position : "Manager"} 
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
            {/* Pagination Controls */}
            <div className="flex justify-between p-5">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className=" bg-slate-400 text-white p-2 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={indexOfLastEmployee >= employees.length}
                    className=" bg-slate-400 text-white p-2  disabled:opacity-50 text-center text-sm md:text-base font-medium rounded-md leading-6 hover:scale-95 transition-all duration-200"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default EmployeeList;
