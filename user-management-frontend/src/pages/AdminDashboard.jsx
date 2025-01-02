import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]); // Use local state for simplicity

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>All Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <p>Username: {user.username}</p>
                        <p>Password (hashed): {user.password}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
