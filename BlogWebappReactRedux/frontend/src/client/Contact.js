import React, { useState, useRef } from 'react'
import emailjs from '@emailjs/browser';
import '../styles/contact.css'
import { message } from 'antd';

const Contact = () => {
    const form = useRef();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_4yk1wgd', 'template_dfedshd', form.current, 'ELNKh1-vwrVXUFh8M')
            .then((result) => {
                console.log(result.text);
                message.success('message sent successfully');
            }, (error) => {
                console.log(error.text);
            });
        setName("");
        setEmail("");
        setMsg("");
    };

    return (
        <div id='contactSection'>
            <div className="contactHeadingContainer">
                <h3 className='contactHeading'>Contact Us</h3>
                <div className="c_blank">
                </div>
            </div>
            <form className='contactForm' ref={form} onSubmit={sendEmail}>
                <div className="contactCommonContainer">
                    <label className='contactCommonLabel' htmlFor="name">Name :</label>
                    <input className='contactCommonInput' type="text" name="user_name" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <br />
                <div className="contactCommonContainer">
                    <label className='contactCommonLabel' htmlFor="email">Email :</label>
                    <input className='contactCommonInput' type="email" name="user_email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <br />
                <div className="contactCommonContainer">
                    <label className='contactCommonLabel' htmlFor="msg">message :</label>
                    <textarea className='contactCommonInput' type="text" name="message" id="msg" value={msg} onChange={(e) => setMsg(e.target.value)} required></textarea>
                </div>
                <br />
                <button className='btn btn-primary' type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Contact
