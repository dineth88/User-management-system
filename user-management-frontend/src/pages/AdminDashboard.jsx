import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState([]);
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

    // Handle question submission
    const handleQuestionSubmit = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/questions/', { text: question }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            alert('Question broadcasted!');
        } catch (error) {
            console.error('Failed to broadcast question:', error);
        }
    };

    // Fetch answers
    const fetchAnswers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/answers/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setAnswers(response.data);
        } catch (error) {
            console.error('Failed to fetch answers:', error);
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

            <h2>Question Section</h2>
            <textarea
                placeholder="Type your question here..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <button onClick={handleQuestionSubmit}>Broadcast Question</button>
            <button onClick={fetchAnswers}>Fetch Answers</button>

            <h2>Answers</h2>
            <ul>
                {answers.map((answer) => (
                    <li key={answer.id}>
                        {answer.id}. {answer.user.username}: {answer.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
