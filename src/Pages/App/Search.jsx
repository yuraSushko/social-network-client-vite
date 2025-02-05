import axios from "axios";
import {useEffect, useState} from "react";
import * as c from '/src/Utils/Constants.js'
import {useNavigate} from "react-router-dom";

export default function Search(){
    const [users,setUsers] =useState()
    const [userNamePart,setUserNamePart]=useState()

    const getAllUsers= async ()=> {
        try{
            const response = await axios.get(c.API.SEARCH.USERS_LIKE_NAME_END_POINT,{
                params:{
                    userNamePart: userNamePart
                }
            })
            if(response.status === 200){
                console.log(response)
                setUsers(response.data.message)
            }
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {

        if(userNamePart &&  userNamePart.length>1) {
            getAllUsers()
        }
        else {
            setUsers()
        }
    }, [userNamePart]);


    const navigate = useNavigate()


    return(
        <div>
            <div>
                <label>search</label>
                <input type="text" onChange={event=> setUserNamePart(event.target.value)}/>
            </div>
            <div>
                {users &&(
                    <div>
                        {users.map((item,index)=>(
                            <button
                             key={index}
                             onClick={()=> navigate(`${c.ROUTES.PAGES.OTHERS_PROFILE_BASE}/${item.userId}/${item.userName}` ) }
                            >
                                {item.userName}
                                {item.userId}
                                { <img  style={{width: '100px', height: '100px'}} src={c.UTILITY.PNG_TO_URL_PREFIX+item.profilePic}/> }
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}