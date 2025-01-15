import * as c from "../Utils/Constants.js"
import axios from "axios";
import {useEffect, useState} from "react";
import Post from "../Components/PageComponenets/Post.jsx";
export default function Feed(){
    const[posts,setPosts] = useState([])
    const [addingPost,setAddingPost]=useState(false)
    const [postCaption,setPostCaption]=useState()
    const [postPhoto,setPostPhoto]=useState()
    axios.defaults.withCredentials = true;

    const getPosts= async ()=> {
        try{
        const response = await axios.get(`${c.serverUrl}${c.feedPostsEndPoint}`)
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
                <button onClick={()=>setAddingPost(true)}> Add Post</button>
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

    const postPost=async ()=>{
        const data={
            caption:postCaption,
            photo:postPhoto
        }
        try {
            const response = await axios.post(`${c.serverUrl}${c.addPostEndPoint}`, data)
            console.log(response)
            if (response.status === 200) {
                if (response.data.success) {
                    console.log(response.data.message)
                }else{
                    alert(response.data.message)
                }
            }
        }catch (e) {
            console.log(e)
        }
    }


    const addPostFeed=()=>{
        return(
            <div>
                <div>
                <button onClick={()=>setAddingPost(false)}> back </button>
                </div>
                <div>
                    <input type="text" onChange={event =>  setPostCaption(event.target.value)}/>
                    <input type="file" id="imageInput" accept="image/*" onChange={event =>  setPostPhoto(event.target.value)}/>
                </div>
                <div>
                    <button onClick={()=> postPost()} >add</button>
                </div>
            </div>

        )
    }


    return (

        <div>
            {addingPost ? addPostFeed() : regularFeed() }
        </div>

    )

}