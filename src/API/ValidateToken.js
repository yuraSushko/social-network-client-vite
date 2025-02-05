import axios from "axios";
import * as c from "/src/Utils/Constants.js";

export default class ValidateToken {
    async validateTokenApi(token, navigate, cookies,setUserName,setUserId) {
        try {
            if (!token) {
                console.warn("Token is missing");
                return;
            }

            const response = await axios.post(


                `${c.API.USER.VALIDATE_TOKEN_END_POINT}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!response.data.valid) {
                cookies.remove("token", { path: "/" });
                navigate(c.ROUTES.AUTH.SIGN_IN);
            }else {
                if (setUserName && setUserId) {
                    setUserName(response.data.userName);
                    console.log("from token response.data.userName" ,response.data.userName)
                    setUserId(response.data.userId);
                    console.log("from token response.data.userId" ,response.data.userId)

                }
            }
        } catch (error) {
            console.error("Error validating token:", error);
            cookies.remove("token", { path: "/" });
            navigate(c.ROUTES.AUTH.SIGN_IN);
        }
    }
}
