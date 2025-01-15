import './App.css'
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import SignIn from "./Pages/SignIn.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Feed from "./Pages/Feed.jsx";
import Profile from "./Pages/Profile.jsx";
import * as c from "/src/Utils/Constants.js"
import Navbar from "./Components/Navbar.jsx";
import Cookies from "universal-cookie";


export default function App() {
    // const cookies = new Cookies();
    // const token = cookies.get("token");
    // const navigate = useNavigate();
    //
    // useEffect(() => {
    //     if (token) {
    //         console.log("Home page token: ", token)
    //     } else {
    //         navigate("/")
    //     }
    // }, [token, cookies,navigate]);


//         try {
//             fetch("http://localhost:8080/api/testAlive", {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                 } //,  credentials: "include", // Include credentials like cookies (optional)
//             })
//                 .then(response => {
//                     if (!response.ok) {
//                         throw new Error(`HTTP error! status: ${response.status}`);
//                     }
//                     return response.text();
//                 })
//                 .then(data => console.log(data))
//                 .catch(error => console.error("Error:", error));
//
//

//            const data =fetch("http://localhost:8080/api/testAlive") //await axios.get("http://localhost:8080/api/testAlive")
    //          console.log(data)
    //
    //       }catch (e) {
    //           console.log(e)
    //       }
    // const { token } = useAuth()//useContext(AuthContext);


    const cookie = new Cookies();
    const token = cookie.get("token")

    const timer = setInterval(() => {
        console.log("in app.jsx token", token);
    }, 3000);
   ()=>timer();

    return (
        <div>
            <BrowserRouter>

                <Navbar/>


                <Routes>
                    {token &&(
                    <>
                    <Route path={"/"} element={<Feed/>}/>
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


            </BrowserRouter>


        </div>
    )
}


/*

*/