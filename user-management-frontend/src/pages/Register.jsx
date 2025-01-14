import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setErrorMessage } from '../features/auth/registerSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../index.css";


const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // Validation
        if (!username || !password || !confirmPassword) {
            setErrorMessage('All fields are required.');
            return;
        }
        if (!validateEmail(username)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }
        if (!validatePassword(password)) {
            dispatch(
                setErrorMessage(
                    'Your password must be at least 8 characters long and include at least one letter, one number, and one special character.'
                )
            );
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        // Clear error message
        setErrorMessage('');

        try {
            await axios.post('http://127.0.0.1:8000/api/register/', { username, password });
            alert('Registration successful!');
            navigate('/login');
        } catch (err) {
            dispatch(setError('Registration failed. Please try again.'));
        }
    };

    return (
        <div className="form-container sign-up-container">
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <input
                    type="email"
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
