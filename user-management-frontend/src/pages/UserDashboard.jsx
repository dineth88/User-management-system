import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
    const [questions, setQuestions] = useState([]);
    const [answer, setAnswer] = useState('');
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                //console.log(response.data[0]);
                setUserData(response.data[0]); // Assuming the response contains the current user data
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchUserData();
    }, []);


    return (
        <div>
            <h1>User Dashboard</h1>
            {userData && (
                <div>
                    <p>Username: {userData.username}</p>
                    <p>Hashed Password: {userData.password}</p>
                </div>
            )}
           
        </div>
    );
};

export default UserDashboard;
