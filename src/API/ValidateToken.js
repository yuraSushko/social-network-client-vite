import axios from "axios";
import * as c from "../Utils/Constants.js";

export default class ValidateToken {
    async validateTokenApi(token, navigate, cookies,setUsername) {
        try {
            if (!token) {
                console.warn("Token is missing");
                return;
            }

            const response = await axios.post(
                `${c.serverUrl}/validateToken`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Fetched token details:", response.data);
            if (!response.data.valid) {
                cookies.remove("token", { path: "/" });
                navigate("/SingIn");
                console.log("Token is missing")
            }else {
                if (setUsername) {
                    setUsername(response.data.username);
                    return response.data.username
                }
            }
        } catch (error) {
            console.error("Error validating token:", error);
            cookies.remove("token", { path: "/" });
            navigate("/SingIn");        }
    }
}
