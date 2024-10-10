import { api, authApi, getAuthorizationHeader } from "../../Api/api";
import dayjs from 'dayjs'; // Import moment to handle date formatting
import { setEmployeeList } from "../reducers/employeeReducers";
import { errorState, setPageLoader, setUserInfo, successState } from "../reducers/userReducers";
import moment from "moment";

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch(setPageLoader(true));
        const { data } = await api.get("/api/employees");

        if (data) {
            dispatch(setEmployeeList(data));
        }
        dispatch(setPageLoader(false));

    } catch (error) {
        const errorMessage = error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(errorState(errorMessage)); // Dispatch the error
        dispatch(setPageLoader(false)); // Ensure loader is stopped after an error
    }
};

export const addUser = (userEntry, navigate) => async (dispatch) => {
    try {
        dispatch(setPageLoader(true));
        const { data } = await api.post("/api/employees", userEntry, {
            headers: getAuthorizationHeader()
        });

        if (data) {
            dispatch(successState("User Added Successful")); // Pass a success message
            dispatch(getAllUsers())
            navigate("/home")
        }
        dispatch(setPageLoader(false));
    } catch (error) {
        // Handle errors, make sure to stop the loader
        const errorMessage = error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch(errorState(errorMessage)); // Dispatch the error
        dispatch(setPageLoader(false)); // Ensure loader is stopped after an error
    }
};

export const UpdateUser = (id, userEntry, navigate) => async (dispatch) => {
    try {
        console.log("Update Api Called");
        
        dispatch(setPageLoader(true));
        const { data } = await authApi.put(`/api/employees/${id}`, userEntry, {
            headers: getAuthorizationHeader()
        });

        if (data) {
            dispatch(successState("User Updated Successful")); // Pass a success message
            dispatch(getAllUsers())
            navigate("/home")
        }
        dispatch(setPageLoader(false));
    } catch (error) {
        // Handle errors, make sure to stop the loader
        const errorMessage = error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch(errorState(errorMessage)); // Dispatch the error
        dispatch(setPageLoader(false)); // Ensure loader is stopped after an error
    }
};

export const getOneEmployee = (id, setFormData) => async (dispatch) => {
    try {
        dispatch(setPageLoader(true));
        const { data } = await api.get(`/api/employees/${id}`, {
            headers: getAuthorizationHeader()
        });

        if (data) {
            const employeeData = {
                ...data,
                dob: data.dob ? dayjs(data.dob).format('MM/DD/YYYY') : null, // Ensure dob is a formatted date string
            };
            console.log(employeeData);
            setFormData(employeeData); // Update the formData
        }
        dispatch(setPageLoader(false));
    } catch (error) {
        // Handle errors, make sure to stop the loader
        const errorMessage = error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch(errorState(errorMessage)); // Dispatch the error
        dispatch(setPageLoader(false)); // Ensure loader is stopped after an error
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch(setPageLoader(true));
        const { data } = await api.delete(`/api/employees/${id}`, {
            headers: getAuthorizationHeader()
        });

        if (data) {
            dispatch(successState("User Deleted Successful")); // Pass a success message
            dispatch(getAllUsers())
        }
        dispatch(setPageLoader(false));
    } catch (error) {
        // Handle errors, make sure to stop the loader
        const errorMessage = error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch(errorState(errorMessage)); // Dispatch the error
        dispatch(setPageLoader(false)); // Ensure loader is stopped after an error
    }
}