import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, updateUserData } from '../features/user/userSlice';  // Import the actions

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector((state) => state.user);  // Use Redux state

  const [localUserData, setLocalUserData] = useState(userData);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user data when component mounts
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  // Update local user data when Redux state changes
  useEffect(() => {
    setLocalUserData(userData);
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalUserData({ ...localUserData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await dispatch(updateUserData(localUserData));
      alert('Details saved successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save user details:', error);
      alert('An error occurred. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>User Dashboard</h1>
      {isEditing ? (
        <div>
          <h2>Edit Your Details</h2>
          <form>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={localUserData.username || ''}  // Ensure value is always controlled
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={localUserData.password || ''}  // Ensure value is always controlled
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Status:
              <input
                type="text"
                name="status"
                value={localUserData.status || ''}  // Ensure value is always controlled
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
          <h2>Your Details</h2>
          <p>Username: {localUserData.username || 'Not provided'}</p>
          <p>Password: {localUserData.password ? localUserData.password : 'Hidden'}</p>
          <p>Status: {localUserData.status || 'Not provided'}</p>
          <p>Employee ID: {localUserData.emp_id || 'Not provided'}</p>
          <p>Role: {localUserData.role || 'Not provided'}</p>
          <p>Task: {localUserData.task || 'Not provided'}</p>
          <button onClick={() => setIsEditing(true)}>Edit Details</button>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
