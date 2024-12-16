import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.log("Error fetching users:", err);
    }
  };

  const addUser = async () => {
    const userData = {
      username,
      password,
    };
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error("Failed to add user");
      const data = await response.json();
      setUsers((prev) => [...prev, data]);
    } catch (err) {
      console.log("Error adding user:", err);
    }
  };

  const updateUsername = async (pk, password) => {
    const userData = {
      username: newUsername,
      password: password,
    };
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/${pk}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error("Failed to update username");
      const data = await response.json();
      setUsers((prev) =>
        prev.map((user) => (user.id === pk ? data : user))
      );
    } catch (err) {
      console.log("Error updating username:", err);
    }
  };

  const deleteUser = async (pk)=>{
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/${pk}/`, {
        method: "DELETE",
      });
      setUsers((prev)=>prev.filter((book)=>book.id!=pk));
    }catch(err){
      console.log("Error deleting user:", err);
    }
  }

  return (
    <>
      <h1>ProfiLink</h1>
      <div>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={addUser}>Add User</button>
      </div>
      {users.map((user) => (
        <div key={user.id}>
          <p>Username: {user.username}</p>
          <p>Password: {user.password}</p>
          <input
            type="text"
            placeholder="New Username"
            onChange={(e) => setNewUsername(e.target.value)}
          />
          {/* Fix: Pass a function reference to onClick */}
          <button onClick={() => updateUsername(user.id, user.password)}>
            Change Username
          </button>
          <button onClick={() => deleteUser(user.id)}>
           Delete
          </button>
        </div>
      ))}
    </>
  );
}

export default App;
