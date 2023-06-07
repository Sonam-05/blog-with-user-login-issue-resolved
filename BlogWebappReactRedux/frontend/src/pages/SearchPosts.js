import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux';
import '../styles/posts.css'
import { getSinglePost } from '../redux/actions/postActions';
import { Link } from 'react-router-dom';

const SearchPosts = () => {
    const dispatch = useDispatch();
    const allSearchedPostsObj = useSelector((state) => state.postReducer);
    const postsArr = allSearchedPostsObj?.posts;
    console.log(postsArr)

    return (
        <Layout>
            <div className='SearchPosts'>
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
                        </div>
                    </div>
                })}
            </div>
        </Layout>
    )
}

export default SearchPosts
