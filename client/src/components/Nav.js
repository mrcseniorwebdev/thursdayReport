import React from "react";
import { Link, useLocation } from "react-router-dom"
import { NavLogo, LogoutSvg } from "./svg"
// import { appLogout } from '../utils/requests'


const Nav = () => {
    const localhost = process.env.NODE_ENV === 'development' ? 'https://0f60-8-18-52-2.ngrok.io' : ''

    const location = useLocation()
    console.log(location)

    // the only reason this is here is so i can save them.. 
    // I honestly dont think this is neccesary.. we shall see
    

    return (
        <div className="app-nav-items">
            <div className="harryLogo">
                <img src="/assets/many_megan.png" alt="big Harry" />
            </div>
            <div className="nav-header">
                <h1>
                    <span>
                        Thursday
                    </span>
                    <span>
                        Report
                    </span>
                </h1>
                <NavLogo />
            </div>
            <nav>
                <ul>
                    <li className={
                        "/dashboard/main" === location.pathname
                            ? "active blue"
                            : ""
                    }>
                        <Link to="/dashboard/main" >
                            Generate Report
                        </Link>
                    </li>
                    <li className={
                        "/dashboard/settings" === location.pathname
                            ? "active red"
                            : ""
                    }>
                        <Link to="/dashboard/settings">Settings</Link>
                    </li>
                    {/* <li className={
                        "/dashboard/help" === location.pathname
                            ? "active blue"
                            : ""
                    }>
                        <Link to="/dashboard/help">Help</Link>
                    </li> */}
                </ul>
            </nav>
            <div className="nav-buttons">
                {/* <button onClick={handleLogout} className="redStrokeLink hoverAnim"><LogoutSvg /><span>Logout</span></button> */}

                <a href={`${localhost}/auth/logout`} className="redStrokeLink hoverAnim"><LogoutSvg /><span>Logout</span></a>
               
            </div>
        </div>
    )
}

export default Nav
