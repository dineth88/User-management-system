import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { fetchUsers, updateUser, deleteUser } from '../features/admin/adminSlice'; // Assume userSlice contains Redux logic

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.users.data); // Use 'data' instead of 'userData'
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
        dispatch(fetchUsers());
    }, [dispatch]);

    // Handle the change in the edit form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditUserData({ ...editUserData, [name]: value });
    };

    // Save updated user data
    const handleSave = async () => {
        try {
            console.log("Updated user data:", editUserData);
            await dispatch(updateUser(editUserData));
            alert('Details saved successfully!');
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update user:', error);
            alert('Failed to update user, please check the data you are sending.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteUser(id));
            alert('User deleted successfully!');
        } catch (error) {
            console.error('Failed to delete user:', error);
            alert('Failed to delete user, please try again.');
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
                                <p>Username: {user.username}</p>
                                <p>Status: {user.status || 'Not provided'}</p> {/* Display status */}
                                <p>Employee ID: {user.emp_id || 'Not provided'}</p>
                                <p>Role: {user.role || 'Not provided'}</p>
                                <p>Task: {user.task || 'Not provided'}</p>
                                <button
                                    onClick={() => {
                                        setEditUserData({
                                            id: user.id,
                                            username: user.username,
                                            emp_id: user.emp_id,
                                            role: user.role,
                                            task: user.task,
                                            status: user.status, // Add status if it's included in your form
                                        });
                                        setIsEditing(true);
                                    }}
                                >
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
