import { NavLink, Outlet, useLocation } from 'react-router-dom';
import useFetchUser from "../../utils/useFetchUser.js"
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

const loggedIn = (user) => {
    console.log(user.user)
    if (user.user) {
        return(
            <button style={{ marginLeft: 10 }} className="login-button">
                <a href="/logout" class="link">Logout</a>
         
            </button>
        )

    }
    else {
        return (  
            <NavLink to={"/login"} className="login-button" >
                  Login
              </NavLink>)
    }
}

const Header = () => {
    const location = useLocation();
    const user = useFetchUser();

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
                {loggedIn(user)}
                
            </div >
            <Outlet />
        </>
    );
}

export default Header;