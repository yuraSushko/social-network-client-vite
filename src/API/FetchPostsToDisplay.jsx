import Post from "../Components/PageComponenets/Post.jsx";
import axios from "axios";
import {useEffect, useState} from "react";
import * as c from "/src/Utils/Constants.js";
// import FileParser from "../Utils/FileParser.js";

export default function FetchPostsToDisplay(props) {

    //TODO add const to check if kiked at start pass to check liekds amt and to post
    const [posts, setPosts] = useState([])

    axios.defaults.withCredentials = true;
    const getPosts = async () => {
        try {
            const response = await axios.get(props.postsEndPoint, {params: {userId: props.userId}})
            if (response.status === 200) {
                console.log(response)
                setPosts(response.data.message)
            }
        } catch (e) {
            console.log(e)
        }
    }


    const handleGetPosts = async () => {
        if (props.reFetchMyPosts) {
            let resp = await getPosts()
            props.setReFetchMyPosts(false)
            return resp
        }
    }

    useEffect(() => {
        handleGetPosts()
    }, [props.reFetchMyPosts]);





    const regularFeed = () => {
        return (
            <div>
            {posts && posts.length > 0 && (
                posts.map((item, index) => (
                    <div key={item.postId}>
                        <Post
                            caption={item.caption}
                            photo={item.photo}
                            likes={item.likes}
                            comments={item.comments}
                            postId={item.postId}
                            userId={props.userId}
                        />
                    </div>
                ))
            )}
            </div>
        )
    }

    return (
        regularFeed()
    )

}



