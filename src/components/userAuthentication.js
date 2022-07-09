import React from 'react';

import LoginForm from './authentication-component/Login';

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

