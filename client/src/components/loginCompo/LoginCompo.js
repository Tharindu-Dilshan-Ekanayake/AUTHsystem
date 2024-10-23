import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../css/LoginCompo.css'; // Import the CSS file

export default function LoginCompo() {
    const navigate = useNavigate();
    
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        try {
            const response = await axios.post('/loginuser', { email, password });
            const userData = response.data;
            if (userData.error) {
                alert(userData.error);
            } else {
                setData({ email: '', password: '' }); // Clear input fields
                localStorage.setItem('user', JSON.stringify(userData));
                const role = userData.role;
                switch (role) {
                    case 'admin':
                        navigate('/admindash');
                        break;
                    case 'user':
                        navigate('/userdash');
                        break;
                    default:
                        navigate('/defaultdash');
                }
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    function DividerWithText({ text }) {
        return (
            <div className="divider">
                <div className="divider-line"></div>
                <span className="divider-text">{text}</span>
                <div className="divider-line"></div>
            </div>
        );
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="form-container">
                    <form onSubmit={loginUser}>
                        <div className="input-group">
                            <label><strong>Email :</strong></label>
                            <input
                                type="email"
                                className="input-field"
                                placeholder="Enter the Email"
                                value={data.email}
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                            />
                        </div>
                        <div className="input-group">
                            <label><strong>Password :</strong></label>
                            <input
                                type="password"
                                className="input-field"
                                placeholder="Enter the password"
                                value={data.password}
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                            />
                        </div>
                        <div className="button-container">
                            <button className="btn-login">LOGIN</button>
                        </div>
                        <DividerWithText text="or" />
                        <div className="register-container">
                            <p>Don't have an account?</p>
                            <button type="button" onClick={() => navigate('/register')} className="btn-register">REGISTER</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
