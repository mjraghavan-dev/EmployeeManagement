// configure axios create
import axios from "axios";
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// get token from state

const getToken = () => {
    if (localStorage.getItem("userToken")) {
        const obj = JSON.parse(localStorage.getItem("userToken"));
        return obj.accessToken
    } else {
        return null;
    }
};

const getAuthorizationHeader = () => `Bearer ${getToken()}`;

const authApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Authorization: getAuthorizationHeader(),
    },
});

const authImageApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data",
        type: "formData",
        Authorization: getAuthorizationHeader(),
    },
});

export { api, authApi, authImageApi, getAuthorizationHeader };
