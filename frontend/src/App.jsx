import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addUser = async()=>{
      const userData = {
        username,
        password
      };
      try{
      const response = await fetch("http://127.0.0.1:8000/api/users/create/", {
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      console.log(data);
    }catch(err){
        console.log(err);
      }
  };

  return (
    <>
      <h1>ProfiLink</h1>
      <div>
        <input type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
        <input type="password" placeholder="Password"  onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={addUser}>Add User</button>
      </div>
      {users.map((user) => (
        <div>
          <p>Username: {user.username}</p>
          <p>Password: {user.password}</p>
        </div>
      ))}
    </>
  );
}

export default App;
