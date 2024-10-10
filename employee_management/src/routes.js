import { Navigate, createBrowserRouter } from "react-router-dom";
import GuestLayout from "./Layouts/guestLayout";
import Index from "./Pages/Auth";
import HomeIndex from "./Pages/Home";
import DefaultLayout from "./Layouts/defaultLayout";
import EmployeeForm from "./Pages/Home/CreatePage";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/login" />,
            },
            {
                path: "/login",
                element: <Index />,
            },
            {
                path: "/signup",
                element: <Index />,
            },
        ],
    },
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/home" />,
            },
            {
                path: "/home",
                element: <HomeIndex />,
            },
            {
                path: "/employee/add",
                element: <EmployeeForm />,
            },
            {
                path: "/employee/edit/:id",
                element: <EmployeeForm />,
            },
        ]
    }    
]);

export default Router;