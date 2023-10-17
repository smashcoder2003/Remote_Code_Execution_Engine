import React from 'react';
import './Login.css';
import user_icon from '../Assets/images.png';
import mail_icon from '../Assets/mail.jpg';

function  Login() {
        return (
            <>
                <div className="container">
                    <div className="header">
                        <div className="text"> Sign Up</div>
                    </div>

                    <div className="inputs">
                        <div className="inputItem">
                            <img className = "logo"
                                 src={user_icon}
                                 alt=""/>

                            <input type="name" placeholder={'RollNo'}/>
                        </div>
                        <div className="inputItem">
                            <img className = "logo"
                                 src={mail_icon}
                                 alt=""/>
                            <input  type="email" placeholder={'Email'}/>
                        </div>
                        <div className="inputItem">
                            <input type="password" placeholder={'Password'}/>
                        </div>
                    </div>


                    <div className="submit-container">
                        <div className="submit">Sign Up</div>
                        <div className="submit">Login</div>
                    </div>

                </div>
            </>
        );
}

export default Login;