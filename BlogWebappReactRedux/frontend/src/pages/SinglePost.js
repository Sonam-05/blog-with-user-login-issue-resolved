import React, { useEffect, useState } from 'react'
import '../styles/singlePost.css'
import Layout from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import Contact from '../client/Contact'
import { BsFillArrowRightSquareFill } from 'react-icons/bs'
import { createComment, getAllCommentsPostId } from '../redux/actions/commentActions'
import { useParams } from 'react-router-dom'
import { getSinglePost } from '../redux/actions/postActions'

const SinglePost = () => {
  const params = useParams();
  console.log(params);
  const dispatch = useDispatch();
  const singlePostObj = useSelector((state) => state.postReducer);
  const postObj = singlePostObj?.post;
  const commentPostObj = useSelector((state) => state.commentReducer);
  const commentsArr = commentPostObj?.comments;
  console.log(commentsArr);

  const [commentDescription, setCommentDescription] = useState("");

  const submitComment = (postId) => {
    dispatch(createComment({ postId, commentDescription }));
    if (postId && commentDescription ) {
      setCommentDescription("")
      // dispatch(getAllCommentsPostId(postId))
    }
  }

  useEffect(() => {
    dispatch(getSinglePost(params.id))
    dispatch(getAllCommentsPostId(params.id))
  }, [])

  return (
    <Layout>
      {postObj && <div className="SinglePostContainer">
        <div className="spcImageContainer">
          <img src={postObj?.photo} alt="single-product-photo" />
        </div>
        <div className="spcContentContainer">
          <h1>{postObj?.title}</h1>
          <p>{postObj.description}</p>
          <h6><i>Created by : {postObj.createdBy}</i></h6>
        </div>
        <div className="commentContainer">
          <h6>Comments : </h6>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="commentCon">
              <input className='commentInput' type="text" name="" value={commentDescription} onChange={(e) => { setCommentDescription(e.target.value) }} placeholder='Add your comment here' required />
              <button className='commentBtn' onClick={() => { submitComment(postObj?._id) }}>➡️</button>
              <div className="everyoneCommentsContainer">
                {commentsArr?.map((comment) => {
                  return <div className="singleCommentContainer" key={comment._id}>
                    <p className='singleComment'>{comment.commentDescription} <span>~{comment.commentUser}</span></p>
                  </div>
                })}
              </div>
            </div>
          </form>
        </div>
      </div>}
      <Contact />
    </Layout>
  )
}

export default SinglePost
