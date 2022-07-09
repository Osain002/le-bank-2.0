import React from 'react'
import { useEffect } from 'react'
import { useMemo, useState} from 'react'


import Account from './dashboard-components/Account'
import Statement from './dashboard-components/Statement'
import Transfer from './dashboard-components/Transfer'


const Dashboard = (props) => {
    
    const [accList, setAccList] = useState(); //track state for list of accounts owned by user
    const [statement, setStatement] = useState(props.accInfo.data.accounts[0].statement); //track which statement has been selected to view




    // need to combine the following two functions as they pretty much do the same thing


    useMemo(() => { //whenever accInfo updates, set accList = accInfo.data.accounts
        const data = props.accInfo.data;
        data?(setAccList(data.accounts)):(console.log('Error loading account'))
    }, [props.accInfo])


    useEffect(() => { //handle component refresh 
        setStatement(props.accInfo.data.accounts[0].statement)
    }, [props.refresh, props])








    console.log('TYPWR: ', props.statement)
  return (
    <div className='dashboard centerHorizontal'>

        <div className='acc-list-container'>
            {
                accList?(
                    accList.map((acc) => <Account
                                            stmt={setStatement} 
                                            key={acc._id} 
                                            accInfo={acc} 
                                        />)
                ):(
                    <h1>No Data</h1>
                )
            }
        </div>
        
        <Statement statement={statement}/>

        <div className='trc'>
            <Transfer 
                name={[props.accInfo.data.firstname,props.accInfo.data.lastname]}
                accounts={accList} 
                setRefresh={props.setRefresh}
            />
        </div>
        

    </div>
  )
}

export default Dashboard