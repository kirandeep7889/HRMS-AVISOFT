import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employees: [],
  loading: false,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState: initialState,
  reducers: {
    addEmployees(state, action) {
      state.employees.push(action.payload);
    },
    updateEmployee(state, action) {
      const { id, updatedEmployeeData } = action.payload;
      const index = state.employees.findIndex(emp => emp.id === id);
      if (index !== -1) {
        state.employees[index] = { ...state.employees[index], ...updatedEmployeeData };
      }
    },
    deleteEmployee(state, action) {
      const idToDelete = action.payload;
      state.employees = state.employees.filter(emp => emp.id !== idToDelete);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { addEmployees, updateEmployee, deleteEmployee, setLoading } = employeeSlice.actions;
export default employeeSlice.reducer;
