import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addDepartment, updateDepartment} from '../../../../../services/operations/departmentAPI';
import { useNavigate, useLocation } from 'react-router-dom';
import { EmployeeSearch } from '../../../../../services/operations/employeeAPI';

const CreateUpdateDepartment = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [searchResults, setSearchResults] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null);
  const [showRadio, setShowRadio] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { AccessToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const { isEditing, department } = location.state || { isEditing: false, department: null };

  useEffect(() => {
    if (isEditing && department) {
      setValue('department', department.department);
      setValue('description', department.description);
      if (department.manager) {
        setSelectedManager(department.manager);
        setShowRadio(true);
        setSearchResults(department.manager);
      }
    }
  }, [isEditing, department, setValue]);

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      managerId: selectedManager?.userId,
    };

    formData.navigate = navigate;
    formData.AccessToken = AccessToken;
    if (isEditing) {
      console.log(formData)
      await dispatch(updateDepartment(AccessToken,formData, department.departmentId));
    } else {
      await dispatch(addDepartment(formData));
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      const response = await dispatch(EmployeeSearch(AccessToken,searchTerm))
      const data = response.data;
      if (Array.isArray(data) && data.length > 0) {
        setSearchResults(data[0]);
        setShowRadio(true);
      } else {
        setSearchResults([]);
        setShowRadio(false);
      }
    } catch (error) {
      console.error('Error searching employees:', error);
    }
  };

  const handleSelectManager = (manager) => {
    setSelectedManager(manager);
  };

  return (
    <div className="pb-9 bg-slate-100 rounded">
      <div className="p-5 flex items-center justify-between">
        <div className="text-xl text-slate-600 font-semibold">
          {isEditing ? 'Edit Department' : 'Create Department'}
        </div>
        <div>
          <p className="text-slate-950 text-xl left-6 font-semibold">
            Home / Dashboard / <span className="text-yellow-700">{isEditing ? 'Edit Department' : 'Create Department'}</span>
          </p>
        </div>
      </div>
      <div className="container mx-auto mt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="department" className="block text-gray-700 text-sm font-bold mb-2">
              Department Name<sup className="text-red-900">*</sup>
            </label>
            <input type="text" required id="department" {...register('department')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
              Department Description<sup className="text-red-900">*</sup>
            </label>
            <input type="text" required id="description" {...register('description')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="employeeSearch" className="block text-gray-700 text-sm font-bold mb-2">
              Add Manager<sup className="text-red-900">*</sup>
            </label>
            <input
              data-testid="employeeSearch"
              type="text"
              id="employeeSearch"
              placeholder="Search employee for adding as manager.."
              onChange={(e) => handleSearch(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {showRadio && (
            <div className="mb-4">
              <input
                type="radio"
                id={`employee_${searchResults.userId}`}
                name="selectedEmployee"
                value={searchResults.userId}
                checked={selectedManager?.userId === searchResults.userId}
                onChange={() => handleSelectManager(searchResults)}
                className="mr-2"
              />
              <label
                htmlFor={`employee_${searchResults.userId}`}
                className={`text-gray-700 text-sm font-semibold ${showRadio ? 'cursor-pointer' : ''}`}
                data-testid={`search-result-item-label-${searchResults.userId}`}
              >
                {searchResults.firstName} {searchResults.lastName}
              </label>
            </div>
          )}
          <button
            type="submit"
            className={`text-center w-full text-sm md:text-base font-medium rounded-md leading-6 hover:scale-95 transition-all duration-200 ${
              loading ? 'bg-slate-900 text-white' : ' bg-blue-700 text-white'
            } py-1 px-5`}
          >
            {isEditing ? 'Update Department' : 'Create Department'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUpdateDepartment;
