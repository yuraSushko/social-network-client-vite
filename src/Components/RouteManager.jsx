import {Route, Routes, useNavigate} from "react-router-dom";

import Feed from "../Pages/Feed.jsx";
import Profile from "../Pages/Profile.jsx";
import SignIn from "../Pages/SignIn.jsx";
import SignUp from "../Pages/SignUp.jsx";
import Cookies from "universal-cookie";
import {useEffect, useState} from "react";
import ValidateToken from "../API/ValidateToken.js";
import NavBar from "./Navbar.jsx";

export default function RouteManager(){
    const cookies = new Cookies();
    const token = cookies.get("token");
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    console.log("home page token check", token);


    const fetchToken = async ()=> {
        try {
            const api = new ValidateToken();
            await api.validateTokenApi(token,navigate,cookies,setUsername);
        }catch (error){
            console.log("Error to fetching token",error);
        }
    }


    useEffect(() => {
        if (token) {
            fetchToken();
            console.log("check login")
            console.log("Username passed to manger:", username);
        }
    }, [token, navigate, cookies,username]);


    const handleLogout = () => {
        cookies.remove("token", {path: "/"});
        navigate("/SignIn");
    };



    return (
        <>
            <NavBar isLoggedIn={!!token} onLogout={handleLogout}/>

                <Routes>
                    {!token &&(
                        <>
                            <Route path="/SignIn" element={<SignIn onLogin={() => navigate("/Feed")}/>}/>
                            <Route path={"/SignUp"} element={<SignUp/>}/>

                        </>
                    )}
                    {token &&(
                        <>
                            <Route path={"/Feed"} element={<Feed/>}/>
                            <Route path={"/MyProfile"} element={<Profile/>}/>
                        </>
                    )}
                </Routes>
        </>
    );
}