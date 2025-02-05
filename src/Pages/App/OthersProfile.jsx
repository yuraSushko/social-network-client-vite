import * as c from "/src/Utils/Constants.js";
import FetchPostsToDisplay from "/src/API/FetchPostsToDisplay.jsx"

import {useParams} from "react-router-dom";
import Follow from "/src/Components/PageComponenets/Follow.jsx";
import ProfilePic from "/src/Components/PageComponenets/ProfilePic.jsx";
import {useState} from "react";

export default function OthersProfile(props) {
    const {userIdSearched, userNameSearched} = useParams();
    const [reFetchMyPosts, setReFetchMyPosts] = useState(true)

    return (
        <div>
            <div>
                <Follow userIdSearched={userIdSearched} userNameSearched={userNameSearched} userId={props.userId}
                        userName={props.userName}/>
            </div>

            <div>
                <ProfilePic userId={/*props.userId*/ userIdSearched} canChangeProfilePic={false}/>
            </div>


            <div>

                <FetchPostsToDisplay postsEndPoint={c.API.POSTS.MY_POSTS_END_POINT} userId={userIdSearched}
                                     reFetchMyPosts={reFetchMyPosts}
                                     setReFetchMyPosts={setReFetchMyPosts}
                                     userName={userNameSearched}/>
            </div>
        </div>
    )

}