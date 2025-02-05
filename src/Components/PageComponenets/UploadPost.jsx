import {useState} from "react";
import axios from "axios";
import * as c from "/src/Utils/Constants.js";

export default function UploadPost(props) {

    const [uploadingNewPost,setUploadingNewPost]= useState(false)
    const [postCaption, setPostCaption] = useState()
    const [postPhoto, setPostPhoto] = useState()
    axios.defaults.withCredentials = true;
    const upload = async () => {
        const data = {
            caption: postCaption,
            photo: postPhoto
        }
        console.log(data)
        try {
            const response = await axios.post(`${c.API.POSTS.ADD_POST_END_POINT}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            console.log(response)
            if (response.status === 200) {
                if (response.data.success) {
                    console.log(response.data.message)
                    props.setReFetchMyPosts(true)
                    setUploadingNewPost(false)
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
            {/*<div>
                <button onClick={() => props.setVisble(true)}> upload new</button>
            </div>
            {props.visble && (
                <div>
                    <div>
                        <button onClick={() => props.setVisble(false)}> back</button>
                    </div>
                    <div>
                        <input type="text" onChange={event => setPostCaption(event.target.value)}/>
                        <input type="file" id="imageInput" accept="image/*"
                               onChange={event => setPostPhoto(event.target.files[0])}/>
                    </div>
                    <div>
                        <button onClick={() => upload()}>add</button>
                    </div>
                </div>
            )}
            */}

            <div>
                <button onClick={() => setUploadingNewPost(prevState => !prevState)}> {uploadingNewPost===true ? 'cancel' : 'upload new post'}</button>
            </div>)

            { uploadingNewPost &&(
                <div>
                    <div>
                        <input type="text" onChange={event => setPostCaption(event.target.value)}/>
                        <input type="file" id="imageInput" accept="image/*"
                               onChange={event => setPostPhoto(event.target.files[0])}/>

                    </div>
                    <div>
                        <button onClick={() => upload()}>add</button>
                    </div>
                </div>
            )}

        </div>
    )
}