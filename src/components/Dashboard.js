import React from 'react'
import { useMemo, useState} from 'react'


import Account from './dashboard-components/Account'
import Header from './dashboard-components/Header'

const Dashboard = (props) => {
    
    const [accList, setAccList] = useState();

    useMemo(() => {
        const data = props.accInfo.data;

        data?(
            setAccList(data.accounts)
        ):(
            console.log('no')
        )  
    }, [props.accInfo])



  return (
    <div>
        <Header/>
        <div className='acc-list-container'>
            {
                accList?(
                    accList.map((acc) => <Account accInfo={acc} />)
                ):(
                    <h1>No Data</h1>
                )
            }
        </div>

    </div>
  )
}

export default Dashboard