import {useNavigate} from "react-router-dom";
import * as c from "../Utils/Constants.js";
import Cookies from "universal-cookie"
import {useEffect, useState} from "react";


export default function Navbar(){
    const cookies = new Cookies();
    const [token,setToken]=useState();
    const  navigate = useNavigate();
    useEffect(() => {

    setToken(cookies.get("token"))
    }, [navigate ]);



    const timer = setInterval(() => {
        console.log("in navbar.jsx token", token);
    }, 1000);
    ()=>timer();

    const signOut=()=>{
        try{
            cookies.remove("token")
        }catch (e) {
            console.log("tried to remove token: ",e)
        }
    }




    const appNavBar=()=>{
        return (
            <div>
            <button onClick={()=> navigate(c.feedRoute)}> feed</button>

            <button onClick={()=> navigate(c.myProfileRoute)}> Profile</button>

            <button onClick={()=> signOut()}> logout</button>
            </div>
        )
    }


    return (
        <div>
            {token && (appNavBar())}


        </div>
    )
}