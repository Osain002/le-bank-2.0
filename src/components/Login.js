import React, { useState } from 'react';
import axios from 'axios';


const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    
    const handle_login = (event) => {
        event.preventDefault();
        const url = "http://localhost:8080/userauthentication/login"
        axios.post(url, {
            "email": email,
            "password": password
        })
        .then(res => {
            props.accInfo(res)
        })

    }

  return (
    <div className='authForm'>
        <p>
            Log in to LeBank
        </p>
        <form onSubmit={handle_login}>
            <input
                value={email}
                type='email' 
                placeholder='Email address'
                onChange={(e) => setEmail(e.target.value)}
            />
            <br></br>
            <input
                value={password}
                type='password' 
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
            />
            <br></br>
            <button type='submit'>Log In</button>
        </form>
    </div>
  )
}

export default Login