import React from "react";
import Cookies from "js-cookie";
import {Outlet} from "react-router-dom";

const NavBar = () => {

    const token = Cookies.get("tk");
    console.log(token);

    return (
        token ? (
            <div>
                <h1>NavBar</h1>
            </div>
        ) : (
            <Outlet />
        )
    );
};

export default NavBar;