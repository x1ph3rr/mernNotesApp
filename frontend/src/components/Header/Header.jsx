import React from "react";
import { useContext } from "react";
import { Outlet, NavLink } from "react-router-dom";
import TokenContext from '../../context/TokenContext';
import "./header.css";

function Header(){
    const token = localStorage.getItem("authToken");
    const {user} = useContext(TokenContext);
    console.log("user", user);
    const logout = () =>{
        localStorage.removeItem("authToken");
        window.location.href = "/login";
    }
}