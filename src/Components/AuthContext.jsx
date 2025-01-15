// import {createContext, useContext, useEffect, useState} from "react";
// import Cookies from "universal-cookie";
// import axios from "axios";
// import * as c from "../Utils/Constants.js"
//
// export const AuthContext = createContext();
//
// // eslint-disable-next-line react/prop-types
// export const AuthProvider = ({ children }) => {
//     Cookies.get("authToken");
//     const [isSignedIn, setIsSignedIn] = useState(false);
//
//
//     return (
//         <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
//
// // export const useAuth = () => useContext(AuthContext);

// import Cookies from "js-cookie";
import Cookies from "universal-cookie"
import {createContext, useContext, useState} from "react";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const cookie = new Cookies();
    const initToken= cookie.get("token");
    const [token, setToken] = useState(initToken)

    const clearToken=()=>{
        cookie.remove("token")
    }

    //
    // const login = (newToken) => {
    //     setToken(newToken);
    //     Cookies.set("token", newToken, { expires: 7 }); // Expires in 7 days
    // };
    //
    // const logout = () => {
    //     setToken(null);
    //     Cookies.remove("token");
    // };

    return (
        <AuthContext.Provider value={{ token/*, login, logout */}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
