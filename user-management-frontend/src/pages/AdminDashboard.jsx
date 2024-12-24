import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState([]);

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

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <textarea
                placeholder="Type your question here..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <button onClick={handleQuestionSubmit}>Broadcast Question</button>
            <button onClick={fetchAnswers}>Fetch Answers</button>
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