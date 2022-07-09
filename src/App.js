
import './App.scss';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useState, useCallback } from 'react';
import axios from 'axios';

import Auth from './components/userAuthentication';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import { useEffect } from 'react';


// import Login from './components/Login';

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [accInfo, setAccInfo] = useState() //track state of account information
  const [refresh, setRefresh] = useState(false)




  const fetch = useCallback(() => {
    const url = "http://192.168.0.24:8080/userauthentication/login"
    axios.post(url, {
        "email": email,
        "password": password
    })
    .then(res => {
        console.log(res)
        setAccInfo(res)
        setRefresh(false)
    })
    

  }, [email, password]);

  useEffect(() => {
    if (refresh) {
      fetch()
    }
  }, [refresh, fetch])




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
                <Auth 
                  fetch={fetch} 
                  setEmail={setEmail}
                  setPassword={setPassword}
                  setAccInfo={setAccInfo} 
                />
              )
            }
          </Route>
          <Route exact path='/dashboard'>
            <Header />

            {
              accInfo?(
                <Dashboard refresh={refresh} accInfo={accInfo} setRefresh={setRefresh} />
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
