import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);  // State to store all users

    // Fetch all users data
    const fetchUsersData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setUsers(response.data); // Set all users' data
        } catch (error) {
            console.error('Failed to fetch users data:', error);
        }
    };

    // Call fetchUsersData when the component mounts
    useEffect(() => {
        fetchUsersData();
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>

            {/* Display all users */}
            <h2>All Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <p>Username: {user.username}</p>
                        <p>Password (hashed): {user.password}</p> {/* You will see the hashed password */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
