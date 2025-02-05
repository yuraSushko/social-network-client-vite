import {Navigate, Route, Routes, useNavigate} from "react-router-dom";

import Feed from "/src/Pages/App/Feed.jsx";
import MyProfile from "/src/Pages/App/MyProfile.jsx";
import SignIn from "/src/Pages/Auth/SignIn.jsx";
import SignUp from "/src/Pages/Auth/SignUp.jsx";
import Cookies from "universal-cookie";
import {useEffect, useState} from "react";
import ValidateToken from "/src/API/ValidateToken.js";
import NavBar from "./Navbar.jsx";
import * as c from "/src/Utils/Constants.js";
import Search from "/src/Pages/App/Search.jsx";
import OthersProfile from "/src/Pages/App/OthersProfile.jsx";

export default function RouteManager(){
    const cookies = new Cookies();
    const token = cookies.get("token");
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");


    const fetchToken = async ()=> {
        try {
            const api = new ValidateToken();
            await api.validateTokenApi(token,navigate,cookies,setUserName,setUserId);
        }catch (error){
            console.log("Error to fetching token",error);
        }
    }


    useEffect(() => {
        if (token) {
            fetchToken();
        }
    }, [token, navigate, cookies,userName]);


    const handleLogout = () => {
        cookies.remove("token", {path: "/"});
        navigate(c.ROUTES.AUTH.SIGN_IN);
    };



    return (
        <>
            <NavBar isLoggedIn={!!token} onLogout={handleLogout}/>

                <Routes>
                    {!token &&(
                        <>
                            <Route path={"/"} element={<Navigate to={c.ROUTES.AUTH.SIGN_IN} replace /> } />
                            <Route path={c.ROUTES.AUTH.SIGN_IN} element={<SignIn onLogin={() => navigate("/Feed")}/>}/>
                            <Route path={c.ROUTES.AUTH.SIGN_UP} element={<SignUp/>}/>

                        </>
                    )}
                    {token &&(
                        <>
                            <Route path={c.ROUTES.PAGES.FEED} element={<Feed userId={userId} userName={userName}/>}/>
                            <Route path={c.ROUTES.PAGES.MY_PROFILE} element={<MyProfile userId={userId} userName={userName}/>}/>
                            <Route path={c.ROUTES.PAGES.SEARCH} element={<Search userId={userId}/> } />
                            <Route path={c.ROUTES.PAGES.OTHERS_PROFILE} element={<OthersProfile  userId={userId} userName={userName}/>}/>
                        </>
                    )}
                </Routes>
        </>
    );
}