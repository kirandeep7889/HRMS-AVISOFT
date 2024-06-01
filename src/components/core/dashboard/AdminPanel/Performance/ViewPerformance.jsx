import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EmployeePerformanceReviews } from "../../../../../services/operations/performanceAPI";
import toast from "react-hot-toast";
import Spinner from "../../../../common/Spinner";

const ViewPerformance = () => {
  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.profile);
  const { AccessToken } = useSelector((state) => state.auth);
  const employeeId = user?.userId;

  useEffect(() => {
    const employeeReviews = async () => {
      const response = await dispatch(
        EmployeePerformanceReviews(employeeId, AccessToken)
      );
      console.log(response);
      if (response?.status === 200) {
        setReviews(response?.data || []);
        setLoading(false);
      } else {
        toast.error("Error Loading Reviews");
      }
    };
    employeeReviews();
  }, [employeeId, dispatch, AccessToken]);

  const getRatingColor = (rating) => {
    switch (rating) {
      case "EXCELLENT":
        return "text-green-500";
      case "GOOD":
        return "text-blue-500";
      case "FAIR":
        return "text-yellow-500";
      case "POOR":
        return "text-orange-500";
      case "VERY_POOR":
        return "text-red-500";
      default:
        return "";
    }
  };

  const parseDateString = (dateString) => {
    const [datePart, timePart] = dateString.split(" ");
    const [day, month, year] = datePart.split("/");
    const [hours, minutes] = timePart.split(":");
    return new Date(year, month - 1, day, hours, minutes);
  };

  const formatDate = (dateString) => {
    const date = parseDateString(dateString);
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString();
  };

  return (
    <div className="h-screen">
      {loading ? (
        <div className="absolute grid place-content-center h-[70%] w-[85%]">
          <Spinner />
        </div>
      ) : (
        <div className="pb-9 bg-slate-100 shadow-md rounded-md mb-5">
          <div className="p-5 flex items-center justify-between">
            <div className="text-xl text-slate-600 font-semibold">
              View Performance Review
            </div>
            <div>
              <p className="text-slate-950 text-xl left-6 font-semibold">
                Home / Dashboard /
                <span className="text-yellow-700">
                  &nbsp; View Performance Review
                </span>
              </p>
            </div>
          </div>
          <div className="p-10">
            {reviews.length === 0 ? (
              <p className="text-center text-gray-500">No reviews available.</p>
            ) : (
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-3 px-4 border-b-2 border-slate-300 text-sm leading-4 text-black font-semibold uppercase tracking-wider text-center">
                      Reviewed By
                    </th>
                    <th className="py-3 px-4 border-b-2 border-slate-300 text-sm leading-4 text-black font-semibold uppercase tracking-wider text-center">
                      Rating
                    </th>
                    <th className="py-3 px-4 border-b-2 border-slate-300 text-sm leading-4 text-black font-semibold uppercase tracking-wider text-center">
                      Comment
                    </th>
                    <th className="py-3 px-4 border-b-2 border-slate-300 text-sm leading-4 text-black font-semibold uppercase tracking-wider text-center">
                      Review Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <tr
                      key={review.performanceId}
                      className={
                        review.performanceId % 2 === 0
                          ? "bg-gray-50"
                          : "bg-white"
                      }
                    >
                      <td className="py-3 px-4 border-b border-slate-200 text-center">{`${review.reviewerFirstName} ${review.reviewerLastName}`}</td>
                      <td
                        className={`px-3 py-4 border-b border-slate-200 text-center ${getRatingColor(
                          review.rating
                        )}`}
                      >
                        {review.rating}
                      </td>
                      <td className="py-3 px-4 border-b border-slate-200 text-center">
                        {review.comment}
                      </td>
                      <td className="py-3 px-4 border-b border-slate-200 text-center">
                        {formatDate(review.reviewDate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPerformance;
