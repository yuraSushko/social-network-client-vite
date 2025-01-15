import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Feed from "../Pages/Feed.jsx";
import * as c from "../Utils/Constants.js";
import Profile from "../Pages/Profile.jsx";
import SignIn from "../Pages/SignIn.jsx";
import SignUp from "../Pages/SignUp.jsx";
import Cookies from "universal-cookie";
import {useEffect, useState} from "react";
import ValidateToken from "../API/ValidateToken.js";

export default function RouteManager(){
    const cookies = new Cookies();
    const [userName,setUserName] = useState("");
    const token = cookies.get("token");
    console.log(token , "ssssss")

    const fetchToken= async ()=>{
        try{
            const api = new ValidateToken();
            await api.ValidateTokenApi(token,setUserName,cookies)
        }catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        console.log("checking if there is token routemanger",token)
        if(token){
            fetchToken()
            console.log("Hello", userName)
        }
        else{console.log("no token")}
    }, [token, setUserName, cookies, userName]);






    return (
        <div>

                <Navbar/>


                <Routes>
                    {token &&(
                        <>
                            <Route path={c.feedRoute} element={<Feed/>}/>
                            {/*<Route path={c.feedRoute} element={<Feed/>}/>*/}
                            <Route path={c.myProfileRoute} element={<Profile/>}/>
                            {/*//TODO make profile for me and other users just change endPoint */}
                        </>
                    )}
                    {!token &&(
                        <>
                            <Route path="/" element={<SignIn/>}/>
                            {/*<Route path={c.signInRoute} element={<SignIn/>}/>*/}
                            <Route path={c.signUpRoute} element={<SignUp/>}/>
                        </>
                    )}
                </Routes>




        </div>
    )


}