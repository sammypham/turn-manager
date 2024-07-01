import { Outlet } from 'react-router-dom'

import "./Header.css"

const Header = () => {
    return (
        <>
            <div className='site-header'>

            </div>
            <Outlet />
        </>
    )
}

export default Header;