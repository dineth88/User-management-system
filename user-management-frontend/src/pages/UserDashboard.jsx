import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
    const [userData, setUserData] = useState({
        address: '',
        age: '',
        role: '',
        gender: '',
    }); // State to manage user details
    const [isEditing, setIsEditing] = useState(false); // State to toggle between view and edit modes

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users/me/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUserData(response.data); // Assuming API returns user's details
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
            await axios.put('http://127.0.0.1:8000/api/users/me/', userData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            alert('Details saved successfully!');
            setIsEditing(false); // Exit edit mode after saving
        } catch (error) {
            console.error('Failed to save user details:', error);
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
                            Address:
                            <input
                                type="text"
                                name="address"
                                value={userData.address}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Age:
                            <input
                                type="number"
                                name="age"
                                value={userData.age}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Role:
                            <input
                                type="text"
                                name="role"
                                value={userData.role}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Gender:
                            <select name="gender" value={userData.gender} onChange={handleChange}>
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
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
                    <p>Hashed Password: {userData.password}</p>
                    <p>Address: {userData.address || 'Not provided'}</p>
                    <p>Age: {userData.age || 'Not provided'}</p>
                    <p>Role: {userData.role || 'Not provided'}</p>
                    <p>Gender: {userData.gender || 'Not provided'}</p>
                    <button onClick={() => setIsEditing(true)}>Edit Details</button>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
