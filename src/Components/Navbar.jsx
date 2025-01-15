import {NavLink} from "react-router-dom";

export default function NavBar({isLoggedIn, onLogout}) {
    return (
        <nav className="navbar-container">
            <div className="navbar-content">

                <ul className="navbar-list">
                    {!isLoggedIn && (
                        <>
                            <li>
                                <NavLink
                                    to={"/SignIn"}
                                    className={({isActive}) =>
                                        isActive ? "nav-link active" : "nav-link"
                                    }
                                >
                                    <strong>Sign In</strong><br/>&nbsp;
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to={"/SignUp"}
                                    className={({isActive}) =>
                                        isActive ? "nav-link active" : "nav-link"
                                    }
                                >
                                    <strong> Sign Up</strong><br/>&nbsp;
                                </NavLink>
                            </li>

                        </>
                    )}

                    {isLoggedIn && (
                        <>

                            <li>
                                <NavLink
                                    to={"/Feed"}
                                    className={({isActive}) =>
                                        isActive ? "nav-link active" : "nav-link"
                                    }>
                                    <strong> Feed</strong><br/>&nbsp;
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to={"/MyProfile"}
                                    className={({isActive}) =>
                                        isActive ? "nav-link active" : "nav-link"
                                    }
                                >
                                    <strong>My Profile</strong><br/>
                                </NavLink>
                            </li>

                            <li>
                                <button className="logout-button" onClick={onLogout}>
                                    <span>Logout</span>
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}
