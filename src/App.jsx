import './App.css'

import RouteManager from "./Components/RouteManager.jsx";
import {BrowserRouter} from "react-router-dom";


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




    return (
      <div>
          <BrowserRouter>

          <RouteManager/>
          </BrowserRouter>
      </div>
    )
}


/*

*/