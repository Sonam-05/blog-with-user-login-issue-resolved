import React, { useEffect } from 'react'
import Layout from './Layout'
import Posts from '../pages/Posts'
import PostForm from '../client/PostForm'
import '../styles/postFormwithPosts.css'
import Contact from '../client/Contact'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getLoggedInUser } from '../redux/actions/userActions'

const PostFormWithPosts = () => {
  const loginObj = useSelector((state) => state.userReducer);
  console.log(loginObj)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedInUser());
    console.log(loginObj)
    if(loginObj == null){
      navigate("/login")
    }
  }, [])
  return (
    <Layout>
        <div id='postFormWithPosts' className="PostFormWithPosts">
            <Posts />
            <PostForm />
        </div>
        <Contact />
    </Layout>
  )
}

export default PostFormWithPosts
