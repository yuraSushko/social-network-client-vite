export default function Post(props){


    return(
        <>
            <label>props.caption</label>

            {/* eslint-disable-next-line react/prop-types */}
            <img src={props.photo}></img>

            <button>props.likes</button>
            <label>props.comments</label>

        </>
    )

}