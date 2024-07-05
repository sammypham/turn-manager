import { NavLink, Outlet } from 'react-router-dom'

import "./Header.css"

const dayjs = require('dayjs')

const logoutFunction = () => {

    window.location.href = "http://localhost:4000/auth/google/logout"
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
                <button className="logout" onClick={logoutFunction}>
                    logout    
                </button>
            </div >
            <Outlet />
        </>
    )
}

export default Header;