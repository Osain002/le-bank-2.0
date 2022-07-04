import React from 'react';

import LoginForm from './Login';

const userAuthenticationContainer = (props) => {
  return (
    <div className='centerHorizontal authContainer'>
      <LoginForm isLoggedIn={props.isLoggedIn}/>
    </div>
  )
}

export default userAuthenticationContainer;

