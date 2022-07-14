

import React from 'react';



const Login = (props) => {

    const handle_login = (event) => {
        event.preventDefault();
        props.fetch()
    }

  return (
    <div className='authForm'>
        <p>
            Log in to LeBank
        </p>
        <form onSubmit={handle_login}>
            <input
                type='email' 
                placeholder='Email address'
                onChange={(e) => props.setEmail(e.target.value)}
            />
            <br></br>
            <input
                type='password' 
                placeholder='Password'
                onChange={(e) => props.setPassword(e.target.value)}
            />
            <br></br>
            <button type='submit'>Log In</button>
        </form>
    </div>
  )
}

export default Login