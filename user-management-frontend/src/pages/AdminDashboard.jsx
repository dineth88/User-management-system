import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { fetchUsers, updateUser, deleteUser } from '../features/admin/adminSlice'; // Assume userSlice contains Redux logic
import { fetchTasks, createTask, updateTask, deleteTask } from '../features/admin/taskSlice';
import { selectUserData, selectTaskData, selectTasksForUser } from '../features/user/userSelectors';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.users.data);
    const taskData = useSelector(selectTaskData);
    const [isEditing, setIsEditing] = useState(false);
    const [isManagingTasks, setIsManagingTasks] = useState(false);
    const [editUserData, setEditUserData] = useState({
        id: '',
        username: '',
        password: '',
        status: '',
        emp_id: '',
        role: '',
    });
    const [newTask, setNewTask] = useState({
        task_title: '',
        task_status: '',
        assigned_to: '',
    });
    const tasksForSelectedUser = useSelector(selectTasksForUser(editUserData.id));

    // Fetch all users
    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchTasks());
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

    // Handle task creation
    const handleTaskCreate = async () => {
        try {
            await dispatch(createTask(newTask));
            alert('Task created successfully!');
            setNewTask({ task_title: '', task_status: '', assigned_to: '' });
        } catch (error) {
            console.error('Failed to create task:', error);
            alert('Failed to create task.');
        }
    };

    // Handle task updates
    const handleTaskUpdate = async (task) => {
        try {
            await dispatch(updateTask(task));
            alert('Task updated successfully!');
        } catch (error) {
            console.error('Failed to update task:', error);
            alert('Failed to update task.');
        }
    };

    // Handle task deletion
    const handleTaskDelete = async (taskId) => {
        try {
            await dispatch(deleteTask(taskId));
            alert('Task deleted successfully!');
        } catch (error) {
            console.error('Failed to delete task:', error);
            alert('Failed to delete task.');
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
                        <button type="button" onClick={handleSave}>
                            Save
                        </button>
                        <button type="button" onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>
                    </form>
                </div>
            ) : isManagingTasks ? (
                <div>
                    <h2>Manage Tasks</h2>
                    <form>
                        <label>
                            Task Title:
                            <input
                                type="text"
                                name="task_title"
                                value={newTask.task_title}
                                onChange={(e) => setNewTask({ ...newTask, task_title: e.target.value })}
                            />
                        </label>
                        <br />
                        <label>
                            Task Status:
                            <input
                                type="text"
                                name="task_status"
                                value={newTask.task_status}
                                onChange={(e) => setNewTask({ ...newTask, task_status: e.target.value })}
                            />
                        </label>
                        <br />
                        <button type="button" onClick={() => dispatch(createTask(newTask))}>
                            Add Task
                        </button>
                        <button type="button" onClick={() => setIsManagingTasks(false)}>
                            Back
                        </button>
                    </form>
                    <h3>Existing Tasks</h3>
                    {tasksForSelectedUser.map((task) => (
                        <div key={task.id}>
                            <p>
                                {task.task_title} - {task.task_status}
                            </p>
                            <button onClick={() => dispatch(updateTask(task))}>Edit</button>
                            <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
                        </div>
                    ))}
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
                                                        status: user.status, // Add status if it's included in your form
                                                    });
                                                    setIsEditing(true);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button onClick={() => handleUserDelete(user.id)}>Delete</button>
                                            <button
                                                onClick={() => {
                                                    setEditUserData(user);
                                                    setIsManagingTasks(true);
                                                }}
                                            >
                                                Manage Tasks
                                            </button>
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

