import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, setError } from '../features/auth/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../index.css";


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector((state) => state.auth.error);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', { username, password });
            dispatch(setCredentials({ user: username, token: response.data.access }));
            localStorage.setItem('token', response.data.access);
            navigate(username === 'admin' ? '/admin' : '/dashboard');
        } catch (error) {
            dispatch(setError('Invalid username or password'));
        }
    };

    return (
        <div className="form-container sign-in-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;
