import React, { useEffect, useState } from 'react'
import '../styles/header.css'
import { message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchPosts } from '../redux/actions/postActions';
import { getLoggedInUser, getLogoutUser, getSingleUser } from '../redux/actions/userActions';

const Header = () => {
    const [keyword, setKeyword] = useState("");
    const loginObj = useSelector((state) => state.userReducer);
    console.log(loginObj)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLoggedInUser());
        // if(loginObj?.user._id){
        // dispatch(getSingleUser(loginObj?.user._id))
        // }
    }, [])

    const searchPostsFunc = () => {
        if (keyword) {
            dispatch(getSearchPosts(keyword));
            navigate(`/search/${keyword}`)
        } else {
            message.error('Provide any input to search')
        }
    }

    const scrollToContactSection = () => {
        const contactSection = document.getElementById('contactSection');
        contactSection.scrollIntoView();
    }

    const scrollToViewHomeSection = () => {
        const postFormWithPosts = document.getElementById('postFormWithPosts');
        postFormWithPosts.scrollIntoView();
    }

    //logoutFunc
    const logoutFunc = () => {
        localStorage.clear();
        dispatch(getLogoutUser());
        navigate("/login")
    }


    return (
        <>{loginObj?.user != null && <div className='Header'>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link to={`/`} onClick={scrollToViewHomeSection} className="navbar-brand" >sonaBlog</Link>
                        {console.log(loginObj?.user.username)}
                        {loginObj && <button>{loginObj?.user.username}</button>}
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={`/`} onClick={scrollToViewHomeSection} className="nav-link active" aria-current="page" >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link onClick={scrollToContactSection} className="nav-link" >Contact</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/register'} className="nav-link" >Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/login'} className="nav-link" >Login</Link>
                            </li>
                            <li className="nav-item">
                                <button onClick={logoutFunc} className="nav-link" >Logout</button>
                            </li>
                        </ul>
                        <form onSubmit={(e) => e.preventDefault()} className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                            <button className="btn btn-outline-success" type="submit" onClick={searchPostsFunc}>Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>}</>
    )
}

export default Header
