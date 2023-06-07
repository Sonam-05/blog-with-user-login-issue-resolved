import React, { useEffect, useState } from 'react'
import '../styles/register.css'
import Layout from '../components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/actions/userActions';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const registerObj = useSelector((state) => state.userReducer);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [sport, setSport] = useState("");

    //registerFunc
    const registerFunc = () => {
        dispatch(registerUser({ username, email, password, address, contact, sport }));
    }

    useEffect(() => {
        if (registerObj?.success == true) {
            navigate('/login');
        }
    }, [registerObj])

    return (
        <Layout>
            <div className='Register'>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="registerCommonContainer">
                        <label className='registerCommonLabel' htmlFor="username">Username :</label>
                        <input className='registerCommonInput' type="text" id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <br />
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
                    <div className="registerCommonContainer">
                        <label className='registerCommonLabel' htmlFor="address">Address :</label>
                        <input className='registerCommonInput' type="text" id='address' value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <br />
                    <div className="registerCommonContainer">
                        <label className='registerCommonLabel' htmlFor="contact">Contact :</label>
                        <input className='registerCommonInput' type="text" id='contact' value={contact} onChange={(e) => setContact(e.target.value)} />
                    </div>
                    <br />
                    <div className="registerCommonContainer">
                        <label className='registerCommonLabel' htmlFor="sport">Favourite Sport :</label>
                        <input className='registerCommonInput' type="text" id='sport' value={sport} onChange={(e) => setSport(e.target.value)} />
                    </div>
                    <br />
                    <div className="registerBtnContainer">
                        <button className='btn btn-primary' onClick={registerFunc}>Register</button>
                        <Link to={'/login'}>Already a user? Sign-In</Link>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Register
