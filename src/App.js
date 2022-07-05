
import './App.scss';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useState } from 'react';

import Auth from './components/userAuthentication';
import Dashboard from './components/Dashboard';

// import Login from './components/Login';

const App = (props) => {
  const [accInfo, SetAccInfo] = useState()

  return (
    <Router>
      <div className="App">
        <Switch>

          <Route exact path="/">
          
            <div className='pageTitle centerHorizontal'>
              <h1>
                Le  
                <span>
                  B
                </span>
                ank
              </h1>
            </div>
            
            {
              accInfo?(
                <Redirect from='/' to='/dashboard'/> 
              ):(
                <Auth accInfo={SetAccInfo}/>
              )
            }
          </Route>
          <Route exact path='/dashboard'>
            {
              accInfo?(
                <Dashboard accInfo={accInfo}/>
              ):(
                <Redirect from='/dashboard' to='/'/>
              )
              }
          </Route>
        </Switch> 
        
      </div>
    </Router>
  );
}

export default App;
