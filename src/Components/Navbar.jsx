import {NavLink} from "react-router-dom";
import * as c from "/src/Utils/Constants.js";

// <ul className="nav nav-tabs">
//     <li className="nav-item">
//         <a className="nav-link active" aria-current="page" href="#">Active</a>
//     </li>
//     <li className="nav-item">
//         <a className="nav-link" href="#">Link</a>
//     </li>
//     <li className="nav-item">
//         <a className="nav-link disabled" aria-disabled="true">Disabled</a>
//     </li>
// </ul>

export default function NavBar({isLoggedIn, onLogout}) {

    const loggedInNavbar=()=>{
        return (
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <NavLink
                        className={({isActive}) => (isActive ? "nav-link active" : "nav-link")}
                        to={c.ROUTES.PAGES.FEED}
                        aria-current="page"
                    >
                        Feed
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        className={({isActive}) => (isActive ? "nav-link active" : "nav-link")}
                        to={c.ROUTES.PAGES.SEARCH}
                        aria-current="page"
                    >
                        Search
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        className={({isActive}) => (isActive ? "nav-link active" : "nav-link")}
                        to={c.ROUTES.PAGES.MY_PROFILE}
                        aria-current="page"
                    >
                        My Profile
                    </NavLink>
                </li>

                <li className="nav-item">
                    <button className=" btn btn-outline-danger" onClick={onLogout} aria-current="page">
                        Logout
                    </button>
                </li>
            </ul>

        )
    }


    const loggedOutNavbar = () => {
        return (
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <NavLink
                        className={({isActive}) => (isActive ? "nav-link active" : "nav-link")}
                        to={c.ROUTES.AUTH.SIGN_IN}
                        aria-current="page"
                    >
                        Sign In
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        className={({isActive}) => (isActive ? "nav-link active" : "nav-link")}
                        to={c.ROUTES.AUTH.SIGN_UP}
                        aria-current="page"
                    >
                        Sign Up
                    </NavLink>
                </li>
            </ul>
        )
    }


    return (

        // <nav className="navbar-container">
            <div >
                {isLoggedIn && (loggedInNavbar())}
                {!isLoggedIn && (loggedOutNavbar())}
            </div>
        // </nav>
    );


}
