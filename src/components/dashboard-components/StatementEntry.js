import React from 'react'
import { useState } from 'react'

const StatementInfo = (props) => { //when a statement entry is clicked, the following code will run
    return (
        <div className='statement-entry' onClick={() => props.setShowInfo(false)} >
            <div className='entry-preview'>
                {props.transInfo.Date}
            </div>

            <div className='statement-name'>
                <p>
                    {props.transInfo.name}
                </p>
            </div>

            <div className='statement-content'>
                <div className='statmt stmt-left'>
                    <div>
                        <p>
                            Transaction type:
                        </p>
                    </div>
                    <div>
                        <p>
                            Amount:
                        </p>
                    </div>
                    <div>
                        <p>
                            Ref:
                        </p>
                    </div>

                </div>



                <div className='statmt stmt-right'>
                    <div>
                        <p>
                            {props.transInfo.transactionType}
                        </p>
                    </div>
                    <div>
                        <p>
                            £{props.transInfo.amount}
                        </p>
                    </div>

                    <div>
                        <p>
                            {props.transInfo.Ref}
                        </p>
                    </div>
                </div>
            </div>



        </div>
    )
}




const StatementEntry = (props) => {

    const [showInfo, setShowInfo] = useState(false); 
    return (
        <div className='entry-container'>
            {
                showInfo ? (
                    <StatementInfo setShowInfo={setShowInfo} transInfo={props.transInfo} />
                ) : (
                    <div className='entry-preview'
                        onClick={() => setShowInfo(true)}
                    >
                        <div>
                            {props.transInfo.Date}
                        </div>

                        <div>
                            {props.transInfo.transactionType}
                        </div>

                        <div>
                            £{props.transInfo.amount}
                        </div>
                    </div>
                )
            }


        </div>
    )
}

export default StatementEntry