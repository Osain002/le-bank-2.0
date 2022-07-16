import React from 'react'
import { useEffect } from 'react'
import { useMemo, useState } from 'react'


import Account from './Account'
import Statement from './Statement'
import Transfer from './Transfer'


const Dashboard = (props) => {

    const [accList, setAccList] = useState(); //track state for list of accounts owned by user
    const [statement, setStatement] = useState(props.accInfo.data.accounts[0].statement); //track which statement has been selected to view


    useMemo(() => { //whenever accInfo updates, set state of accList = accInfo.data.accounts
        const data = props.accInfo.data;
        data ? (setAccList(data.accounts)) : (console.log('Error loading account'))
    }, [props.accInfo])


    useEffect(() => { //handle component refresh. triggered when transfer submitted
        setStatement(props.accInfo.data.accounts[0].statement)
    }, [props.refresh, props])


    return (

        <div className='dashboard centerHorizontal'>

            <div className='title-bar'>
                <div>Accounts</div>
                <div>Statement</div>
                <div>Transfer</div>
            </div>

            <div style={{display: "flex", flexDirection: "row"}}>
                <div className='acc-list-container'>
                    {
                        accList ? (
                            accList.map((acc) => <Account
                                                    stmt={setStatement}
                                                    key={acc._id}
                                                    accInfo={acc}
                                                />)
                        ) : (
                            <h1>No Data</h1>
                        )
                    }
                </div>

                <Statement statement={statement} />

                <div className='trc'>
                    <Transfer
                        name={[props.accInfo.data.firstname, props.accInfo.data.lastname]}
                        accounts={accList}
                        setRefresh={props.setRefresh}
                    />
                </div>
            </div>
            
        </div>
    )
}

export default Dashboard