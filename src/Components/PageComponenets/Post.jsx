
import * as c from "/src/Utils/Constants.js";
import {useEffect, useState} from "react";
import axios from "axios";
export default function Post(props){
    // eslint-disable-next-line react/prop-types
    const [likesAmt,setLikesAmt]=useState(props.likes)
    const [likedPost,setLikedPost]=useState(null)
    const [likeObj,setLikeObj]=useState(null)

    const redHeart = "https://cdn-icons-png.freepik.com/128/833/833472.png"
    const blankHeart="https://cdn-icons-png.freepik.com/128/833/833300.png"



    useEffect(()=>{
        checkIfAlreadyLikePost()
    },[])


    const checkIfAlreadyLikePost = async ()=> {
        const params = {
            postId: props.postId,
            userId: props.userId
        }
        console.log('params',params)
        // axios.get(c.API.POSTS.CHECK_IF_LIKED_THE_POST,{params:params})
        //      .then(function (response) {
        //          setLikedPost(response.data.message)
        //      })
        //      .catch(function (error) {console.log(error)})

        try {
            const a = await axios.get(c.API.POSTS.CHECK_IF_LIKED_THE_POST, {params: params})
            setLikedPost(a.data.success)
            setLikeObj(a.data.message)
            console.log("resp CHECK_IF_LIKED_THE_POST", a)
        } catch (e) {
            console.log(e)
        }
    }

    const handleLikePost = async ()=>{
        // const now = new Date()
        console.log("likeObj",likeObj)
        let data = likeObj  ?? {
            postId: props.postId,
            userId: props.userId,
            likedTime:c.UTILITY.NOW //(now.toISOString()).replace('Z','')
        }
        console.log(data)
        console.log('handleLikePost likedPost ',likedPost)
        if(likedPost != null){
            const likeEndPint = likedPost ? c.API.POSTS.REMOVE_LIKE : c.API.POSTS.ADD_LIKE
            console.log('likeEndPint',likeEndPint)
            axios.post(likeEndPint,data)
                .then(function (response){
                    if(response.data.success){
                        axios.get(c.API.POSTS.GET_LIKE_AMOUNT,{ params: {postId:props.postId}})
                            .then(function ( likeAmtResponse){
                                const likeAmt = likeAmtResponse.data.message
                                console.log('likeAmt',likeAmt)
                                if(!isNaN(likeAmt)) {
                                    setLikesAmt( likeAmt)
                                    setLikedPost(prev=>!prev )
                                }
                                //checkIfAlreadyLikePost()
                            })
                            .catch(function (error) {console.log(error)})
                    }
                })
                .catch(function (error){console.log(error)})
        }

    }



        //TODO check if liked in repo on []


    return(
        <div>
            

            <div>
                {/* eslint-disable-next-line react/prop-types */}
                <label>caption: {props.caption}</label>
            </div>
            <div style={{width: '100px', height: '100px'}}>
                {/* eslint-disable-next-line react/prop-types */}
                <img src={c.UTILITY.PNG_TO_URL_PREFIX+props.photo} alt={c.ALT_IMG_BLANK}/>
            </div>
            <div>


                {/* eslint-disable-next-line react/prop-types */}
                <button onClick={()=> handleLikePost() } style={{backgroundColor:"transparent" ,padding:"3px",borderRadius:"25px" ,width:'30px',height:'30px'}}>
                    <div>
                        {/*<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"*/}
                        {/*     className="bi bi-heart" viewBox="0 0 16 16">*/}
                        {/*    <path*/}
                        {/*        d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>*/}
                        {/*</svg>*/}
                        <img  src={likedPost===true ? redHeart : blankHeart}/>
                        {/*"https://cdn-icons-png.freepik.com/128/833/833300.png"*/}
                    </div>
                    {likesAmt}
                </button>

             </div>
            <div>
                {/* eslint-disable-next-line react/prop-types */}
                <label>comments:</label>
                <label>{/*props.comments*/}</label>
            </div>

        </div>
    )

}