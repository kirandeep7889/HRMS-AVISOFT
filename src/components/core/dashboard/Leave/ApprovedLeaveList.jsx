import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../common/Spinner';
import { approvedLeaveRequestsForEmployee } from '../../../../services/operations/leaveAPI';

const ApprovedLeaveList = () => {
  const [approvedLeaves, setApprovedLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const { AccessToken } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const employeeId = user?.userId;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchApprovedLeaves = async () => {
      try {
        const response = await dispatch(approvedLeaveRequestsForEmployee(employeeId, AccessToken));
        console.log(response);
        const data = response.data;

        if (data.success) {
          setApprovedLeaves(data?.approvedLeaveRequests);
        }
      } catch (error) {
        console.error('Error fetching approved leave requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedLeaves();
  }, [dispatch, employeeId, AccessToken]);

  return (
    <div className='h-screen'>
      {loading ? <div className='flex flex-col items-center justify-center mt-56'><Spinner /></div> : (
        <div className='pb-9 bg-slate-100  rounded-md mb-5'>
          <div className='p-5 flex items-center justify-between'>
            <div className='text-xl text-slate-600 font-semibold'>
              Approved Leave Applications
            </div>
            <div>
              <p className='text-slate-950 text-xl left-6 font-semibold'>
                Home / Dashboard /
                <span className='text-yellow-700'> Approved Leave Applications</span>
              </p>
            </div>
          </div>
          <div className='p-10'>
            {approvedLeaves.length > 0 ? (
              <table className="min-w-full bg-white">
                <thead className="bg-slate-200 rounded-md">
                  <tr>
                    <th className="py-2 px-4 border-b-2 border-slate-600 text-left text-sm leading-4 text-black font-semibold uppercase tracking-wider">Employee ID</th>
                    <th className="py-2 px-4 border-b-2 border-slate-600 text-left text-sm leading-4 text-black font-semibold uppercase tracking-wider">Leave Type</th>
                    <th className="py-2 px-4 border-b-2 border-slate-600 text-left text-sm leading-4 text-black font-semibold uppercase tracking-wider">Start Date</th>
                    <th className="py-2 px-4 border-b-2 border-slate-600 text-left text-sm leading-4 text-black font-semibold uppercase tracking-wider">End Date</th>
                    <th className="py-2 px-4 border-b-2 border-slate-600 text-left text-sm leading-4 text-black font-semibold uppercase tracking-wider">Number of Days</th>
                    <th className="py-2 px-4 border-b-2 border-slate-600 text-left text-sm leading-4 text-black font-semibold uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {approvedLeaves.map((leave, index) => (
                    <tr key={index} className=''>
                      <td className="py-2 px-4 border-b border-slate-200">
                        <Link to={`/leave-info/${leave.employeeId}`}>
                          {leave.employeeId}
                        </Link>
                      </td>
                      <td className={`py-2 px-4 border-b border-slate-200 ${leave.leaveType === 'PLANNED' ? 'text-blue-600' : 'text-purple-600'}`}>
                        {leave.leaveType}
                      </td>
                      <td className="py-2 px-4 border-b border-slate-200">{leave.startDate}</td>
                      <td className="py-2 px-4 border-b border-slate-200">{leave.endDate}</td>
                      <td className="py-2 px-4 border-b border-slate-200">{leave.numberOfDays}</td>
                      <td className="py-2 px-4 border-b border-slate-200 text-green-600 ">Approved</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className='flex items-center justify-center'><p className='text-xl font-semibold text-zinc-700'>No approved leave requests.....</p></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovedLeaveList;
