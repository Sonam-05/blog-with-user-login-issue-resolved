import React, { memo, useState } from 'react'
import '../styles/postForm.css'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, getAllPosts } from '../redux/actions/postActions'

const PostForm = () => {
    const dispatch = useDispatch();
    const allPostsObj = useSelector((state) => state.postReducer);
    // console.log(allPostsObj)

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState(null);
    const [createdBy, setCreatedBy] = useState("");
    const [imgSelected, setImgSelected] = useState(false);
    const [img, setImg] = useState("");

    //submitPhotoToCloudinary
    const submitPhotoToCloudinary = () => {
        const data = new FormData();
        data.append("file", photo);
        data.append("upload_preset", "ecom05");
        data.append("cloud_name", "dib7eiw3v");
        fetch("https://api.cloudinary.com/v1_1/dib7eiw3v/image/upload", { method: "post", body: data }).then((res) => res.json()).then((data) => {
            setImg(data.secure_url); setImgSelected(false);
        }).catch((error) => console.log(`Something went wrong error : ${error}`))
    }

    //submitPost
    const submitPost = () => {
        dispatch(createPost({ title, description, photo: img, createdBy }));
        // if (title && description && img && createdBy) {
        //     dispatch(getAllPosts());
        // }
        if (title && description && img && createdBy && allPostsObj?.success) {
            setTitle("");
            setDescription("");
            setPhoto(null);
            setCreatedBy("");
        }
        dispatch(getAllPosts());
    }



    return (
        <div className='PostForm'>
            <form className="postForm" onSubmit={(e) => e.preventDefault()}>
                <div className="postCommonContainer">
                    <label className="postCommonLabel" htmlFor="title">Title :</label> <br />
                    <input className="postCommonInput" id='title' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <br />
                <div className="postCommonContainer">
                    <label className="postCommonLabel" htmlFor="desc">Description :</label> <br />
                    <input className="postCommonInput" id='desc' type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <br />
                <div className="postCommonContainer">
                    {imgSelected == false ? <label className="postCommonLabel"  >CHOOSE PHOTO
                        <input className="postCommonInput" type="file" name="" onChange={(e) => { setPhoto(e.target.files[0]); setImgSelected(true) }} accept='image/*' hidden />
                    </label> : <label className="postCommonLabel" >UPLOAD PHOTO ({photo && photo.name})
                        <input className="postCommonInput" type="button" onClick={submitPhotoToCloudinary} hidden />
                    </label>}
                </div>
                <br />
                <div className="postCommonContainer">
                    <label className="postCommonLabel" htmlFor="createdBy">Created By :</label> <br />
                    <input className="postCommonInput" id='createdBy' type="text" value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} />
                </div>
                <br />
                <button onClick={submitPost} type="submit" className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}

export default memo(PostForm);
