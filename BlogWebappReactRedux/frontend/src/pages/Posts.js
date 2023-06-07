import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import '../styles/posts.css'
import { deletePost, getAllPosts, getSinglePost } from '../redux/actions/postActions';
import { Link } from 'react-router-dom';
// import { getSingleUser } from '../redux/actions/userActions';

const Posts = () => {
    const dispatch = useDispatch();
    const loginObj = useSelector((state) => state.userReducer);
    const userObj = loginObj?.user;
    console.log(userObj)
    const allPostsObj = useSelector((state) => state.postReducer);
    const postsArr = allPostsObj?.posts;

    useEffect(() => {
        dispatch(getAllPosts());
    }, [allPostsObj?.posts?.length])

    // useEffect(() => {
    //      dispatch(getSingleUser(loginObj?.user?._id))
    // }, [])

    //deletePostFunc
    const deletePostFunc = (postId) => {
        dispatch(deletePost(postId));
        dispatch(getAllPosts());
    }

    return (
        <div className='Posts'>
            {postsArr?.map((post) => {
                return <div key={post._id} className="singlePostContainer">
                    <div className="postImageContainer">
                        <img src={post.photo} alt="post-photo" />
                    </div>
                    <div className="postContentContainer">
                        <h4 className="postTitle">{post.title}</h4>
                        <p className="postDescription">
                            {post.description.substring(0, 15)}...<Link to={`/single-post/${post._id}`} onClick={() => { dispatch(getSinglePost(post._id)) }} >click here to read more</Link>
                        </p>
                        <h5 className='postCreatedBy'><i>CreatedBy : </i> {post.createdBy}</h5>
                        {/* {userObj?.isAdmin == true && <button className='btn btn-danger' onClick={() => { deletePostFunc(post._id) }}>Delete</button>} */}
                    </div>
                </div>
            })}
        </div>
    )
}

export default Posts;
