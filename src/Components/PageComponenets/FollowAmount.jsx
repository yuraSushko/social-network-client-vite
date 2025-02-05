import {useEffect, useState} from "react";
import axios from "axios";
import * as c from "/src/Utils/Constants.js";

export default function FollowAmount(props) {
    const [followersAmt, setFollowersAmt] = useState()
    const [followingAmt, setFollowingAmt] = useState()


    const getFollows = async () => {
        const data = {
            userId: props.userId
        }
        console.log(data)

        const reqFollowing = axios.get(`${c.API.FOLLOW.FOLLOWING_AMT}`, {params: data})
        const reqFollowers = axios.get(`${c.API.FOLLOW.FOLLOWERS_AMT}`, {params: data})

        Promise.all([reqFollowing, reqFollowers])
            .then((response) => {
                console.log("following amt:",response[0] )
                console.log("follower amt:",response[1] )

                setFollowingAmt(response[0].data.message);
                 setFollowersAmt(response[1].data.message);
                //
                // console.log('Followers Count:', respFollowing);
                // console.log('Following Count:', respFollowers);
                // if (response.data.success) {
                //     console.log(response.data.message)
                //     setFollowing(response.data.message)
                // } else {
                //     alert(response.data.message)
                // }
            })
            .catch((error) => {
                // Handle errors if any of the requests fail
                console.error('Error fetching data:', error);
            });
        }

        useEffect(()=>{
            getFollows()
        },[props.rerender])

        return (
            <div>

                { (followingAmt!==null && followersAmt!==null ) &&(
                    <div>
                        <div>
                            followers {followersAmt}
                        </div>
                        <div>
                            following {followingAmt}
                        </div>

                    </div>


                )}
            </div>
        )

}