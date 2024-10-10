import React, { useEffect } from 'react';
import classes from "./layout.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Backdrop, CircularProgress } from '@mui/material';
import { errorState, successState, userLogout } from '../Redux/reducers/userReducers';
import Headers from '../Components/Headers';


const DefaultLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, successMessage, loading } = useSelector((state) => state.user);
    useEffect(() => {
        const token = localStorage.getItem("userInfo");
        if (!token) {
            navigate("/login")
        }
    }, [navigate])

    useEffect(() => {
        if (successMessage) {
            console.log(successMessage);

            toast.success(successMessage, {
                className: 'custom-toast',
                onClose: () => dispatch(successState(null)),
                autoClose: 2000
            })
        }
        if (error) {
            console.log(error);
            toast.error(error, {
                className: 'custom-toast',
                onClose: () => dispatch(errorState(null)),
                autoClose: 2000
            })
        }
    }, [successMessage, error]);


    const handleLogout = () => {
        localStorage.removeItem("userToken");
        dispatch(userLogout());
        navigate("/login");
    };


    return (
        <div>
            <div className={classes.headerParent}>
                <Headers />
            </div>
            <div className={classes.MainBodyChildDiv}>
                <Outlet />
                <ToastContainer />
            </div>
            {loading &&
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            }
        </div>
    )
}

export default DefaultLayout