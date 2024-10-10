import { api, authApi, getAuthorizationHeader } from "../../Api/api";
import { errorState, setPageLoader, setUserInfo, successState } from "../reducers/userReducers";

export const RegisterUser = (userEntry) => async (dispatch) => {
  try {
    // Set the page loader to true when starting the request
    dispatch(setPageLoader(true));
    
    // Make the API call to register the user
    const { data } = await api.post("/api/auth/register", userEntry);

    if (data) {
      // Store user info in localStorage
      localStorage.setItem("userInfo", JSON.stringify(data));

      // Dispatch success actions
      dispatch(setUserInfo(data));
      dispatch(successState("Registration successful")); // Pass a success message
    }

    // Stop the loader after the successful response
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

export const Login = (userEntry,navigate) => async (dispatch) => {
  try {
    // Set the page loader to true when starting the request
    dispatch(setPageLoader(true));
    
    // Make the API call to register the user
    const { data } = await api.post("/api/auth/login", userEntry);

    if (data) {
      // Store user info in localStorage
      localStorage.setItem("userInfo", JSON.stringify(data));

      // Dispatch success actions
      dispatch(setUserInfo(data));
      dispatch(successState("Logged In  successful")); // Pass a success message
      navigate("/home")
    }

    // Stop the loader after the successful response
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