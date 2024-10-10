import { Backdrop, CircularProgress } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from "react-router-dom";
import { errorState, successState } from '../Redux/reducers/userReducers';

const GuestLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, successMessage, loading } = useSelector((state) => state.user);

    useEffect(() => {
        if (successMessage) {
            console.log(successMessage);
            
            toast.success(successMessage, {
                className: 'custom-toast',
                onClose: () => dispatch(successState(null)),
                autoClose: 2000
            })
        }
        if(error){
            console.log(error);
            toast.error(error, {
                className: 'custom-toast',
                onClose: () => dispatch(errorState(null)),
                autoClose: 2000
            })
        }
    }, [successMessage, error]);

    useEffect(() => {
        console.log(error);
        const token = localStorage.getItem("userInfo");
        if (token) {
            navigate("/home")
        }
    }, [])

    return (
        <div>
            <Outlet />
            <ToastContainer /> 
            {loading &&
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            }
        </div>
    );
}

export default GuestLayout