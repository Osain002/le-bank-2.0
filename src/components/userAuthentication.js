import React from 'react';

import LoginForm from './Login';

const userAuthenticationContainer = (props) => {
  return (
    <div className='centerHorizontal authContainer'>
      <LoginForm accInfo={props.accInfo}/>
    </div>
  )
}

export default userAuthenticationContainer;

