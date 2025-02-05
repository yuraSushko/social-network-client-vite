import FetchPostsToDisplay from "/src/API/FetchPostsToDisplay.jsx";
import * as c from "/src/Utils/Constants.js";
import {useState} from "react";

export default function Feed(props) {
    const [reFetchMyPosts, setReFetchMyPosts] = useState(true)



    return(
        <div>
            Feed from Feed {c.API.POSTS.FEED_POSTS_END_POINT}?userId=
            {props.userId}
            <FetchPostsToDisplay postsEndPoint={ c.API.POSTS.FEED_POSTS_END_POINT} userId={props.userId} userName={props.userName}
                                 reFetchMyPosts={reFetchMyPosts}
                                 setReFetchMyPosts={setReFetchMyPosts}/>
        </div>
    )



}