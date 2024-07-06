import { NavLink, Outlet } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

import "./Header.css"

const dayjs = require('dayjs')

const logoutFunction = async () => {
    googleLogout();

    try {
        const response = await fetch('/auth/google/logout', {
            method: "GET"
        })
    } catch (error) {
        console.error(error);
    }
}

const Header = () => {
    return (
        <>
            <div className='site-header'>
                <div style={{ height: "100%", alignContent: "center", padding: 10 }}>
                    {dayjs().format("ddd, MMMM D YYYY, hh:mm A")}
                </div>
                <NavLink to={"/login"} className="login-button" >
                    Login
                </NavLink>
                <button style={{ marginLeft: 10 }} className="login-button" onClick={logoutFunction}>
                    Logout
                </button>
            </div >
            <Outlet />
        </>
    )
}

export default Header;