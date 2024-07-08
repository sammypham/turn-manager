import { NavLink, Outlet, useLocation } from 'react-router-dom';

import "./Header.css"

const dayjs = require('dayjs')


const logoutFunction = async () => {
    try {
        const response = await fetch('/auth/google/logout', {
            method: "GET"
        })
    } catch (error) {
        console.error(error);
    }
}

const Header = () => {
    const location = useLocation();

    return (
        <>
            <div className='site-header'>
                {
                    location.pathname !== '/businesses'
                    &&
                    <NavLink to={"/businesses"} className="login-button" style={{ margin: 10 }}>
                        Businesses
                    </NavLink>
                }
                <div style={{ height: "100%", alignContent: "center", padding: 10 }}>
                    {dayjs().format("ddd, MMMM D YYYY, hh:mm A")}
                </div>
                <NavLink to={"/login"} className="login-button" >
                    Login
                </NavLink>
                <button style={{ marginLeft: 10 }} className="login-button">
                
  
                <a href="/logout" class="link">Logout</a>
             
                </button>
      
            </div >
            <Outlet />
        </>
    )
}

export default Header;