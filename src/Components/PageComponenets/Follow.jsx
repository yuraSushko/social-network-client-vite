import axios from "axios";
import * as c from "/src/Utils/Constants.js";
import {useEffect, useState} from "react";
import FollowAmount from "./FollowAmount.jsx";

export default function Follow(props) {
    // const [fetchedFollowing,setFetchedFollowing]=useState(false)

    const [following, setFollowing] = useState()


    const CheckIfFollowing = async () => {
        const data = {
            userName: props.userName,
            userId: props.userId,
            userNameSearched: props.userNameSearched,
            userIdSearched: props.userIdSearched,
        }
        console.log(data)

        try {
            const response = await axios.get(`${c.API.FOLLOW.CHECK_IF_FOLLOWING}`, {params: data})
            console.log(response)
            if (response.status === 200) {
                if (response.data.success) {
                    console.log(response.data.message)
                    setFollowing(response.data.message)
                } else {
                    console.log(response.data.message)
                }
            }
        } catch (e) {
            console.log(e)
        }


    }


    useEffect(()=>{

        CheckIfFollowing()
    },[])//following





    const handleFollowAndUnFollow=async ()=>{
        const data = {
            follow: !following,
            userName: props.userName,
            userId: props.userId,
            userNameSearched: props.userNameSearched,
            userIdSearched: props.userIdSearched,
        }
        console.log(data)

        try {
            const response = await axios.post(`${c.API.FOLLOW.FOLLOWING_OR_UNFOLLOW}`, data)
            console.log(response)
            if (response.status === 200) {
                if (response.data.success) {
                    console.log(response.data.message)
                    setFollowing(prevState => !prevState)
                } else {
                    console.log(response.data.message)
                }
            }
        } catch (e) {
            console.log(e)
        }

    }



    return (
        <div>
            <div>
                <FollowAmount rerender={following} userId={props.userIdSearched/*props.userId*/}/>
            </div>
            {following !== null && (

                following ? (
                    <div>
                        <button onClick={() => handleFollowAndUnFollow()}>
                            UnFollow
                        </button>
                    </div>
                ) : (
                    <div>
                        <button onClick={() => handleFollowAndUnFollow()}>
                            Follow
                        </button>
                    </div>
                )
            )}
        </div>


    )


}