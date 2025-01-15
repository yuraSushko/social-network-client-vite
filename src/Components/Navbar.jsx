import {useNavigate} from "react-router-dom";
import * as c from "../Utils/Constants.js";
import Cookies from "universal-cookie"




export default function Navbar(){
    const cookies = new Cookies();
    const token = cookies.get("token");
    const  navigate = useNavigate();
    console.log("NAVBAR TOKEN " + token)

    const signOut=()=>{
        try{
            cookies.remove("token",{path: "/"})
            navigate("/")
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
            {/*{token && (appNavBar())}*/}
            {appNavBar()}

        </div>
    )
}