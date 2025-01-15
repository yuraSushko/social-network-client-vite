import {useContext, useState} from 'react';
import axios from "axios";
import * as c from "../Utils/Constants.js"
import { useNavigate} from "react-router-dom";
import Cookies from "universal-cookie"
// import { useAuth} from "../Components/AuthContext.jsx";
import {signUpRoute} from "../Utils/Constants.js";
export default function SignIn(){
    const [userName,setUserName]=useState("");
    const [password,SetPassword]=useState("");
    const [responseData,setResponseData]= useState("");
    // const { setIsSignedIn } =useAuth//useContext(AuthContext) ;


    const navigate = useNavigate();


    const handleNavigate=()=>{
        navigate(c.signUpRoute)
    }

    const handleSignIn  = async ()=> {
        try {
            const data = {
                userName: userName,
                password: password
            }
            const response = await axios.get(`${c.serverUrl}${c.signInEndPoint}`,{params:data} )
            if (response.status===200){
                // console.log(response.data.success,response.data.message)

                if(response.data.success){
                    setResponseData(response.data)
                    const cookie = new Cookies()
                    cookie.set("token",response.data.message,  {path:"/", expires: new Date(Date.now() + 60 * 60 * 1000)} )
                    // setIsSignedIn(true)
                    navigate("/Feed")


                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    return(
        <div>
            <div>
                <label>User Name</label>
                <input type={"text"} value={userName} onChange={event => setUserName(event.target.value)}/>
            </div>
            <div>
                <label>Password</label>
                <input type={'text'} value={password} onChange={event => SetPassword(event.target.value)}/>
            </div>
            <div>
                <small style={{color:"red"}}>
                    {/*erro messege from api login*/}
                    {responseData}
                </small>
            </div>

            <div>
                <button onClick={handleSignIn}>Sign In</button>
            </div>

            <div>
                <button onClick={()=>handleNavigate()}>Dont have an account yet</button>
            </div>
        </div>
    )


}