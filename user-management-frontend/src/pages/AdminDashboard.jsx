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
                <div  className='relative'>
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Fullname
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Employee ID
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Role
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Task
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData.map((user) => (user.username!='admin' &&
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={user.id}>
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.username}</th>
                                        <td class="px-6 py-4">{user.status || 'Not provided'}</td> {/* Display status */}
                                        <td class="px-6 py-4">{user.emp_id || 'Not provided'}</td>
                                        <td class="px-6 py-4">{user.role || 'Not provided'}</td>
                                        <td class="px-6 py-4">{user.task || 'Not provided'}</td>
                                        <td class="px-6 py-4">
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
                                        </td>
                                        <td class="px-6 py-4">
                                            <button onClick={() => handleDelete(user.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
