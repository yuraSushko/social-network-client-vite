import axios from "axios";
import * as c from "../Utils/Constants.js";
import error from "eslint-plugin-react/lib/util/error.js";

export default class  ValidateToken{
    async  ValidateTokenApi(token,setUserName,cookies){
        if (!token){
            console.error("Token invalid",error);
            return;
        }
        console.log("token in validateapifunc",token)
        try{

            const response = await axios.post(`${c.serverUrl}${c.validateTokenEndPoint}`,{},
                {
                    headers:{
                    Authorization: `Bearer ${token}`
                    }
                }

            );
            console.log(response)

            if(response.data.success && setUserName){
                setUserName(response.data.message)
            }else {
                cookies.remove("token",{path: "/"});
                console.log("token is missing")
            }

        }catch (error){
            console.log("Error to fetching token: ", error);
        }
    }


}