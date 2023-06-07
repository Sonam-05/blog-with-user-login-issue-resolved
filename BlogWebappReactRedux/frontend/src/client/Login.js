import React, { useEffect, useState } from 'react'
import '../styles/register.css'
import Layout from '../components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginObj = useSelector((state) => state.userReducer);
    // console.log(loginObj)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //loginUserFunc
    const loginUserFunc = () => {
        dispatch(loginUser({ email, password }));
    }

    useEffect(() => {
        if (loginObj?.user != null) {
            // console.log(loginObj?.token);
            navigate(`/`)
            // dispatch(getSingleUser(loginObj?.user?._id))
        }
    }, [loginObj])

    return (
        <Layout>
            <div className='Register'>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="registerCommonContainer">
                        <label className='registerCommonLabel' htmlFor="email">Email :</label>
                        <input className='registerCommonInput' type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <br />
                    <div className="registerCommonContainer">
                        <label className='registerCommonLabel' htmlFor="pswd">Password :</label>
                        <input className='registerCommonInput' type="password" id='pswd' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <br />
                    <div className="registerBtnContainer">
                        <button className='btn btn-primary' onClick={loginUserFunc}>Login</button>
                        <Link to={'/register'}>Not a user? Sign-Up</Link>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Login
