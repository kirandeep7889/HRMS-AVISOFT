import React from "react";
import { useForm } from "react-hook-form";
import { createLeave } from "../../../../services/operations/leaveAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const CreateLeave = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { AccessToken } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const employeeId = user?.userId;
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data);
    const response = dispatch(
      createLeave(employeeId, data, AccessToken, navigate)
    );
  };

  return (
    <div className="pb-9 bg-slate-100 rounded-md mb-5 ">
      <div className="p-5 flex items-center justify-between">
        <div className="text-xl text-slate-600 font-semibold">New Leave</div>
        <div>
          <p className="text-slate-950 text-xl left-6 font-semibold">
            Home / Dashboard /<span className="text-yellow-700">New Leave</span>
          </p>
        </div>
      </div>

      <form
        className="p-5"
        data-testid="create-leave-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="mt-4">
            <label
              htmlFor="leaveType"
              className="block text-sm font-semibold text-slate-900 mb-1"
            >
              Leave Type<sup className="text-red-900">*</sup>
            </label>
            <select
              id="leaveType"
              {...register("leaveType", { required: true })}
              className="bg-richblack-800 rounded-[0.5rem] w-full p-[12px] border-b-[1px] border-slate-800"
              data-testid="leave-type-select"
            >
              <option value="">Select Leave Type</option>
              <option value="PLANNED">Planned Leave</option>
              <option value="SICK">Medical Leave</option>
            </select>
            {errors.leaveType && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="mt-4">
            <label
              htmlFor="numberOfDays"
              className="block text-sm font-semibold text-slate-900 mb-1"
            >
              Number of Days<sup className="text-red-900">*</sup>
            </label>
            <input
              type="number"
              id="numberOfDays"
              {...register("numberOfDays", { required: true, min: 1 })}
              className="bg-richblack-800 rounded-[0.5rem] w-full p-[12px] border-b-[1px] border-slate-800"
              placeholder="Enter Number of Days"
              data-testid="number-of-days-input"
            />
            {errors.numberOfDays && (
              <span className="text-red-600">
                This field is required and must be at least 1 day
              </span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="mt-4">
            <label
              htmlFor="startDate"
              className="block text-sm font-semibold text-slate-900 mb-1"
            >
              Start Leave Date<sup className="text-red-900">*</sup>
            </label>
            <input
              type="date"
              id="startDate"
              {...register("startDate", { required: true })}
              className="bg-richblack-800 rounded-[0.5rem] w-full p-[12px] border-b-[1px] border-slate-800"
              data-testid="start-date-input"
            />
            {errors.startDate && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="mt-4">
            <label
              htmlFor="endDate"
              className="block text-sm font-semibold text-slate-900 mb-1"
            >
              End Leave Date<sup className="text-red-900">*</sup>
            </label>
            <input
              type="date"
              id="endDate"
              {...register("endDate", { required: true })}
              className="bg-richblack-800 rounded-[0.5rem] w-full p-[12px] border-b-[1px] border-slate-800"
              data-testid="end-date-input"
            />
            {errors.endDate && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="mt-4">
            <label
              htmlFor="leaveDetails"
              className="block text-sm font-semibold text-slate-900 mb-1"
            >
              Leave Details<sup className="text-red-900">*</sup>
            </label>
            <textarea
              id="reason"
              {...register("reason", { required: true })}
              className="bg-richblack-800 rounded-[0.5rem] w-full p-[12px] border-b-[1px] border-slate-800"
              placeholder="Enter Leave Details"
              data-testid="leave-details-input"
            ></textarea>
            {errors.leaveDetails && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-slate-900 text-white font-semibold py-2 px-4 rounded hover:bg-slate-800 mt-10"
          data-testid="submit-button"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateLeave;
