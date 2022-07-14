
import './styles/App.scss';
import './styles/dashboard/title-welcome.scss';
import './styles/dashboard/transfer.scss';
import './styles/dashboard/statements.scss';
import './styles/dashboard/accounts.scss';
import './styles/dashboard/dashboard.scss';
import './styles/user-authentication-styling/login.scss'
import './styles/cards/debit-card.scss';



import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useState, useCallback } from 'react';
import axios from 'axios';

import Auth from './components/authentication-component/userAuthentication';
import Dashboard from './components/dashboard-components/Dashboard';
import Header from './components/Header';
import { useEffect } from 'react';
import DashboardSwitch from './components/DashboardSwitch';
import CardViewMain from './components/card-view-components/CardViewMain';


// import Login from './components/Login';

const App = () => {


   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [accInfo, setAccInfo] = useState(); //track state of account information
   const [refresh, setRefresh] = useState(false);
   const [isClickedOn, setIsClickedOn] = useState('dashboard');



   const fetch = useCallback(() => {

      const url = "http://localhost:8080/userauthentication/login"; //API endpoint for login

      const body = {
         "email": email,
         "password": password
      };


      axios.post(url, body) //send post request to url with body
         .then(res => {
            setAccInfo(res) //set state of accInfo to res = {user data}
         });

   }, [email, password]);





   useEffect(() => {
      if (refresh) {
         fetch();
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
                     accInfo ? (
                        <Redirect from='/' to='/dashboard' />
                     ) : (
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

                  <DashboardSwitch setIsClickedOn={setIsClickedOn} isClickedOn={isClickedOn} />

                  <div className='welcome-container'>
                     Hello, {accInfo ? (
                        accInfo.data.firstname
                     ) : (
                        console.log('No data')
                     )}
                  </div>



                  {
                     accInfo ? (
                        (isClickedOn === 'dashboard') ? (

                           <div>
                              <div className='title-bar'>
                                 <div>
                                    Accounts
                                 </div>

                                 <div>
                                    Statement
                                 </div>

                                 <div>
                                    Transfer
                                 </div>
                              </div>

                              
                              <Dashboard refresh={refresh} accInfo={accInfo} setRefresh={setRefresh} />
                           </div>

                        ) : (
                           <CardViewMain account={accInfo.data.accounts[0]}/>
                        )

                     ) : (
                        <Redirect from='/dashboard' to='/' />
                     )
                  }
               </Route>







            </Switch>
         </div>
      </Router>
   );
}

export default App;
