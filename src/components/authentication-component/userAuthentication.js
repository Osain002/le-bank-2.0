import React from 'react';


import LoginForm from './Login';

const userAuthenticationContainer = (props) => {
  return (
    <div className='centerHorizontal authContainer'>
      <LoginForm 
        fetch={props.fetch} 
        setEmail={props.setEmail}
        setPassword={props.setPassword}
        setAccInfo={props.SetAccInfo} 
      />
    </div>
  )
}

export default userAuthenticationContainer;

