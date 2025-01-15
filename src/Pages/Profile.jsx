import Post from "../Components/PageComponenets/Post.jsx";
import axios from "axios";
import * as c from "../Utils/Constants.js";
import {useEffect, useState} from "react";

export default function Profile(){
    const[posts,setPosts] = useState([])
    axios.defaults.withCredentials = true;
    const getPosts= async ()=> {
        try{
            const response = await axios.get(`${c.serverUrl}${c.myPostsEndPoint}`)
            if(response.status === 200){
                setPosts(response.data)
            }
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getPosts()
    }, []);


    const regularFeed=()=>{
        return (
            <div>
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
            </div>
        )
    }
    return(
        regularFeed()
    )


}