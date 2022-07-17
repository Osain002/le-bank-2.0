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

const App = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [accInfo, setAccInfo] = useState(); //track state of account information
   const [isClickedOn, setIsClickedOn] = useState('dashboard');
   const [refresh, setRefresh] = useState(false);







   function renderMainContent(accInfo){
      if (accInfo){ //make sure accInfo exists 

         switch (isClickedOn){ //detect whether user is on dashboard or card screen 
            case 'dashboard':
               return <Dashboard refresh={refresh} accInfo={accInfo} setRefresh={setRefresh} />
            case 'cards':
               return <CardViewMain account={accInfo.data.accounts}/> 
         }
      }else{
         return <Redirect from='/dashboard' to='/' /> //if accInfo DNE, redirect to login
      }
   }








   const fetch = useCallback(() => {
      const url = "http://localhost:8080/userauthentication/login"; //API endpoint for login
      const body = {
         "email": email,
         "password": password
      };
      axios.post(url, body) //send post request to url with body
         .then(res => {
            setAccInfo(res);
            setRefresh(false); //set state of accInfo to res = {user data}
         });

   }, [email, password]);


   useEffect(() => {
      if (refresh) {
         console.log('REFRESH')
         fetch();
      }
   }, [refresh, fetch])

   return (
      <Router>
         <div className="App">
            <Switch>
               <Route exact path="/">
                  <div className='pageTitle centerHorizontal'>
                     <h1>Le<span>B</span>ank</h1>
                  </div>
                  {
                     accInfo ? (
                        <Redirect from='/' to='/dashboard' /> //if accInfo exists, show the dashboard
                     ) : (
                        <Auth //if no accInfo, show login screen
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
                     Hello, {accInfo?accInfo.data.firstname:''}
                  </div>
                  {
                     renderMainContent(accInfo)
                  }
               </Route>
            </Switch>
         </div>
      </Router>
   );
}
export default App;

