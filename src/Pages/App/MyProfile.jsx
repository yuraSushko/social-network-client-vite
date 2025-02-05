// import Post from "../Components/PageComponenets/Post.jsx";
// import {useEffect, useState} from "react";
// import axios from "axios";
import * as c from "/src/Utils/Constants.js";
import FetchPostsToDisplay from "/src/API/FetchPostsToDisplay.jsx"
import UploadPost from "/src/Components/PageComponenets/UploadPost.jsx";
import {useState} from "react";
import ProfilePic from "/src/Components/PageComponenets/ProfilePic.jsx";
import FollowAmount from "/src/Components/PageComponenets/FollowAmount.jsx";

export default function MyProfile(props) {
    const [postUploadVisible, setPostUploadVisible] = useState(false)
    const [reFetchMyPosts, setReFetchMyPosts] = useState(true)


    return (

        <div>
            <div>
                <FollowAmount userId={props.userId}/>
            </div>

            <div>
                <ProfilePic userId={props.userId} canChangeProfilePic={true}/>

            </div>

            <div>
                <UploadPost /*setVisble={setPostUploadVisible} visble={postUploadVisible}*/ reFetchMyPosts={reFetchMyPosts}
                            setReFetchMyPosts={setReFetchMyPosts}/>

                <FetchPostsToDisplay postsEndPoint={c.API.POSTS.MY_POSTS_END_POINT} userId={props.userId}
                                     userName={props.userName} reFetchMyPosts={reFetchMyPosts}
                                     setReFetchMyPosts={setReFetchMyPosts}/>

            </div>
        </div>

    )

    /*const[posts,setPosts] = useState([])
    axios.defaults.withCredentials = true;
    const getPosts= async ()=> {
        try{
            const response = await axios.get(`${c.API.POSTS.MY_POSTS_END_POINT}`)
            if(response.status === 200){
                console.log(response)
                setPosts(response.data.message)
                console.log("posts",response.data)
            }
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getPosts()
    }, []);



    const regularFeed=()=>{
        return(<div>
            {posts && posts.length > 0 && (
                posts.map((item,index) => (
                    <div key={index}>
                        <Post
                            caption={item.caption}
                            photo={item.photo  }
                            likes={item.likes}
                            comments={item.comments}
                        />

                    </div>


                ))

            )

            }
        </div>)
    }
    return(
        regularFeed()
    )
*/

}

{/* <div>
                {
                    posts && posts.length > 0 && (
                        posts.map((item) => {
                            <div>
                                {<Post caption={item.caption} photo={item.photo} likes={item.likes}
                                       comments={item.comments}/>}
                            </div>

                        })

                    )

                }
            </div> */
}