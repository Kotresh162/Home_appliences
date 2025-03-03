import React from "react"
import Register from "../components/register/register_page"
import Login from "../components/login/login_page"
import Homepage from "../components/home/home_page"
import EnergyDashboard from "../components/dashbord/dashbord_page"

const route = [
    {path: "/" ,element:<Homepage/>},
    {path: "/signin" ,element:<Login/>},
    {path: "/register" ,element:<Register/>},
    {path: "/dashbord" ,element:<EnergyDashboard/>},
];
export default route;