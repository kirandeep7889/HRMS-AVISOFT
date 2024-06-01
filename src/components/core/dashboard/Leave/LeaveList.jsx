import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { employeeLeavesList } from '../../../../services/operations/leaveAPI';
import toast from 'react-hot-toast';
import Spinner from '../../../common/Spinner';

const LeaveList = () => {
  const [leaveData, setLeaveData] = useState([]);
  const {user}=useSelector((state)=>state.profile);
  const employeeId=user?.userId;
  const { AccessToken } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dispatch(employeeLeavesList(employeeId, AccessToken));
        console.log(res);
        if (res?.status === 200) {
          setLeaveData(res?.data?.leaveRequests);
          toast.success("Leaves fetched Successfully");
        } else {
          toast.error('Failed to fetch leave requests');
        }
      } catch (error) {
        console.error('Error fetching leave requests:', error);
        toast.error('Error fetching leave requests');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, employeeId, AccessToken]);

  return (
    <div className='h-screen'>
      {loading ? (
        <div className='flex flex-col items-center justify-center mt-56'>
          <Spinner />
        </div>
      ) : (
        <div className='pb-9 bg-slate-100 h-full rounded-md mb-5'>
          <div className='p-5 flex items-center justify-between'>
            <div className='text-xl text-slate-600 font-semibold'>
              Leave Applications
            </div>
            <div>
              <p className='text-slate-950 text-xl left-6 font-semibold'>
                Home / Dashboard /
                <span className='text-yellow-700'> Leave Applications</span>
              </p>
            </div>
          </div>
          <div className='p-10'>
            {leaveData.length > 0 ? (
              <table className="min-w-full bg-white">
                <thead className="bg-slate-200 rounded-md">
                  <tr>
                    <th className="py-2 px-4 border-b-2 border-slate-600 text-left text-sm leading-4 text-black font-semibold uppercase tracking-wider">Employee</th>
                    <th className="py-2 px-4 border-b-2 border-slate-600 text-left text-sm leading-4 text-black font-semibold uppercase tracking-wider">Leave Type</th>
                    <th className="py-2 px-4 border-b-2 border-slate-600 text-left text-sm leading-4 text-black font-semibold uppercase tracking-wider">Total Days</th>
                    <th className="py-2 px-4 border-b-2 border-slate-600 text-left text-sm leading-4 text-black font-semibold uppercase tracking-wider">Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveData.map((leave, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b border-slate-200">
                        <Link to={`/leave-info/${leave.employeeId}`}>
                          {leave.employeeFirstName} {leave.employeeLastName}
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b border-slate-200">{leave.leaveType}</td>
                      <td className="py-2 px-4 border-b border-slate-200">{leave.numberOfDays}</td>
                      <td className="py-2 px-4 border-b border-slate-200">{leave.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className='text-center  mt-[15%] text-gray-500'>
                No leave requests available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveList;
