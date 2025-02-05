import axios from "axios";
import * as c from "/src/Utils/Constants.js";
import {useEffect, useState} from "react";

export default function ProfilePic(props){
    const [profilePhoto, setProfilePhoto] = useState()
    const [profilePhotoFile, setProfilePhotoFile] = useState()

    const [changeProfilePic,setChangeProfilePic]=useState(false)

    const upload = async () => {
        const data = {
            userId: props.userId,
            profilePic: profilePhotoFile
        }
        try {


            const formData = new FormData();
            formData.append("userId", props.userId);
            formData.append("profilePic", profilePhotoFile);

            const response = await axios.post(`${c.API.USER.CHANGE_PROFILE_PIC}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response)
            if (response.status === 200) {
                if (response.data.success) {
                    getProfilePic()
                    console.log(response.data.message)
                    setChangeProfilePic(false)
                } else {
                    console.log(response.data.message)
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    const getProfilePic = async () => {

        try {
            const response = await axios.get(`${c.API.USER.GET_PROFILE_PIC}`,{params:{userId: props.userId}})
            console.log(response)
            if (response.status === 200) {
                if (response.data.success) {
                    setProfilePhoto(response.data.message)
                } else {
                    console.log(response.data.message)
                }
            }

         }catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getProfilePic()
    }, []);


    return (
        <div>

            {profilePhoto && (
                <div style={{width:'100px', height:'100px'}}>
                    profile pic:
                    <img src={c.UTILITY.PNG_TO_URL_PREFIX +profilePhoto } alt={c.ALT_IMG_BLANK}/>
                </div>
            )}

            {props.canChangeProfilePic &&(<div>
                <button onClick={() => setChangeProfilePic(prevState => !prevState)}> {changeProfilePic===true ? 'cancel' : 'change profile pic'}</button>
            </div>)}

            { changeProfilePic &&(
                <div>
                    <div>
                        <input type="file" id="imageInput" accept="image/*"
                               onChange={event => setProfilePhotoFile(event.target.files[0])}/>

                    </div>
                    <div>
                        <button onClick={() => upload()}>add</button>
                    </div>
                </div>
            )}


        </div>
    )
}