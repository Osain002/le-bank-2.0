
import './App.scss';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useState } from 'react'

import Auth from './components/userAuthentication';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App(props) {

  const [loggedIn, setLoggedIn] = useState(false)
  const getLoggedIn = (state) => {

    setLoggedIn(state)
    props.history.push('/dashboard')
  } 
  return (
    <Router>
      <div className="App">
        <div className='centerHorizontal pageTitle'>
          <h1>
            Le<span>
              B
            </span>
            ank
          </h1>
        </div>

        {
          loggedIn?(<Dashboard />):(<Auth isLoggedIn={getLoggedIn}/>)
        }
      </div>
    </Router>
  );
}

export default App;
