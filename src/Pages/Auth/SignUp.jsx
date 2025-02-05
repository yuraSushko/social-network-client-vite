import  {useState} from 'react';
import axios from "axios";
import * as c from "/src/Utils/Constants.js";
import { useNavigate} from "react-router-dom";
import  defaultProfilePic from '/src/Utils/Photos/defaultPorfilePic.png'

export default function SignUp(){
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [errorUserName, setErrorUserName] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorRePassword, setErrorRePassword] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPhoneNumber, setErrorPhoneNumber] = useState("");

    const [responseData,setResponseData]= useState("");

    const navigate = useNavigate();

    // const handleNavigate=()=>{
    //     console.log("Navigate  signIn")
    //     navigate("/signIn")
    // }
    const handleSignUp  = async ()=> {
       if(checkUserName() &&
          checkPassword() &&
          checkRePassword() &&
          checkEmailIsValid() &&
          checkPhoneNumber() &&
          await createUser()
         ){
           console.log("created user")
       }
    }



    const checkStr = (str) => {
        return str !== null && str !== ""
    }

    const checkUserName = () => {
        let valid = true
        if(checkStr(userName) && userName.length>=3 && userName.length<=20 && !userName.includes(";")){
            setErrorUserName("")
        }
        else {
            setErrorUserName("userName should be between 3 abd 20 ")
            valid= false

        }
        return valid

    }
    const checkEmailIsValid=()=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let valid = true
        if(emailRegex.test(email)){
            setErrorEmail("");
        }else{
            setErrorEmail("Invalid Email");
            valid = false
        }
        return valid
    }

    const checkPassword=()=>{
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W_]).+$/;
        let valid = true
        if(checkStr(password)  && (password.length>= 6 && password.length<=8)) {
            setErrorPassword("")
            if (regex.test(password)){
                setErrorPassword("")
            }else {
                setErrorPassword("password should include at list one english letter, digit, special character")
                valid=false
            }
        }else {
            setErrorPassword("password should have 6 - 8 characters");
            valid = false
        }

        return valid

    }

    const checkRePassword=()=>{
        let valid = true
        if( checkStr(rePassword) && rePassword === password){
            setErrorRePassword("")
        }else {
            setErrorRePassword("passwords dont match")
            valid = false
        }
        return valid
    }

    const checkPhoneNumber = () => {
        const regex = /^[0-9]{10,15}$/; // Adjust length based on your requirement
        let valid = true
        if (regex.test(phoneNumber)){
            setErrorPhoneNumber("")
        }else{
            setErrorPhoneNumber("invalid phoneNumber")
            valid = false
        }
        return valid
    };



    const createUser= async ()=>{



        try {


            const user = {
                userName: userName,
                password: password,
                email: email,
                phoneNumber: phoneNumber,
            }

            const  response = await axios.post(`${c.API.USER.SIGN_UP_END_POINT}`, user)

            if(response.status===200){
                response.data.success ? navigate(c.ROUTES.AUTH.SIGN_IN) : setResponseData(response.data.message)
                return response.data.success
            }
        } catch (e) {
            console.log(e)
            return false
        }
    }

    return(
        <div>
            <div>
                <label>User Name</label>
                <input type={"text"} value={userName} onChange={event => setUserName(event.target.value)}/>
                <small style={{color:"red"}}> {errorUserName}</small>
            </div>
            <div>
                <label>Password</label>
                <input type={'text'} value={password} onChange={event => setPassword(event.target.value)}/>
                <small style={{color:"red"}}> {errorPassword}</small>
            </div>
            <div>
                <label>Renter Password</label>
                <input type={'text'} value={rePassword} onChange={event => setRePassword(event.target.value)}/>
                <small style={{color:"red"}}> {errorRePassword}</small>
            </div>

            <div>
                <label>Email</label>
                <input type={"text"} value={email} onChange={event => setEmail(event.target.value)}/>
                <small style={{color:"red"}}> {errorEmail}</small>
            </div>
            <div>
                <label>Phone Number</label>
                <input type={"text"} value={phoneNumber} onChange={event => setPhoneNumber(event.target.value)}/>
                <small style={{color:"red"}}> {errorPhoneNumber}</small>
            </div>
            <div>
                <small style={{color: "red"}}>
                    {/*erro messege from api login*/}
                    {responseData}
                </small>
            </div>

            <div>
                <button onClick={handleSignUp}>Sign Up</button>
            </div>
        </div>
    )


}