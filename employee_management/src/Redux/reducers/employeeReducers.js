import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    employeeList: [] // Optional: store success state
};

// Redux slice for the user
const EmployeeSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setEmployeeList: (state, action) => {
            state.employeeList = action.payload;
        },

    },
});

export const { setEmployeeList } = EmployeeSlice.actions;
export const EmployeeReducer = EmployeeSlice.reducer;
