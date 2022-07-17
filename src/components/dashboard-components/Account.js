import React from 'react'



const Account = ({accInfo, stmt}) => {
    const sortcode = String(accInfo.sortcode);
    function handle_statement_change() {
        stmt(accInfo.statement); //set statement to correspond with selected account
    }
    return (
        <div className='account-container' onClick={handle_statement_change}>
            <div className='centerHorizontal balance'>
                <p>
                    £{accInfo.balance.toFixed(2)}
                </p>
            </div>
            <div className='acc-info centerHorizontal'>
                <p>
                    {
                        sortcode.substring(0, 2) + '-' + sortcode.substring(2, 4) + '-' + sortcode.substring(4, 6)
                    }
                </p>
                <p>
                    {accInfo.accNum}
                </p>
            </div>
        </div>
    )
}

export default Account