import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <h1>ProfiLink</h1>
     <div>
        <input type='text' placeholder='Username'/>
        <input type='password' placeholder='Password'/>
        <button>Add User</button>
      </div>
    </>
  )
}

export default App
