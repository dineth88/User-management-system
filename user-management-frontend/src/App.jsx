import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Register from './pages/Register';
import LoginHandler from './pages/LoginHandler';

const App = () => (
    <Provider store={store}>
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/register" element={<Register />} />
                <Route path="/handler" element={<LoginHandler />} />
            </Routes>
        </Router>
    </Provider>
);

export default App;