import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [userData, setUserData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editUserData, setEditUserData] = useState({
        id: '',
        username: '',
        password: '',
        status: '',
        emp_id: '',
        role: '',
        task: ''
    });

    // Fetch all users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };
        fetchUsers();
    }, []);

    // Handle the change in the edit form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditUserData({ ...editUserData, [name]: value });
    };

    // Save updated user data
    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Authentication token not found. Please log in again.');
                return;
            }

            // Ensure that editUserData is valid
            console.log("Updated user data:", editUserData);

            const response = await axios.put(
                `http://127.0.0.1:8000/api/users/${editUserData.id}/`,  // Ensure correct endpoint and user ID
                editUserData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert('Details saved successfully!');
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update user:', error);
            alert('Failed to update user, please check the data you are sending.');
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>

            {isEditing ? (
                <div>
                    <h2>Edit User Details</h2>
                    <form>
                        <label>
                            Username:
                            <input
                                type="text"
                                name="username"
                                value={editUserData.username}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={editUserData.password}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Employee ID:
                            <input
                                type="text"
                                name="emp_id"
                                value={editUserData.emp_id}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Role:
                            <input
                                type="text"
                                name="role"
                                value={editUserData.role}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Task:
                            <input
                                type="text"
                                name="task"
                                value={editUserData.task}
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
                    <h2>User List</h2>
                    <ul>
                        {userData.map((user) => (
                            <li key={user.id}>
                                {user.username}
                                <button onClick={() => {
                                    setEditUserData({
                                        id: user.id,
                                        username: user.username,
                                        password: '', // Do not expose password, just leave it empty
                                        emp_id: user.emp_id,
                                        role: user.role,
                                        task: user.task
                                    });
                                    setIsEditing(true);
                                }}>
                                    Edit
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
