import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: '', // Display hashed password if available
        status: '',
        emp_id: '',
        role: '',
        task: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users/me/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Authentication token not found. Please log in again.');
                return;
            }

            const response = await axios.put(
                'http://127.0.0.1:8000/api/users/me/',
                userData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('Details saved successfully!');
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to save user details:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h1>User Dashboard</h1>
            {isEditing ? (
                <div>
                    <h2>Edit Your Details</h2>
                    <form>
                        <label>
                            Username:
                            <input
                                type="text"
                                name="username"
                                value={userData.username}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Status:
                            <input
                                type="text"
                                name="status"
                                value={userData.status}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <button type="button" onClick={handleSave}>
                            Save
                        </button>
                        <button type="button" onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>
                    </form>
                </div>
            ) : (
                <div>
                    <h2>Your Details</h2>
                    <p>Username: {userData.username}</p>
                    <p>Password: {userData.password ? userData.password : 'Hidden'}</p>
                    <p>Status: {userData.status || 'Not provided'}</p>
                    <p>Employee ID: {userData.emp_id || 'Not provided'}</p> {/* Display emp_id */}
                    <p>Role: {userData.role || 'Not provided'}</p> {/* Display role */}
                    <p>Task: {userData.task || 'Not provided'}</p> {/* Display task */}
                    <button onClick={() => setIsEditing(true)}>Edit Details</button>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
