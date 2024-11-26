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

    return (
        <div>
            <nav className="header bg-slate-200 flex justify-between itmes-center">
                <div className="logo w-1/4 text-center">
                    <NavLink to="/">Todo App</NavLink>
                </div>
                <div className="flex justify-between">
                    {
                        token ? (
                            <div className="flex itmes-center justify-center">
                                <p className="mr-5">Welcome, <span className="text-xl text-blue-800 capitalize"> {user.name} </span></p>
                            </div>
                        ) : (
                            <ul className="flex justify-end gap-3 w-3/4 pr-6">
                                <li>
                                    <NavLink to="/login">Login</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/register'>Register</NavLink>
                                </li>
                            </ul>
                        )
                    }
                </div>
            </nav>
            <Outlet />
        </div>
    );
}

export default Header;